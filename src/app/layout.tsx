import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abstract Pulse — Chain Analytics',
  description: 'Real-time statistics, tier distribution, and on-chain wallet analytics for the Abstract L2 ecosystem.',
  openGraph: {
    title: 'Abstract Pulse',
    description: 'Live Abstract chain analytics — tiers, transactions, wallets.',
    siteName: 'Abstract Pulse',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-glow-top" />
        <div className="bg-glow-bottom" />
        <div className="noise-overlay" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
