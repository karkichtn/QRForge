import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container">
        <div className="nav-inner">
          {/* Minimal Brand */}
          <a href="#" className="nav-brand" aria-label="QRForge">
            <span className="nav-brand-dot" />
            <span>QRFORGE</span>
          </a>

          {/* Desktop Links */}
          <nav aria-label="Primary Navigation">
            <ul className="nav-menu">
              <li>
                <a href="#generator" className="nav-link">
                  Generator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="nav-link">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="nav-link">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
            </ul>
          </nav>

          {/* Header Action */}
          <div className="nav-right-actions">
            <a
              href="https://github.com/karkichtn/QRForge"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta-btn"
            >
              <span>GitHub</span>
              <ArrowUpRight size={12} style={{ display: 'inline', marginLeft: 4 }} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#generator" className="mobile-nav-item" onClick={closeMenu}>
          <span>Generator</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>01</span>
        </a>
        <a href="#how-it-works" className="mobile-nav-item" onClick={closeMenu}>
          <span>How It Works</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>02</span>
        </a>
        <a href="#features" className="mobile-nav-item" onClick={closeMenu}>
          <span>Philosophy</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>03</span>
        </a>
        <a href="#about" className="mobile-nav-item" onClick={closeMenu}>
          <span>About</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>04</span>
        </a>
        <a
          href="https://github.com/karkichtn/QRForge"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-item"
          onClick={closeMenu}
        >
          <span>Source Code</span>
          <ArrowUpRight size={18} />
        </a>
      </div>
    </header>
  );
}
