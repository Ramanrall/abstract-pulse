'use client';

import { useState } from 'react';
import AbstractLogo from './AbstractLogo';

const tabs = ['Overview', 'Tiers', 'Wallet', 'Apps'];

export default function Navbar() {
  const [active, setActive] = useState('Overview');

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(6,6,8,0.85)',
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        <AbstractLogo />

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '2px',
          background: 'rgba(255,255,255,0.035)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px',
          padding: '4px',
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                padding: '7px 18px',
                borderRadius: '7px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                fontFamily: "'Syne', sans-serif",
                transition: 'all 0.2s',
                background: active === tab ? '#7B61FF' : 'transparent',
                color: active === tab ? '#fff' : '#9896A8',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Live badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: "'DM Mono', monospace",
          fontSize: '11px',
          color: '#00D97E',
          background: 'rgba(0,217,126,0.08)',
          border: '1px solid rgba(0,217,126,0.2)',
          padding: '5px 14px',
          borderRadius: '20px',
        }}>
          <span className="live-dot" style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#00D97E',
            display: 'inline-block',
          }} />
          LIVE DATA
        </div>
      </div>
    </nav>
  );
}
