import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  Link2,
  QrCode,
  Download,
  Copy,
  Share2,
  RotateCcw,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Clipboard,
  X,
  SlidersHorizontal,
  Check,
  History,
  Trash2,
  ShieldCheck
} from 'lucide-react';

const COLOR_PRESETS = [
  { name: 'Classic Dark', dark: '#090a10', light: '#ffffff' },
  { name: 'Indigo Cyber', dark: '#4f46e5', light: '#ffffff' },
  { name: 'Neon Purple', dark: '#7e22ce', light: '#ffffff' },
  { name: 'Midnight Blue', dark: '#0369a1', light: '#ffffff' },
  { name: 'Emerald', dark: '#047857', light: '#ffffff' },
  { name: 'Crimson', dark: '#be123c', light: '#ffffff' },
];

const QUICK_LINKS = [
  { label: 'GitHub', url: 'https://github.com' },
  { label: 'YouTube', url: 'https://youtube.com' },
  { label: 'Wikipedia', url: 'https://wikipedia.org' },
  { label: 'ProductHunt', url: 'https://producthunt.com' }
];

export default function QRGenerator({ showToast }) {
  const [inputUrl, setInputUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [dataUrl, setDataUrl] = useState('');

  // Customization Options
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [qrSize, setQrSize] = useState(800);
  const [ecLevel, setEcLevel] = useState('H'); // High error correction level for durability

  // Recent History
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('qrforge_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  // Sync history with localStorage
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

    // If user enters google.com or www.google.com without scheme, prepend https://
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(cleaned)) {
      cleaned = `https://${cleaned}`;
    }

    try {
      const parsed = new URL(cleaned);
      // Ensure protocol is http or https
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return { valid: false, error: 'Only HTTP and HTTPS links are supported' };
      }
      // Ensure there's a valid host
      if (!parsed.hostname || !parsed.hostname.includes('.')) {
        return { valid: false, error: 'Please enter a valid domain (e.g., example.com)' };
      }
      return { valid: true, url: parsed.href, hostname: parsed.hostname };
    } catch {
      return { valid: false, error: 'Invalid URL format. Please check and try again.' };
    }
  };

  // Main Generation Handler
  const handleGenerate = async (overrideUrl, triggerConfetti = true, isSilentValidation = false) => {
    const rawToTest = typeof overrideUrl === 'string' ? overrideUrl : inputUrl;
    if (!isSilentValidation) {
      setErrorMessage('');
    }

    const validation = normalizeAndValidateUrl(rawToTest);
    if (!validation.valid) {
      if (!isSilentValidation) {
        setErrorMessage(validation.error);
      }
      return false;
    }

    const validatedUrl = validation.url;
    setIsGenerating(true);

    try {
      const generatedDataUrl = await QRCode.toDataURL(validatedUrl, {
        width: qrSize,
        margin: 2,
        color: {
          dark: selectedColor.dark,
          light: selectedColor.light,
        },
        errorCorrectionLevel: ecLevel,
      });

      setDataUrl(generatedDataUrl);
      setCurrentUrl(validatedUrl);
      setInputUrl(validatedUrl);
      setHasGenerated(true);
      setErrorMessage('');

      // Save to history
      const newEntry = {
        id: Date.now(),
        url: validatedUrl,
        hostname: validation.hostname,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thumbnail: generatedDataUrl,
      };

      setHistory((prev) => {
        const filtered = prev.filter((item) => item.url !== validatedUrl);
        return [newEntry, ...filtered].slice(0, 6);
      });

      // Confetti celebratory burst on explicit paste or generate
      if (triggerConfetti) {
        try {
          confetti({
            particleCount: 30,
            spread: 55,
            origin: { y: 0.65 },
            colors: ['#8b5cf6', '#6366f1', '#06b6d4', '#38bdf8'],
          });
        } catch {
          // ignore
        }
      }
      return true;
    } catch (err) {
      console.error('QR Generation failed:', err);
      if (!isSilentValidation) {
        setErrorMessage('Could not generate QR code. Please check your URL.');
      }
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  // Real-time live auto-generation when inputUrl changes
  useEffect(() => {
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setHasGenerated(false);
      setDataUrl('');
      setCurrentUrl('');
      setErrorMessage('');
      return;
    }

    // Skip if already generated for this exact URL
    if (currentUrl === trimmed && hasGenerated) {
      return;
    }

    const validation = normalizeAndValidateUrl(trimmed);
    if (!validation.valid) {
      // Don't disturb user with errors while they are midway typing
      return;
    }

    const debounceTimer = setTimeout(() => {
      handleGenerate(trimmed, false, true);
    }, 200);

    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputUrl]);

  // Handle re-render if options change while a QR is visible
  useEffect(() => {
    if (hasGenerated && currentUrl) {
      handleGenerate(currentUrl, false, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, qrSize, ecLevel]);

  // Handle Enter Key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputUrl.trim() && !isGenerating) {
        handleGenerate(inputUrl, true, false);
      }
    }
  };

  // Direct generation on paste event in input
  const handleInputPaste = (e) => {
    const pastedText = e.clipboardData?.getData('text');
    if (pastedText && pastedText.trim()) {
      const trimmed = pastedText.trim();
      setInputUrl(trimmed);
      setErrorMessage('');
      // Generate immediately without waiting for a click or delay!
      handleGenerate(trimmed, true, false);
    }
  };

  // Clipboard Paste Button Click Helper
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        const trimmed = text.trim();
        setInputUrl(trimmed);
        setErrorMessage('');
        inputRef.current?.focus();
        // Generate immediately without waiting for a click!
        handleGenerate(trimmed, true, false);
      }
    } catch {
      showToast('Could not access clipboard. Please paste manually.', 'info');
    }
  };

  // Download Action (High Resolution PNG)
  const handleDownloadPng = () => {
    if (!dataUrl) return;

    try {
      let domain = 'qrforge';
      try {
        domain = new URL(currentUrl).hostname.replace(/[^a-zA-Z0-9]/g, '_');
      } catch {
        // ignore
      }

      const filename = `${domain}-qrcode.png`;
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Downloaded ${filename} successfully!`, 'success');
    } catch (err) {
      console.error('Download error:', err);
      showToast('Failed to download QR code.', 'error');
    }
  };

  // Copy Link Action
  const handleCopyLink = async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      showToast('Link copied!', 'success');
    } catch {
      showToast('Failed to copy link.', 'error');
    }
  };

  // Share Action (Web Share API with fallback)
  const handleShare = async () => {
    if (!currentUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QRForge Generated Link',
          text: `Scan or visit: ${currentUrl}`,
          url: currentUrl,
        });
        showToast('Shared successfully!', 'success');
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Gracefully fallback to copying link
          handleCopyLink();
        }
      }
    } else {
      // Gracefully fall back to copying URL
      handleCopyLink();
    }
  };

  // Reset / Generate New QR
  const handleReset = () => {
    setInputUrl('');
    setErrorMessage('');
    inputRef.current?.focus();
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('qrforge_history');
    } catch {
      // ignore
    }
    showToast('Recent history cleared', 'info');
  };

  // Extract hostname for cleaner display
  const getHostname = (url) => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'link';
    }
  };

  return (
    <section id="generator" className="hero-section">
      <div className="container">
        {/* Hero Header */}
        <div className="hero-badge-wrapper">
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>⚡ Instant QR Generation</span>
          </div>
        </div>

        <h1 className="hero-title">
          Turn Any Link Into a <span className="hero-title-highlight">QR Code</span>
        </h1>

        <p className="hero-subtitle">
          Paste your URL, generate a beautiful QR code, and share it anywhere — instantly.
        </p>

        {/* Generator Card Container */}
        <div className="generator-container">
          <div className="glass-card generator-card">
            {/* Input Group */}
            <div className="input-group">
              <div className="input-label-row">
                <label htmlFor="url-input" className="input-label">
                  <Link2 size={16} color="var(--primary-cyan)" />
                  <span>Target Destination URL</span>
                </label>
                <span className="label-hint" style={{ color: 'var(--primary-cyan)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                  Instant Live Generation Active
                </span>
              </div>

              <div className={`input-box-wrapper ${errorMessage ? 'has-error' : ''}`}>
                <div className="input-icon">
                  <Link2 size={20} />
                </div>

                <input
                  ref={inputRef}
                  id="url-input"
                  type="text"
                  className="url-input"
                  placeholder="https://example.com"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onPaste={handleInputPaste}
                  onKeyDown={handleKeyDown}
                  aria-invalid={!!errorMessage}
                  aria-describedby={errorMessage ? 'url-error' : undefined}
                  autoComplete="off"
                  spellCheck="false"
                />

                <div className="input-actions">
                  {inputUrl && (
                    <button
                      type="button"
                      className="clear-btn"
                      onClick={() => setInputUrl('')}
                      title="Clear input"
                      aria-label="Clear input text"
                    >
                      <X size={15} />
                    </button>
                  )}

                  <button
                    type="button"
                    className="paste-btn"
                    onClick={handlePaste}
                    title="Paste from clipboard"
                    aria-label="Paste from clipboard"
                  >
                    <Clipboard size={14} />
                    <span className="paste-btn-text">Paste</span>
                  </button>
                </div>
              </div>

              {/* Error Message display */}
              {errorMessage && (
                <div id="url-error" className="error-message" role="alert">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Quick sample chips */}
              <div className="quick-samples">
                <span>Try quick sample:</span>
                {QUICK_LINKS.map((sample) => (
                  <button
                    key={sample.label}
                    type="button"
                    className="sample-chip"
                    onClick={() => {
                      setInputUrl(sample.url);
                      setErrorMessage('');
                      handleGenerate(sample.url);
                    }}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Options Toggle */}
            <div>
              <button
                type="button"
                className="customization-toggle"
                onClick={() => setShowOptions(!showOptions)}
                aria-expanded={showOptions}
              >
                <SlidersHorizontal size={15} />
                <span>{showOptions ? 'Hide Customization' : 'Custom Style & Resolution'}</span>
              </button>

              {showOptions && (
                <div className="customization-panel" style={{ marginTop: '0.85rem' }}>
                  {/* Color Palette */}
                  <div className="option-group">
                    <span className="option-title">Accent Theme</span>
                    <div className="color-pills">
                      {COLOR_PRESETS.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          className={`color-pill-btn ${selectedColor.name === color.name ? 'active' : ''}`}
                          style={{ backgroundColor: color.dark }}
                          onClick={() => setSelectedColor(color)}
                          title={color.name}
                          aria-label={`Select ${color.name} color`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resolution Selector */}
                  <div className="option-group">
                    <span className="option-title">Resolution (PNG)</span>
                    <select
                      className="size-select"
                      value={qrSize}
                      onChange={(e) => setQrSize(Number(e.target.value))}
                      aria-label="Select QR code resolution"
                    >
                      <option value={400}>Standard (400 × 400)</option>
                      <option value={800}>High-Def (800 × 800)</option>
                      <option value={1200}>Ultra HD 4K (1200 × 1200)</option>
                    </select>
                  </div>

                  {/* Error Correction Level */}
                  <div className="option-group">
                    <span className="option-title">Error Correction</span>
                    <select
                      className="ec-select"
                      value={ecLevel}
                      onChange={(e) => setEcLevel(e.target.value)}
                      aria-label="Select Error Correction Level"
                    >
                      <option value="H">High (30% redundancy)</option>
                      <option value="Q">Quartile (25% redundancy)</option>
                      <option value="M">Medium (15% redundancy)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Generate Button */}
            {/* Primary Generate Button / Live Indicator */}
            <div className="generate-btn-row">
              <button
                type="button"
                className="btn-generate"
                disabled={!inputUrl.trim() || isGenerating}
                onClick={() => handleGenerate(inputUrl, true, false)}
                aria-busy={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="spinner" />
                    <span>Rendering QR Code...</span>
                  </>
                ) : hasGenerated ? (
                  <>
                    <Check size={20} strokeWidth={2.4} />
                    <span>QR Code Generated • Instant Live</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} strokeWidth={2.4} />
                    <span>Instant Live Generator</span>
                  </>
                )}
              </button>
            </div>

            {/* QR Result Section */}
            <div className="qr-result-section">
              {!hasGenerated ? (
                /* Empty State */
                <div className="qr-empty-state">
                  <div className="empty-icon-box">
                    <QrCode size={36} strokeWidth={1.8} />
                  </div>
                  <div className="empty-title">Your QR code will appear here</div>
                  <div className="empty-desc">
                    Paste or enter any link above — your QR code will generate <strong>instantly</strong> with zero clicks required!
                  </div>
                </div>
              ) : (
                /* Generated QR Result View */
                <div className="qr-generated-view">
                  {/* Clean White Card for Maximum Scannability */}
                  <div className="qr-canvas-card">
                    <div className="qr-canvas-wrapper">
                      {dataUrl && (
                        <img
                          src={dataUrl}
                          alt={`QR Code redirecting to ${currentUrl}`}
                          style={{
                            width: 240,
                            height: 240,
                            display: 'block',
                            imageRendering: 'crisp-edges',
                          }}
                        />
                      )}
                    </div>
                    <div className="scan-verification-badge">
                      <ShieldCheck size={14} />
                      <span>Direct Redirect • Scannable</span>
                    </div>
                  </div>

                  {/* Original URL Display */}
                  <div className="qr-url-display-card">
                    <div className="url-info-left">
                      <span className="url-domain-tag">{getHostname(currentUrl)}</span>
                      <span className="url-text-display" title={currentUrl}>
                        {currentUrl}
                      </span>
                    </div>

                    <a
                      href={currentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="url-open-link"
                      title="Open URL in new tab"
                      aria-label="Open original URL in new tab"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  {/* Result Actions Grid */}
                  <div className="qr-actions-grid">
                    <button
                      type="button"
                      className="action-btn btn-primary-action"
                      onClick={handleDownloadPng}
                      aria-label="Download QR code as PNG"
                    >
                      <Download size={16} />
                      <span>Download PNG</span>
                    </button>

                    <button
                      type="button"
                      className="action-btn btn-secondary-action"
                      onClick={handleCopyLink}
                      aria-label="Copy original URL to clipboard"
                    >
                      <Copy size={16} />
                      <span>Copy Link</span>
                    </button>

                    <button
                      type="button"
                      className="action-btn btn-secondary-action"
                      onClick={handleShare}
                      aria-label="Share QR code URL"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>

                    <button
                      type="button"
                      className="action-btn btn-ghost-action"
                      onClick={handleReset}
                      aria-label="Generate new QR code"
                    >
                      <RotateCcw size={16} />
                      <span>New QR</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent History Section */}
          {history.length > 0 && (
            <div className="history-section">
              <div className="history-header">
                <div className="history-title">
                  <History size={16} color="var(--primary-cyan)" />
                  <span>Recent QR Codes</span>
                </div>
                <button
                  type="button"
                  className="clear-history-btn"
                  onClick={handleClearHistory}
                  title="Clear history"
                >
                  Clear History
                </button>
              </div>

              <div className="history-grid">
                {history.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="history-item-card"
                    onClick={() => {
                      setInputUrl(item.url);
                      setCurrentUrl(item.url);
                      setDataUrl(item.thumbnail);
                      setHasGenerated(true);
                      setErrorMessage('');
                    }}
                    title={`Restore QR for ${item.url}`}
                  >
                    <div className="history-item-qr">
                      <img src={item.thumbnail} alt="" aria-hidden="true" />
                    </div>
                    <div className="history-item-info">
                      <div className="history-item-domain">{item.hostname}</div>
                      <div className="history-item-url">{item.url}</div>
                      <div className="history-item-time">{item.timestamp}</div>
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
