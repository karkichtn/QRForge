import React, { useState, useEffect, useCallback, Component } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import QRGenerator from './components/QRGenerator';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import Toast from './components/Toast';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            background: '#060608',
            color: '#fff',
            fontFamily: 'monospace',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ff6b6b' }}>
            [ SYSTEM EXCEPTION ]
          </h2>
          <p style={{ color: '#8e8e93', maxWidth: '500px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#fff',
              color: '#060608',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '2px',
              cursor: 'pointer',
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
          >
            RELOAD SYSTEM
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [toasts, setToasts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for the top hairline indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ErrorBoundary>
      {/* Top Hairline Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <QRGenerator showToast={showToast} />
        <HowItWorks />
        <Features />
        <AboutSection />
      </main>

      <Footer />
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </ErrorBoundary>
  );
}
