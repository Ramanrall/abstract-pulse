'use client';

const APPS = [
  { rank: 1, icon: '🎮', name: 'Abstract Gaming Hub', txs: '284,112', vol: '$12.4K' },
  { rank: 2, icon: '🔄', name: 'Abs DEX',             txs: '198,450', vol: '$8.9K' },
  { rank: 3, icon: '🖼',  name: 'Abstract NFT Market', txs: '147,321', vol: '$5.2K' },
  { rank: 4, icon: '🏦', name: 'Abs Lending',          txs: '93,880',  vol: '$3.8K' },
];

export default function TopApps() {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
        Top Apps by Activity
      </div>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '11px',
        color: '#6B6880',
        marginBottom: '20px',
      }}>
        24H on-chain transaction volume
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {APPS.map((app) => (
          <div
            key={app.rank}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid transparent',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.035)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: '#6B6880',
              width: '16px',
              textAlign: 'center',
            }}>
              {app.rank}
            </span>

            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #7B61FF, #00E5FF)',
              opacity: 0.8,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
            }}>
              {app.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{app.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#6B6880' }}>
                {app.txs} txs today
              </div>
            </div>

            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '12px',
              fontWeight: 500,
              color: '#00D97E',
            }}>
              {app.vol}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
