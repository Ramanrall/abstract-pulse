import { NextResponse } from 'next/server';

const RPC = 'https://api.mainnet.abs.xyz/';

async function rpc(method: string, params: unknown[] = []) {
  const res = await fetch(RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return data.result;
}

async function rpcBatch(requests: { method: string; params: unknown[] }[]) {
  const body = requests.map((r, i) => ({
    jsonrpc: '2.0', id: i, method: r.method, params: r.params,
  }));
  const res = await fetch(RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return Array.isArray(data) ? data.sort((a, b) => a.id - b.id).map(d => d.result) : [];
}

export async function GET() {
  try {
    const [blockNumberHex, gasPriceHex] = await Promise.all([
      rpc('eth_blockNumber'),
      rpc('eth_gasPrice'),
    ]);

    const currentBlock = parseInt(blockNumberHex, 16);
    const gasPriceGwei = (parseInt(gasPriceHex, 16) / 1e9).toFixed(4);

    // Get block timestamps to calculate real block time
    const [latestBlockData, olderBlockData] = await Promise.all([
      rpc('eth_getBlockByNumber', [blockNumberHex, false]),
      rpc('eth_getBlockByNumber', [`0x${(currentBlock - 5000).toString(16)}`, false]),
    ]);

    const latestTs = parseInt(latestBlockData?.timestamp || '0', 16);
    const olderTs = parseInt(olderBlockData?.timestamp || '0', 16);
    const blockTimeSec = (latestTs - olderTs) / 5000;
    const blocksPerDay = Math.floor(86400 / blockTimeSec);

    // Sample 40 recent blocks to get average TX count per block
    const sampleRequests = Array.from({ length: 40 }, (_, i) => ({
      method: 'eth_getBlockTransactionCountByNumber',
      params: [`0x${(currentBlock - i * 10).toString(16)}`],
    }));
    const sampledCounts = await rpcBatch(sampleRequests);
    const validCounts = sampledCounts
      .map((r: string) => parseInt(r, 16))
      .filter((n: number) => !isNaN(n) && n >= 0);

    const avgTxPerBlock = validCounts.reduce((a: number, b: number) => a + b, 0) / validCounts.length;

    // 24H TX estimate
    const txToday = Math.floor(avgTxPerBlock * blocksPerDay);

    // Total TX — abscan shows 167M, we hardcode as baseline + estimate growth
    // Abstract launched Jan 27 2025, ~24 days ago at ~4 TPS avg
    // We use currentBlock * avgTxPerBlock but cap reasonably
    const rawTotal = Math.floor(avgTxPerBlock * currentBlock);
    // Cross-reference: abscan shows 167.24M at block ~41.3M
    // ratio = 167.24M / 41.3M = ~4.05 tx per block on average historically
    const historicalAvgTxPerBlock = 4.05;
    const totalTxs = Math.floor(historicalAvgTxPerBlock * currentBlock);

    // Build 14-day chart using block samples
    const chartData = [];
    for (let day = 13; day >= 0; day--) {
      const targetBlock = Math.max(currentBlock - Math.floor(day * blocksPerDay), 1);
      const blockHex = `0x${targetBlock.toString(16)}`;
      const blockData = await rpc('eth_getBlockByNumber', [blockHex, false]);
      const ts = parseInt(blockData?.timestamp || '0', 16);
      const date = new Date(ts * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Sample 5 blocks near this point
      const nearbyReqs = Array.from({ length: 5 }, (_, i) => ({
        method: 'eth_getBlockTransactionCountByNumber',
        params: [`0x${(targetBlock + i * 200).toString(16)}`],
      }));
      const nearbyCounts = await rpcBatch(nearbyReqs);
      const dayAvg = nearbyCounts
        .map((r: string) => parseInt(r, 16))
        .filter((n: number) => !isNaN(n))
        .reduce((a: number, b: number) => a + b, 0) / 5;

      chartData.push({ date, txs: Math.floor(dayAvg * blocksPerDay) });
    }

    const txYesterday = chartData[chartData.length - 2]?.txs || txToday;
    const txChange = txYesterday > 0
      ? parseFloat((((txToday - txYesterday) / txYesterday) * 100).toFixed(1))
      : 0;

    return NextResponse.json({
      blockNumber: currentBlock,
      gasPriceGwei,
      totalTxs: formatNumber(totalTxs),
      txToday: formatNumber(txToday),
      txChange,
      chartData,
      timestamp: Date.now(),
    });

  } catch (err) {
    console.error('Stats API error:', err);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}
