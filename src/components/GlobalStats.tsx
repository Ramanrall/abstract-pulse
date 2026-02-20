'use client';

import { useEffect, useState } from 'react';

type StatsData = {
  blockNumber: number;
  gasPriceGwei: string;
  totalTxs: string;
  txToday: string;
  txChange: number;
};

const changeColor = (dir: 'up' | 'down' | 'neutral') =>
  ({ up: '#00D97E', down: '#FF6B6B', neutral: '#6B6880' }[dir]);

export default function GlobalStats() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const stats = data
    ? [
        {
          label: 'Total Transactions',
          value: data.totalTxs,
          change: `${data.txChange >= 0 ? '▲' : '▼'} ${Math.abs(data.txChange)}% from yesterday`,
          direction: (data.txChange >= 0 ? 'up' : 'down') as 'up' | 'down',
        },
        {
          label: '24H Transactions',
          value: data.txToday,
          change: `${data.txChange >= 0 ? '▲' : '▼'} ${Math.abs(data.txChange)}% from yesterday`,
          direction: (data.txChange >= 0 ? 'up' : 'down') as 'up' | 'down',
        },
        {
          label: 'Current Block',
          value: `#${data.blockNumber.toLocaleString()}`,
          change: '→ Live',
          direction: 'neutral' as const,
        },
        {
          label: 'Avg Gas Price',
          value: `${data.gasPriceGwei} Gwei`,
          change: '→ Stable',
          direction: 'neutral' as const,
        },
      ]
    : [
        { label: 'Total Transactions', value: '—', change: 'Loading...', direction: 'neutral' as const },
        { label: '24H Transactions',   value: '—', change: 'Loading...', direction: 'neutral' as const },
        { label: 'Current Block',      value: '—', change: 'Loading...', direction: 'neutral' as const },
        { label: 'Avg Gas Price',      value: '—', change: 'Loading...', direction: 'neutral' as const },
      ];

  return (
    <div className="animate-fade-up delay-1" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1px',
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      overflow: 'hidden',
      margin: '32px 0',
    }}>
      {stats.map((s) => (
        <div key={s.label} className="stat-card-hover" style={{ background: '#0d0d12', padding: '24px 28px' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#6B6880', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
            {s.label}
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1, marginBottom: '8px', opacity: loading ? 0.3 : 1, transition: 'opacity 0.3s' }}>
            {s.value}
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: changeColor(s.direction) }}>
            {s.change}
          </div>
        </div>
      ))}
    </div>
  );
}
