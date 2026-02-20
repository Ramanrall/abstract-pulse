# Abstract Pulse

Real-time chain analytics dashboard for the Abstract L2 ecosystem.
Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Main dashboard page
│   └── globals.css       # Global styles + CSS variables
└── components/
    ├── AbstractLogo.tsx   # Brand logo (SVG mark + wordmark)
    ├── Navbar.tsx         # Sticky nav with tab switching
    ├── GlobalStats.tsx    # 4-card stats row (TXs, Revenue, Wallets, Gas)
    ├── TierDistribution.tsx # 5 tier cards with animated bars
    ├── ActivityChart.tsx  # 14-day TX volume bar chart
    ├── TopApps.tsx        # Top dApps by on-chain activity
    ├── WalletLookup.tsx   # Wallet search + analyzer
    └── Footer.tsx         # Footer with links
```

---

## ☁️ Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**

That's it. No environment variables needed yet (Step 3 will add API keys).

---

## 🗺 Roadmap

- [x] Step 1 — UI Shell
- [x] Step 2 — Next.js project scaffold
- [ ] Step 3 — Live chain data (Abstract RPC + Goldsky)
- [ ] Step 4 — Real wallet analysis API
- [ ] Step 5 — Polish + performance
