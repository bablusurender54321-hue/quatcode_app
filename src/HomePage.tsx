import { useState, useEffect, useCallback } from 'react';
import IntroOverlay from './sections/IntroOverlay';
import Navigation from './sections/Navigation';
import MarketTicker from './sections/MarketTicker';
import HeroSection from './sections/HeroSection';
import StatsBar from './sections/StatsBar';
import CoursesEvents from './sections/CoursesEvents';
import AlphaPipeline from './sections/AlphaPipeline';
import CoreFocus from './sections/CoreFocus';
import TerminalSection from './sections/TerminalSection';
import TeamsSection from './sections/TeamsSection';

import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

function HomePage() {
  const [pageReady, setPageReady] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setTimeout(() => setPageReady(true), 100);
  }, []);

  return (
    <>
      <IntroOverlay onComplete={handleIntroComplete} />

      <div
        style={{
          opacity: pageReady ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: pageReady ? 'all' : 'none',
        }}
      >
        <Navigation />

        <main>
          <MarketTicker />
          <HeroSection />
          <StatsBar />
          <CoursesEvents />
          <AlphaPipeline />
          <CoreFocus />
          <TerminalSection />
          <TeamsSection />
          <ContactSection />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

export default HomePage;
