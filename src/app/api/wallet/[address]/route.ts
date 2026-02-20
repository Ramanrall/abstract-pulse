import { NextResponse } from 'next/server';

const RPC = 'https://api.mainnet.abs.xyz/';
const ETHERSCAN = 'https://api.etherscan.io/v2/api';
const CHAIN_ID = '2741';
const API_KEY = process.env.ETHERSCAN_API_KEY!;

async function rpc(method: string, params: unknown[]) {
  const res = await fetch(RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  const data = await res.json();
  return data.result;
}

async function etherscan(module: string, action: string, extra: Record<string, string> = {}) {
  const params = new URLSearchParams({
    chainid: CHAIN_ID,
    module,
    action,
    apikey: API_KEY,
    ...extra,
  });
  const res = await fetch(`${ETHERSCAN}?${params}`);
  const data = await res.json();
  return data.result;
}

export async function GET(
  _req: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params;

  // Basic address validation
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
  }

  try {
    const [balanceHex, txCountHex, txList] = await Promise.all([
      rpc('eth_getBalance', [address, 'latest']),
      rpc('eth_getTransactionCount', [address, 'latest']),
      etherscan('account', 'txlist', {
        address,
        startblock: '0',
        endblock: '99999999',
        sort: 'desc',
        offset: '100',
        page: '1',
      }),
    ]);

    // ETH balance
    const balanceEth = (parseInt(balanceHex, 16) / 1e18).toFixed(4);

    // TX count
    const txCount = parseInt(txCountHex, 16);

    // Process TX list
    const txs = Array.isArray(txList) ? txList : [];

    // Unique contracts interacted with
    const contracts = new Set(txs.map((tx: { to: string }) => tx.to?.toLowerCase()).filter(Boolean));
    const appsUsed = contracts.size;

    // First TX date (joined date)
    const firstTx = txs.length > 0 ? txs[txs.length - 1] : null;
    const joinedDate = firstTx
      ? new Date(parseInt(firstTx.timeStamp) * 1000).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric',
        })
      : 'Unknown';

    // Days on chain
    const daysOnChain = firstTx
      ? Math.floor((Date.now() - parseInt(firstTx.timeStamp) * 1000) / 86400000)
      : 0;

    // Estimate XP based on on-chain activity
    const estimatedXP = estimateXP(txCount, appsUsed, daysOnChain);
    const tier = getTier(estimatedXP);

    // Percentile estimate
    const percentile = getPercentile(estimatedXP);

    return NextResponse.json({
      address: `${address.slice(0, 6)}...${address.slice(-4)}`,
      fullAddress: address,
      balanceEth,
      txCount,
      appsUsed,
      joinedDate,
      daysOnChain,
      estimatedXP,
      tier,
      percentile,
      recentTxs: txs.slice(0, 5).map((tx: {
        hash: string;
        to: string;
        value: string;
        timeStamp: string;
        isError: string;
      }) => ({
        hash: tx.hash,
        to: tx.to,
        value: (parseInt(tx.value) / 1e18).toFixed(4),
        date: new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString(),
        status: tx.isError === '0' ? 'success' : 'failed',
      })),
    });
  } catch (err) {
    console.error('Wallet API error:', err);
    return NextResponse.json({ error: 'Failed to fetch wallet data' }, { status: 500 });
  }
}

// XP estimation based on on-chain activity signals
function estimateXP(txCount: number, appsUsed: number, daysOnChain: number): number {
  const txScore = Math.min(txCount * 2, 30000);
  const appScore = Math.min(appsUsed * 500, 10000);
  const ageScore = Math.min(daysOnChain * 100, 10000);
  return Math.floor(txScore + appScore + ageScore);
}

function getTier(xp: number): { name: string; icon: string; color: string; bg: string; border: string; next: string; nextXP: number } {
  if (xp >= 50000) return { name: 'DIAMOND', icon: '💎', color: '#B9F2FF', bg: 'rgba(185,242,255,0.07)', border: 'rgba(185,242,255,0.15)', next: 'MAX', nextXP: 50000 };
  if (xp >= 20000) return { name: 'PLATINUM', icon: '💠', color: '#00E5FF', bg: 'rgba(0,229,255,0.08)', border: 'rgba(0,229,255,0.20)', next: 'DIAMOND', nextXP: 50000 };
  if (xp >= 5000)  return { name: 'GOLD',     icon: '🥇', color: '#FFD700', bg: 'rgba(255,215,0,0.10)',  border: 'rgba(255,215,0,0.25)',  next: 'PLATINUM', nextXP: 20000 };
  if (xp >= 1000)  return { name: 'SILVER',   icon: '🥈', color: '#A8A9AD', bg: 'rgba(168,169,173,0.12)', border: 'rgba(168,169,173,0.25)', next: 'GOLD', nextXP: 5000 };
  return { name: 'BRONZE', icon: '🥉', color: '#CD7F32', bg: 'rgba(205,127,50,0.12)', border: 'rgba(205,127,50,0.25)', next: 'SILVER', nextXP: 1000 };
}

function getPercentile(xp: number): string {
  if (xp >= 50000) return 'Top 1%';
  if (xp >= 20000) return 'Top 5%';
  if (xp >= 5000)  return 'Top 18%';
  if (xp >= 1000)  return 'Top 45%';
  return 'Top 80%';
}
