import React from 'react';

const STATEMENTS = [
  {
    main: 'NO ACCOUNT.',
    sub: '[ 01 // ZERO SIGNUP ]',
    detail: 'No authentication barriers. No mandatory email submissions. Immediate access on page load.',
  },
  {
    main: 'NO COMPLEXITY.',
    sub: '[ 02 // PURE VECTOR ]',
    detail: 'No server redirects or expiring dynamic link quotas. The destination is baked directly into the matrix.',
  },
  {
    main: 'JUST A LINK.',
    sub: '[ 03 // UNIVERSAL SCANNABILITY ]',
    detail: 'Standard ISO/IEC 18004 barcode specification. Seamless resolution across iOS, Android, and industrial scanners.',
  },
];

export default function Features() {
  return (
    <section id="features" className="statements-section">
      <div className="container">
        {/* Section Header */}
        <div className="editorial-header-block" style={{ marginBottom: '2rem' }}>
          <div className="eyebrow-tag">
            <span className="eyebrow-accent">[ 004 // PHILOSOPHY ]</span>
            <span>CORE PRINCIPLES</span>
          </div>
          <h2 className="editorial-title">THE QRFORGE STANDARD</h2>
        </div>

        {/* Large Statement Rows */}
        <div>
          {STATEMENTS.map((item, idx) => (
            <div key={idx} className="statement-row">
              <div>
                <div className="eyebrow-tag" style={{ marginBottom: '0.75rem' }}>
                  {item.sub}
                </div>
                <div className="statement-text">{item.main}</div>
              </div>

              <p className="statement-annotation">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
