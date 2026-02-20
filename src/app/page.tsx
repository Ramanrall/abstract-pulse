import Navbar from '@/components/Navbar';
import GlobalStats from '@/components/GlobalStats';
import TierDistribution from '@/components/TierDistribution';
import ActivityChart from '@/components/ActivityChart';
import TopApps from '@/components/TopApps';
import WalletLookup from '@/components/WalletLookup';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── Hero ── */}
        <section className="animate-fade-up" style={{ padding: '52px 0 40px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            color: '#00E5FF',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            // Abstract L2 Analytics
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 62px)',
            fontWeight: 800,
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: '12px',
          }}>
            Chain{' '}
            <span style={{
              background: 'linear-gradient(90deg, #7B61FF, #00E5FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Pulse.
            </span>
          </h1>

          <p style={{ color: '#9896A8', fontSize: '15px', fontWeight: 400, maxWidth: '480px', lineHeight: 1.6, marginBottom: '28px' }}>
            Real-time statistics, tier distribution, and on-chain wallet analytics for the Abstract ecosystem.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#6B6880', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: '#00E5FF' }}>⬡</span> ZK Rollup · EVM Compatible
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#6B6880', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>📦</span> Block #4,821,034
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              background: 'rgba(255,209,102,0.08)',
              color: '#FFD166',
              border: '1px solid rgba(255,209,102,0.2)',
              padding: '4px 12px',
              borderRadius: '6px',
            }}>
              🗓 Tier XP updates Tuesdays 12:00 PM EST
            </div>
          </div>
        </section>

        {/* ── Global Stats ── */}
        <GlobalStats />

        {/* ── Tiers ── */}
        <TierDistribution />

        {/* ── Charts + Apps grid ── */}
        <div className="animate-fade-up delay-3" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '40px',
        }}>
          <ActivityChart />
          <TopApps />
        </div>

        {/* ── Wallet Lookup ── */}
        <WalletLookup />

      </main>

      <Footer />
    </>
  );
}
