import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { ArrowDown, ArrowRight, CornerDownRight } from 'lucide-react';

export default function HeroSection() {
  const [heroQrUrl, setHeroQrUrl] = useState('');
  const cardRef = useRef(null);

  // Generate hero QR code preview once
  useEffect(() => {
    QRCode.toDataURL('https://github.com/karkichtn/QRForge', {
      width: 400,
      margin: 1,
      color: { dark: '#08080a', light: '#ffffff' },
      errorCorrectionLevel: 'H',
    }).then((url) => setHeroQrUrl(url));
  }, []);

  // Subtle 3D mouse parallax tracking for the hero visual card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 14;
    const rotateY = (x / rect.width) * 14;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section className="hero-cinematic" aria-label="Hero Introduction">
      {/* Subtle architectural horizontal guide lines */}
      <div className="hero-ambient-line" style={{ top: '25%' }} />
      <div className="hero-ambient-line" style={{ bottom: '20%' }} />

      <div className="container">
        <div className="hero-grid-layout">
          {/* Asymmetrical Left Typography */}
          <div className="hero-content">
            <div className="eyebrow-tag">
              <span className="eyebrow-accent">[ 001 // ORG ]</span>
              <span>QR CODE GENERATOR</span>
            </div>

            <h1 className="hero-headline">
              TURN ANY LINK<br />
              INTO A QR CODE.
            </h1>

            <p className="hero-description">
              Turn any destination into a physical & digital bridge. High-definition vector matrix.
              Zero server storage. Pure client-side generation.
            </p>

            <div className="hero-actions-group">
              <a href="#generator" className="btn-primary-cinematic">
                <span>CREATE QR CODE</span>
                <ArrowDown size={15} />
              </a>

              <a href="#how-it-works" className="btn-secondary-cinematic">
                <span>EXPLORE SYSTEM</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Hero Visual Sculpture */}
          <div
            className="hero-visual-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={cardRef} className="hero-object-card">
              {/* Four Optical Viewfinder Registration Brackets */}
              <div className="registration-corner corner-tl" />
              <div className="registration-corner corner-tr" />
              <div className="registration-corner corner-bl" />
              <div className="registration-corner corner-br" />

              {/* Card Technical Header */}
              <div className="object-header">
                <span>SPEC // ARCH_01</span>
                <span>ECC: LEVEL_H</span>
              </div>

              {/* Sharp High-Contrast QR Object */}
              <div className="object-qr-art">
                {heroQrUrl ? (
                  <img
                    src={heroQrUrl}
                    alt="Physical-digital QR matrix specimen"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#fff' }} />
                )}
              </div>

              {/* Card Technical Footer */}
              <div className="object-footer">
                <div className="object-status-indicator">
                  <span className="dot-status" />
                  <span>MATRIX: ACTIVE</span>
                </div>
                <span>400 × 400 PX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
