'use client';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '24px 0',
      marginTop: '20px',
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#6B6880' }}>
          abstract Pulse · Data sourced from Abstract RPC + Goldsky · Not affiliated with Abstract
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['abscan.org', 'abs.xyz', 'GitHub'].map(link => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                color: '#6B6880',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0EEF8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B6880')}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
