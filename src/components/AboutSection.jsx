import React from 'react';
import { Lock, Cpu, EyeOff, Layers, Check } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="section-container" aria-labelledby="about-title">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Privacy & Quality</div>
          <h2 id="about-title" className="section-title">
            Engineered for Privacy & Reliability
          </h2>
          <p className="section-subtitle">
            Most online QR generators redirect through their own tracking servers. QRForge does not.
          </p>
        </div>

        <div
          className="glass-card"
          style={{
            padding: '2.5rem',
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399',
              }}
            >
              <EyeOff size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Zero Data Collection</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              The QR matrix calculations happen directly within your browser’s JavaScript engine. Your links are never transmitted or logged.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c4b5fd',
              }}
            >
              <Layers size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Direct URL Encoding</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Your QR code embeds your actual link directly. When scanned, it immediately takes the user to your site without middleman redirects or latency.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
            >
              <Lock size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Permanent Scannability</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Because there are no expiring accounts or third-party servers involved, generated QR codes will continue to work indefinitely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
