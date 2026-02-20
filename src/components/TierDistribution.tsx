'use client';

const TOTAL = 510293 + 172037 + 14654 + 1073 + 65 + 4; // 698,126

const TIERS = [
  {
    key: 'bronze',
    label: 'BRONZE',
    icon: '🥉',
    users: '510,293',
    rawUsers: 510293,
    weeklyChange: '+52',
    pct: ((510293 / TOTAL) * 100).toFixed(1),
    xp: 'Entry level',
    colorVar: '#CD7F32',
    bg: 'rgba(205,127,50,0.12)',
    border: 'rgba(205,127,50,0.25)',
    glowClass: 'tier-bronze',
  },
  {
    key: 'silver',
    label: 'SILVER',
    icon: '🥈',
    users: '172,037',
    rawUsers: 172037,
    weeklyChange: '+95',
    pct: ((172037 / TOTAL) * 100).toFixed(1),
    xp: 'Intermediate',
    colorVar: '#A8A9AD',
    bg: 'rgba(168,169,173,0.12)',
    border: 'rgba(168,169,173,0.25)',
    glowClass: 'tier-silver',
  },
  {
    key: 'gold',
    label: 'GOLD',
    icon: '🥇',
    users: '14,654',
    rawUsers: 14654,
    weeklyChange: '+329',
    pct: ((14654 / TOTAL) * 100).toFixed(1),
    xp: 'Advanced',
    colorVar: '#FFD700',
    bg: 'rgba(255,215,0,0.10)',
    border: 'rgba(255,215,0,0.25)',
    glowClass: 'tier-gold',
  },
  {
    key: 'platinum',
    label: 'PLATINUM',
    icon: '💠',
    users: '1,073',
    rawUsers: 1073,
    weeklyChange: '+43',
    pct: ((1073 / TOTAL) * 100).toFixed(1),
    xp: 'Elite',
    colorVar: '#00E5FF',
    bg: 'rgba(0,229,255,0.08)',
    border: 'rgba(0,229,255,0.20)',
    glowClass: 'tier-plat',
  },
  {
    key: 'diamond',
    label: 'DIAMOND',
    icon: '💎',
    users: '65',
    rawUsers: 65,
    weeklyChange: '+12',
    pct: ((65 / TOTAL) * 100).toFixed(2),
    xp: 'Legend',
    colorVar: '#B9F2FF',
    bg: 'rgba(185,242,255,0.07)',
    border: 'rgba(185,242,255,0.15)',
    glowClass: 'tier-dia',
  },
  {
    key: 'obsidian',
    label: 'OBSIDIAN',
    icon: '🖤',
    users: '4',
    rawUsers: 4,
    weeklyChange: null,
    pct: '< 0.01',
    xp: 'Mythic',
    colorVar: '#9B8FA6',
    bg: 'rgba(155,143,166,0.10)',
    border: 'rgba(155,143,166,0.25)',
    glowClass: 'tier-obsidian',
  },
];

export default function TierDistribution() {
  const maxUsers = TIERS[0].rawUsers;

  return (
    <section className="animate-fade-up delay-2">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>
          Tier Distribution
          <span style={{ color: '#7B61FF', marginLeft: '10px', fontSize: '13px', fontWeight: 500 }}>
            Updated Tue 12:00 EST
          </span>
        </h2>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#6B6880' }}>
          {TOTAL.toLocaleString()} total wallets
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '10px',
        marginBottom: '12px',
      }}>
        {TIERS.map((t) => (
          <div
            key={t.key}
            className={`tier-glow ${t.glowClass}`}
            style={{
              background: '#0d0d12',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
              padding: '18px 16px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 8px',
              borderRadius: '20px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              marginBottom: '14px',
              background: t.bg,
              color: t.colorVar,
              border: `1px solid ${t.border}`,
            }}>
              <span>{t.icon}</span>
              {t.label}
            </div>

            {/* User count */}
            <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>
              {t.users}
            </div>

            {/* % of total + weekly change */}
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              color: '#6B6880',
              marginBottom: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <span>{t.pct}% of wallets</span>
              {t.weeklyChange && (
                <span style={{
                  color: '#00D97E',
                  background: 'rgba(0,217,126,0.08)',
                  border: '1px solid rgba(0,217,126,0.12)',
                  borderRadius: '4px',
                  padding: '1px 5px',
                  fontSize: '9px',
                  width: 'fit-content',
                }}>
                  {t.weeklyChange} this week
                </span>
              )}
            </div>

            {/* Progress bar relative to Bronze */}
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', marginBottom: '10px' }}>
              <div className="tier-bar-animate" style={{
                height: '100%',
                width: `${Math.max((t.rawUsers / maxUsers) * 100, 0.5)}%`,
                minWidth: '3px',
                background: t.colorVar,
                borderRadius: '2px',
              }} />
            </div>

            {/* XP label — honest, no fake numbers */}
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              color: '#6B6880',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              {t.xp}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '10px',
        color: '#6B6880',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{ color: '#FFD166' }}>⚠</span>
        Community-sourced data · XP thresholds not publicly disclosed by Abstract · Updated weekly
      </div>
    </section>
  );
}
