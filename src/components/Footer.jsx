import React from 'react';
import { QrCode, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#generator" className="brand-logo" aria-label="QRForge">
              <div className="brand-icon-wrapper" style={{ width: 34, height: 34 }}>
                <QrCode size={18} strokeWidth={2.4} />
              </div>
              <span className="brand-name">QRForge</span>
            </a>
            <p className="footer-tagline">
              Modern URL-to-QR code generator crafted for speed, privacy, and pixel perfection.
            </p>
          </div>

          <div className="footer-links-group">
            <div>
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-links-list">
                <li><a href="#generator" className="footer-link">Generator</a></li>
                <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#about" className="footer-link">About & Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-links-list">
                <li>
                  <a
                    href="https://github.com/karkichtn/QRForge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    <span>Source Code</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/QR_code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    <span>QR Standards</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a href="#generator" className="footer-link">Back to Top</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} QRForge. Open-source & client-side only.</p>

          <div className="footer-status-pill">
            <span className="status-dot" />
            <span>100% Client-Side • Zero Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
