
import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import MouseTrail from './components/MouseTrail';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  
  useEffect(() => {
    // If specific scroll target is provided in state, do not force scroll to top
    if (state && (state as any).scrollTo) return;
    
    window.scrollTo(0, 0);
  }, [pathname, state]);
  
  return null;
}

const App: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <div className="app-container cursor-none">
        <PageTransition />
        <CustomCursor />
        <MouseTrail />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
