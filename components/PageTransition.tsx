
import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PageTransition: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // Initialize based on window width to avoid flash on mobile
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    if (isMobile || !overlayRef.current) return;
    
    // REVEAL (Fade Out): Triggered automatically when the route changes
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4, 
      ease: "power2.inOut",
      pointerEvents: "none",
      delay: 0.1
    });
  }, [location, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    // START (Fade In): Listen for custom event from Navbar/SubpageNav
    const handleStart = (e: any) => {
      const newTheme = e.detail?.theme || 'light';
      setTheme(newTheme);

      // Force immediate color update before animation starts
      if (overlayRef.current) {
        overlayRef.current.style.backgroundColor = newTheme === 'dark' ? '#000000' : '#F2F0E9';
      }

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.2, 
        ease: "power2.out",
        pointerEvents: "auto"
      });
    };

    // MANUAL REVEAL: For same-page anchor jumps
    const handleReveal = () => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4, 
        ease: "power2.inOut",
        pointerEvents: "none",
        delay: 0.1
      });
    };

    window.addEventListener('trigger-transition', handleStart);
    window.addEventListener('reveal-transition', handleReveal);
    
    return () => {
      window.removeEventListener('trigger-transition', handleStart);
      window.removeEventListener('reveal-transition', handleReveal);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div 
      ref={overlayRef} 
      className={`fixed inset-0 z-[9000] opacity-0 pointer-events-none ${theme === 'light' ? 'blueprint-grid' : ''}`}
      style={{ backgroundColor: theme === 'dark' ? '#000000' : '#F2F0E9' }}
    />
  );
}

export default PageTransition;
