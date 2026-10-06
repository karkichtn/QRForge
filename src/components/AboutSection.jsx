import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function AboutSection() {
  const scrollToGenerator = () => {
    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = document.getElementById('url-input');
      if (input) input.focus();
    }
  };

  return (
    <section id="about" className="about-editorial-section">
      <div className="container">
        <div className="about-inner-box">
          <div className="eyebrow-tag">
            <span className="eyebrow-accent">[ 005 // CONCLUSION ]</span>
            <span>ENDLESS POSSIBILITIES</span>
          </div>

          <h2 className="about-huge-title">BUILT FOR SHARING.</h2>

          <p className="about-body-text">
            QRForge was engineered to treat the QR code not as a disposable graphic, but as an
            enduring physical-to-digital monument. Client-side compiled, privacy-centric, and
            rendered with vector-grade precision.
          </p>

          <button
            type="button"
            className="btn-primary-cinematic"
            onClick={scrollToGenerator}
            style={{ marginTop: '1rem' }}
          >
            <span>CREATE YOUR QR CODE</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
