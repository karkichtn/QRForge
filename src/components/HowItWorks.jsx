import React from 'react';
import { Link2, Sparkles, Smartphone, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Paste Your Link',
    description: 'Enter any website URL you want to share. We support full links, subdomains, and query parameters.',
    icon: Link2,
  },
  {
    number: '02',
    title: 'Generate QR',
    description: 'Generate a high-quality QR code instantly with client-side processing and custom styling options.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Scan & Go',
    description: 'Scan it with any phone camera and open the link. Easily download crisp PNG files for print or digital sharing.',
    icon: Smartphone,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-container" aria-labelledby="how-it-works-title">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Simple 3-Step Process</div>
          <h2 id="how-it-works-title" className="section-title">
            How It Works
          </h2>
          <p className="section-subtitle">
            Create production-ready QR codes in seconds without signups or watermarks.
          </p>
        </div>

        <div className="steps-grid">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="glass-card step-card">
                <div className="step-top-row">
                  <span className="step-number">{step.number}</span>
                  <div className="step-icon-box">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                </div>

                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
