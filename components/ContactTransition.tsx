
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ContactTransition: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useGSAP(() => {
    // TRIGGER REVEAL: When landing on the contact section
    if (location.pathname === '/' && location.state && (location.state as any).scrollTo === 'contact') {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5, // Reduced from 0.8
        ease: "power2.inOut",
        pointerEvents: "none",
        delay: 0.1
      });
    }
  }, [location]);

  useEffect(() => {
    // TRIGGER HIDE: Listen for start event from Navbar/SubpageNav
    const handleStart = () => {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3, // Reduced from 0.5
        ease: "power2.out",
        pointerEvents: "auto"
      });
    };

    // TRIGGER REVEAL MANUAL: For same-page navigation
    const handleReveal = () => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5, // Reduced from 0.8
        ease: "power2.inOut",
        pointerEvents: "none",
        delay: 0.1
      });
    };

    window.addEventListener('trigger-contact-transition', handleStart);
    window.addEventListener('reveal-contact-transition', handleReveal);
    
    return () => {
      window.removeEventListener('trigger-contact-transition', handleStart);
      window.removeEventListener('reveal-contact-transition', handleReveal);
    };
  }, []);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9000] bg-black opacity-0 pointer-events-none"
    />
  );
}

export default ContactTransition;