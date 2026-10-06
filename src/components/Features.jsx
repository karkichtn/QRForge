import React from 'react';
import {
  Zap,
  Smartphone,
  ShieldCheck,
  Palette,
  Download,
  Link,
  CheckCircle,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'No waiting or queueing. QR codes render immediately on your browser in milliseconds.',
  },
  {
    icon: Smartphone,
    title: 'Works on Every Device',
    description: 'Universally scannable by iOS Camera, Android Google Lens, and all barcode reader apps.',
  },
  {
    icon: ShieldCheck,
    title: 'No Account Required',
    description: '100% client-side privacy. Your URLs are never tracked, logged, or stored on remote servers.',
  },
  {
    icon: Palette,
    title: 'Clean High-Quality QR Codes',
    description: 'Crisp vector-sharp rendering with configurable error correction and high contrast for effortless scanning.',
  },
  {
    icon: Download,
    title: 'Download as PNG',
    description: 'Export directly to high-definition PNG format up to 4K resolution, ready for print, menus, or flyers.',
  },
  {
    icon: Link,
    title: 'Supports Any URL',
    description: 'Handles complete URLs, custom subdomains, port numbers, UTM parameters, and query strings flawlessly.',
  },
];

export default function Features() {
  return (
    <section id="features" className="section-container" aria-labelledby="features-title">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Built For Performance</div>
          <h2 id="features-title" className="section-title">
            Why QRForge?
          </h2>
          <p className="section-subtitle">
            Engineered with modern web standards, privacy-first principles, and pixel-perfect clarity.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="glass-card feature-card">
                <div className="feature-icon-wrapper">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
