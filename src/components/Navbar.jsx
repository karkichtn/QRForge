import React, { useState } from 'react';
import { QrCode, Menu, X, Sparkles, ExternalLink } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header" role="banner">
      <div className="container header-container">
        {/* Brand Logo */}
        <a href="#generator" className="brand-logo" aria-label="QRForge Homepage">
          <div className="brand-icon-wrapper">
            <QrCode size={22} strokeWidth={2.4} />
          </div>
          <span className="brand-name">QRForge</span>
          <span className="brand-badge">PRO</span>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
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
                Why QRForge
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <a
            href="https://github.com/karkichtn/QRForge"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
            aria-label="GitHub Repository"
          >
            <GithubIcon size={17} />
            <span>GitHub</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#generator" className="mobile-nav-link" onClick={closeMenu}>
          <span>Generator</span>
          <Sparkles size={16} />
        </a>
        <a href="#how-it-works" className="mobile-nav-link" onClick={closeMenu}>
          <span>How It Works</span>
        </a>
        <a href="#features" className="mobile-nav-link" onClick={closeMenu}>
          <span>Why QRForge</span>
        </a>
        <a href="#about" className="mobile-nav-link" onClick={closeMenu}>
          <span>About</span>
        </a>
        <a
          href="https://github.com/karkichtn/QRForge"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-link"
          onClick={closeMenu}
        >
          <span>GitHub Repository</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </header>
  );
}
