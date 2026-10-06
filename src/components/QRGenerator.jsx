import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Download,
  Copy,
  Share2,
  RotateCcw,
  ExternalLink,
  Clipboard,
  X,
  SlidersHorizontal,
  Check,
  AlertCircle,
  CornerDownLeft,
} from 'lucide-react';

const QUICK_SAMPLES = [
  { label: 'github.com', url: 'https://github.com' },
  { label: 'rockstargames.com', url: 'https://rockstargames.com' },
  { label: 'wikipedia.org', url: 'https://wikipedia.org' },
  { label: 'apple.com', url: 'https://apple.com' },
];

export default function QRGenerator({ showToast }) {
  const [inputUrl, setInputUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [dataUrl, setDataUrl] = useState('');

  // Technical Options
  const [showOptions, setShowOptions] = useState(false);
  const [qrSize, setQrSize] = useState(800);
  const [ecLevel, setEcLevel] = useState('H');

  // History from localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('qrforge_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('qrforge_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Unable to persist history', e);
    }
  }, [history]);

  // URL Normalizer & Validator
  const normalizeAndValidateUrl = (rawInput) => {
    if (!rawInput) return { valid: false, error: 'Please enter a URL' };

    let cleaned = rawInput.trim();
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(cleaned)) {
      cleaned = `https://${cleaned}`;
    }

    try {
      const parsed = new URL(cleaned);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return { valid: false, error: 'Only HTTP and HTTPS links are supported' };
      }
      if (!parsed.hostname || !parsed.hostname.includes('.')) {
        return { valid: false, error: 'Please enter a valid domain (e.g. example.com)' };
      }
      return { valid: true, url: parsed.href, hostname: parsed.hostname };
    } catch {
      return { valid: false, error: 'Invalid URL format' };
    }
  };

  // Generation Handler
  const handleGenerate = async (overrideUrl, isSilent = false) => {
    const rawToTest = typeof overrideUrl === 'string' ? overrideUrl : inputUrl;
    if (!isSilent) setErrorMessage('');

    const validation = normalizeAndValidateUrl(rawToTest);
    if (!validation.valid) {
      if (!isSilent) setErrorMessage(validation.error);
      return false;
    }

    const validatedUrl = validation.url;
    setIsGenerating(true);

    try {
      const generatedDataUrl = await QRCode.toDataURL(validatedUrl, {
        width: qrSize,
        margin: 2,
        color: {
          dark: '#08080a',
          light: '#ffffff',
        },
        errorCorrectionLevel: ecLevel,
      });

      setDataUrl(generatedDataUrl);
      setCurrentUrl(validatedUrl);
      setInputUrl(validatedUrl);
      setHasGenerated(true);
      setErrorMessage('');

      // Update history
      const newEntry = {
        id: Date.now(),
        url: validatedUrl,
        hostname: validation.hostname,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thumbnail: generatedDataUrl,
      };

      setHistory((prev) => {
        const filtered = prev.filter((item) => item.url !== validatedUrl);
        return [newEntry, ...filtered].slice(0, 4);
      });

      return true;
    } catch (err) {
      console.error('QR Generation failed:', err);
      if (!isSilent) setErrorMessage('Could not generate QR code.');
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  // Live Real-Time Auto-Generation as user types
  useEffect(() => {
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setHasGenerated(false);
      setDataUrl('');
      setCurrentUrl('');
      setErrorMessage('');
      return;
    }

    if (currentUrl === trimmed && hasGenerated) return;

    const validation = normalizeAndValidateUrl(trimmed);
    if (!validation.valid) return;

    const debounceTimer = setTimeout(() => {
      handleGenerate(trimmed, true);
    }, 220);

    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputUrl]);

  // Re-generate if options change
  useEffect(() => {
    if (hasGenerated && currentUrl) {
      handleGenerate(currentUrl, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrSize, ecLevel]);

  // Direct paste on input element
  const handleInputPaste = (e) => {
    const pastedText = e.clipboardData?.getData('text');
    if (pastedText && pastedText.trim()) {
      const trimmed = pastedText.trim();
      setInputUrl(trimmed);
      setErrorMessage('');
      handleGenerate(trimmed, false);
    }
  };

  // Clipboard Paste Button
  const handlePasteBtn = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        const trimmed = text.trim();
        setInputUrl(trimmed);
        setErrorMessage('');
        inputRef.current?.focus();
        handleGenerate(trimmed, false);
      }
    } catch {
      showToast('Could not access clipboard.', 'info');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputUrl.trim() && !isGenerating) {
        handleGenerate(inputUrl, false);
      }
    }
  };

  // Download Action
  const handleDownloadPng = () => {
    if (!dataUrl) return;
    try {
      let domain = 'qrforge';
      try {
        domain = new URL(currentUrl).hostname.replace(/[^a-zA-Z0-9]/g, '_');
      } catch {
        // ignore
      }
      const filename = `${domain}-qrforge.png`;
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Downloaded ${filename}`, 'success');
    } catch {
      showToast('Failed to download QR code.', 'error');
    }
  };

  // Copy URL Action
  const handleCopyLink = async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      showToast('Link copied to clipboard', 'success');
    } catch {
      showToast('Failed to copy link.', 'error');
    }
  };

  // Share Action
  const handleShare = async () => {
    if (!currentUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QRForge Link',
          text: currentUrl,
          url: currentUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  // Reset
  const handleReset = () => {
    setInputUrl('');
    setErrorMessage('');
    setHasGenerated(false);
    setDataUrl('');
    setCurrentUrl('');
    inputRef.current?.focus();
  };

  return (
    <section id="generator" className="editorial-section">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header-block">
          <div className="eyebrow-tag">
            <span className="eyebrow-accent">[ 002 // ENGINE ]</span>
            <span>DIRECT VECTOR ENCODING</span>
          </div>
          <h2 className="editorial-title">CREATE YOUR CODE</h2>
          <p className="editorial-subtitle">
            Paste any destination URL. Real-time client compilation with zero server hops.
          </p>
        </div>

        {/* Clean Architectural Generator Container */}
        <div className="generator-editorial-wrapper">
          <div className="input-editorial-container">
            {/* Input Metadata Bar */}
            <div className="input-metadata-line">
              <span>DESTINATION URL // LIVE VALIDATION</span>
              <span style={{ color: 'var(--accent-amber)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 5, height: 5, background: 'var(--accent-amber)' }} />
                REALTIME ACTIVE
              </span>
            </div>

            {/* Architectural Underline Input Group */}
            <div className={`input-underline-group ${errorMessage ? 'has-error' : ''}`}>
              <input
                ref={inputRef}
                id="url-input"
                type="text"
                className="editorial-url-input"
                placeholder="https://example.com"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                onPaste={handleInputPaste}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
              />

              <div className="input-tail-actions">
                {inputUrl && (
                  <button
                    type="button"
                    className="btn-inline-action"
                    onClick={() => setInputUrl('')}
                    title="Clear URL"
                  >
                    <X size={13} />
                    <span>CLEAR</span>
                  </button>
                )}

                <button
                  type="button"
                  className="btn-inline-action"
                  onClick={handlePasteBtn}
                  title="Paste from clipboard"
                >
                  <Clipboard size={13} />
                  <span>PASTE</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="error-alert-bar" role="alert">
                <AlertCircle size={14} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Samples */}
            <div className="samples-row">
              <span>PRESETS:</span>
              {QUICK_SAMPLES.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  className="sample-link-btn"
                  onClick={() => {
                    setInputUrl(sample.url);
                    setErrorMessage('');
                    handleGenerate(sample.url, false);
                  }}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Control Bar */}
          <div className="generator-control-bar">
            <button
              type="button"
              className="customization-editorial-toggle"
              onClick={() => setShowOptions(!showOptions)}
            >
              <SlidersHorizontal size={14} />
              <span>{showOptions ? 'HIDE SPECIFICATIONS' : 'ADJUST SPECIFICATIONS'}</span>
            </button>

            <button
              type="button"
              className="btn-generate-cinematic"
              disabled={!inputUrl.trim() || isGenerating}
              onClick={() => handleGenerate(inputUrl, false)}
            >
              {isGenerating ? (
                <span>COMPILING...</span>
              ) : hasGenerated ? (
                <>
                  <Check size={16} />
                  <span>MATRIX READY</span>
                </>
              ) : (
                <>
                  <span>GENERATE QR CODE</span>
                  <CornerDownLeft size={14} />
                </>
              )}
            </button>
          </div>

          {/* Technical Specifications Drawer */}
          {showOptions && (
            <div className="editorial-options-drawer">
              <div className="opt-column">
                <span className="opt-label">EXPORT RESOLUTION</span>
                <select
                  className="opt-select"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                >
                  <option value={400}>400 × 400 PX (STANDARD)</option>
                  <option value={800}>800 × 800 PX (HI-RES)</option>
                  <option value={1200}>1200 × 1200 PX (4K MASTER)</option>
                </select>
              </div>

              <div className="opt-column">
                <span className="opt-label">REDUNDANCY / CORRECTION</span>
                <select
                  className="opt-select"
                  value={ecLevel}
                  onChange={(e) => setEcLevel(e.target.value)}
                >
                  <option value="H">LEVEL H — 30% RECOVERY</option>
                  <option value="Q">LEVEL Q — 25% RECOVERY</option>
                  <option value="M">LEVEL M — 15% RECOVERY</option>
                </select>
              </div>
            </div>
          )}

          {/* QR Result Area */}
          <div className="qr-result-cinematic-container">
            {!hasGenerated ? (
              <div className="qr-empty-cinematic">
                <span className="empty-mono-header">[ STANDBY // NO PAYLOAD ]</span>
                <p className="empty-main-text">
                  Paste or input any link above. The vector matrix renders instantly.
                </p>
              </div>
            ) : (
              <div className="qr-hero-exhibit">
                {/* Museum-Quality Matte Framed QR Card */}
                <div className="qr-matte-frame">
                  <div className="registration-corner corner-tl" />
                  <div className="registration-corner corner-tr" />
                  <div className="registration-corner corner-bl" />
                  <div className="registration-corner corner-br" />

                  {dataUrl && (
                    <img
                      src={dataUrl}
                      alt={`Matrix for ${currentUrl}`}
                      style={{ imageRendering: 'crisp-edges' }}
                    />
                  )}

                  <div className="qr-frame-annotation">
                    <span className="annotation-dot" />
                    <span>DIRECT OPTICAL BRIDGE // 100% SCANNABLE</span>
                  </div>
                </div>

                {/* Direct URL Metadata Strip */}
                <div className="result-url-strip">
                  <span className="result-url-text" title={currentUrl}>
                    {currentUrl}
                  </span>
                  <a
                    href={currentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="result-url-external"
                    title="Open destination in new tab"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>

                {/* Action Buttons Strip */}
                <div className="result-actions-strip">
                  <button
                    type="button"
                    className="btn-action-cinematic btn-action-solid"
                    onClick={handleDownloadPng}
                  >
                    <Download size={14} />
                    <span>DOWNLOAD PNG</span>
                  </button>

                  <button
                    type="button"
                    className="btn-action-cinematic btn-action-outline"
                    onClick={handleCopyLink}
                  >
                    <Copy size={14} />
                    <span>COPY LINK</span>
                  </button>

                  <button
                    type="button"
                    className="btn-action-cinematic btn-action-outline"
                    onClick={handleShare}
                  >
                    <Share2 size={14} />
                    <span>SHARE</span>
                  </button>

                  <button
                    type="button"
                    className="btn-action-cinematic btn-action-outline"
                    onClick={handleReset}
                  >
                    <RotateCcw size={14} />
                    <span>NEW CODE</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* History Strip */}
          {history.length > 0 && (
            <div className="history-cinematic-strip">
              <div className="history-strip-header">
                <span>RECENT MATRICES</span>
                <button
                  type="button"
                  style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem('qrforge_history');
                  }}
                >
                  CLEAR
                </button>
              </div>

              <div className="history-strip-grid">
                {history.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="history-strip-card"
                    onClick={() => {
                      setInputUrl(item.url);
                      setCurrentUrl(item.url);
                      setDataUrl(item.thumbnail);
                      setHasGenerated(true);
                      setErrorMessage('');
                    }}
                  >
                    <div className="history-card-thumb">
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <div className="history-card-details">
                      <div className="history-card-domain">{item.hostname}</div>
                      <div className="history-card-time">{item.timestamp}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
