export default function AbstractLogo() {
  return (
    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      <span style={{ fontSize: '22px', lineHeight: 1 }}>✳️</span>

      {/* Wordmark */}
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '19px',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.3px',
        lineHeight: 1,
      }}>
        abstract
      </span>

      {/* Divider */}
      <span style={{
        width: '1px',
        height: '16px',
        background: 'rgba(255,255,255,0.12)',
        display: 'inline-block',
        margin: '0 2px',
      }} />

      {/* Sub-label */}
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '11px',
        color: '#6B6880',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}>
        Pulse
      </span>
    </a>
  );
}
