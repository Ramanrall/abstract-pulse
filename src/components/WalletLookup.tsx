'use client';

import { useState } from 'react';

type WalletData = {
  address: string;
  balanceEth: string;
  txCount: number;
  appsUsed: number;
  joinedDate: string;
  daysOnChain: number;
  estimatedXP: number;
  percentile: string;
  tier: {
    name: string;
    icon: string;
    color: string;
    bg: string;
    border: string;
    next: string;
    nextXP: number;
  };
  recentTxs: {
    hash: string;
    to: string;
    value: string;
    date: string;
    status: string;
  }[];
};

export default function WalletLookup() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const addr = input.trim();
    if (!addr) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`/api/wallet/${addr}`);
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setResult(data); }
    } catch {
      setError('Failed to fetch wallet data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const xpProgress = result
    ? Math.min((result.estimatedXP / result.tier.nextXP) * 100, 100)
    : 0;

  return (
    <section className="animate-fade-up delay-4" style={{
      background: '#0d0d12',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '20px',
      padding: '36px',
      marginBottom: '40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '6px' }}>Wallet Analyzer</h2>
        <p style={{ fontSize: '13px', color: '#9896A8', fontWeight: 400 }}>
          Paste any Abstract wallet address to see their estimated tier and on-chain activity breakdown.
        </p>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="0x1234...abcd"
          style={{ flex: 1, background: '#12121a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#F0EEF8', outline: 'none', transition: 'border-color 0.2s' }}
          onFocus={e => (e.target.style.borderColor = '#7B61FF')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{ background: loading ? '#5a47cc' : '#7B61FF', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px 24px', fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
        >
          {loading ? 'Analyzing...' : 'Analyze →'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: '14px 18px', background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '10px', color: '#FF6B6B', fontFamily: "'DM Mono', monospace", fontSize: '12px', marginBottom: '16px' }}>
          ⚠ {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div>
          {/* Identity row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '16px', alignItems: 'center', padding: '18px', background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '14px', marginBottom: '16px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'linear-gradient(135deg, #7B61FF, #00E5FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
              🧑‍💻
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', marginBottom: '4px' }}>{result.address}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#6B6880' }}>
                Joined Abstract · {result.joinedDate} · {result.daysOnChain} days on-chain
              </div>
            </div>
            <div style={{ padding: '8px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', background: result.tier.bg, color: result.tier.color, border: `1px solid ${result.tier.border}`, textAlign: 'center' }}>
              {result.tier.icon} {result.tier.name}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#6B6880', fontWeight: 400, marginTop: '2px' }}>Estimated Tier</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {[
              { label: 'Total TXs',     value: result.txCount.toLocaleString(), sub: 'on Abstract' },
              { label: 'Apps Used',     value: result.appsUsed.toString(),       sub: 'distinct contracts' },
              { label: 'Est. XP Score', value: `~${result.estimatedXP.toLocaleString()}`, sub: 'based on activity' },
              { label: 'Percentile',    value: result.percentile,                sub: 'of all wallets' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#6B6880', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#6B6880' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ETH Balance */}
          <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#6B6880' }}>ETH Balance</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '14px', fontWeight: 600, color: '#00D97E' }}>{result.balanceEth} ETH</span>
          </div>

          {/* XP Progress */}
          {result.tier.name !== 'DIAMOND' && (
            <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Progress to {result.tier.next} Tier</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#6B6880' }}>
                  ~{result.estimatedXP.toLocaleString()} XP / {result.tier.nextXP.toLocaleString()} XP
                </span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${xpProgress}%`, background: 'linear-gradient(90deg, #7B61FF, #00E5FF)', borderRadius: '3px', transition: 'width 1s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#6B6880' }}>
                <span>{result.tier.name}</span>
                <span>You are here · {Math.round(xpProgress)}%</span>
                <span>{result.tier.next}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
