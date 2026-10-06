import React, { useState, useCallback, Component } from 'react';
import Navbar from './components/Navbar';
import BackgroundOrbs from './components/BackgroundOrbs';
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
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', background: '#090a10', color: '#fff' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#f43f5e' }}>Something went wrong</h2>
          <p style={{ color: '#94a3b8', maxWidth: '500px', marginBottom: '1.5rem' }}>{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button onClick={() => window.location.reload()} style={{ background: '#8b5cf6', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3.2s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ErrorBoundary>
      <div className="app-wrapper">
        <BackgroundOrbs />
        <Navbar />

        <main id="main-content">
          <QRGenerator showToast={showToast} />
          <HowItWorks />
          <Features />
          <AboutSection />
        </main>

        <Footer />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </div>
    </ErrorBoundary>
  );
}
