'use client';

import { useEffect, useState } from 'react';

type ChartPoint = { date: string; txs: number };

export default function ActivityChart() {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => {
        if (d.chartData?.length) setChartData(d.chartData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const maxTxs = Math.max(...chartData.map(d => d.txs), 1);

  // Fallback skeleton bars while loading
  const bars = loading
    ? Array.from({ length: 14 }, (_, i) => ({ date: '', txs: Math.random() * 80 + 20, skeleton: true }))
    : chartData;

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
        Daily Transaction Volume
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#6B6880', marginBottom: '20px' }}>
        {loading ? 'Loading live data...' : `Last ${chartData.length} days · Live`}
      </div>

      <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
        {bars.map((d, i) => {
          const height = loading
            ? `${(d.txs)}%`
            : `${Math.max(((d.txs / maxTxs) * 100), 4)}%`;
          const isToday = !loading && i === bars.length - 1;
          return (
            <div
              key={i}
              title={loading ? '' : `${d.date}: ${d.txs.toLocaleString()} txs`}
              className={`chart-bar ${isToday ? 'today' : ''}`}
              style={{
                height,
                opacity: loading ? 0.2 : undefined,
                animation: loading ? 'none' : undefined,
              }}
            />
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#6B6880' }}>
        {loading ? (
          <>
            <span>—</span><span>—</span><span>—</span><span>—</span><span>Today</span>
          </>
        ) : (
          <>
            <span>{chartData[0]?.date}</span>
            <span>{chartData[3]?.date}</span>
            <span>{chartData[7]?.date}</span>
            <span>{chartData[11]?.date}</span>
            <span>Today</span>
          </>
        )}
      </div>
    </div>
  );
}
