import React from 'react';

const STEPS = [
  {
    num: '01',
    eyebrow: 'PHASE 01 // INPUT',
    title: 'PASTE YOUR LINK',
    desc: 'Any URL. Any destination. Complete protocol preservation without stripping query parameters or deep tracking strings.',
  },
  {
    num: '02',
    eyebrow: 'PHASE 02 // COMPILATION',
    title: 'INSTANT MATRIX GENERATION',
    desc: 'Direct client-side vector compilation. Pure mathematical Reed-Solomon error correction calculated in your browser.',
  },
  {
    num: '03',
    eyebrow: 'PHASE 03 // RESOLUTION',
    title: 'SCAN & GO',
    desc: 'One optical camera scan takes users straight to the target. No intermediary redirects, no advertising screens, zero latency.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="editorial-section">
      <div className="container">
        {/* Section Header */}
        <div className="editorial-header-block">
          <div className="eyebrow-tag">
            <span className="eyebrow-accent">[ 003 // METHODOLOGY ]</span>
            <span>THREE-STEP PIPELINE</span>
          </div>
          <h2 className="editorial-title">HOW IT WORKS</h2>
          <p className="editorial-subtitle">
            A frictionless bridge between the physical and digital world.
          </p>
        </div>

        {/* Cinematic Horizontal Storytelling Columns */}
        <div className="story-steps-container">
          {STEPS.map((step) => (
            <div key={step.num} className="story-step-col">
              <span className="step-num-huge">{step.num}</span>
              <div className="eyebrow-tag">{step.eyebrow}</div>
              <h3 className="step-header-title">{step.title}</h3>
              <p className="step-body-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
