import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-editorial" role="contentinfo">
      <div className="container">
        <div className="footer-inner-row">
          <div className="footer-brand-title">
            <span>QRFORGE</span>
          </div>

          <ul className="footer-links-inline">
            <li>
              <a href="#generator">Generator</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#features">Philosophy</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a
                href="https://github.com/karkichtn/QRForge"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>

          <div className="footer-copyright">
            <span>© {currentYear} QRFORGE. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
