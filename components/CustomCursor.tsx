
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text'>('default');
  const [cursorText, setCursorText] = useState('');
  
  const location = useLocation();
  // Fixed white base color for mix-blend-difference to work as an inverter
  const baseColor = '#FFFFFF';

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    
    if (!cursor || !ring) return;

    // Center alignment offsets
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    // Ring follows slower for fluid feel
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const text = target.getAttribute('data-cursor-text');
      
      if (text) {
        setCursorText(text);
        setCursorState('text');
      } else {
        setCursorState('hover');
      }
    };

    const handleMouseLeave = () => {
      setCursorState('default');
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Attach listeners to all clickable elements
    const attachListeners = () => {
      const clickables = document.querySelectorAll('a, button, .clickable, [data-cursor-text]');
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    attachListeners();

    // Mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) shouldUpdate = true;
      });
      if (shouldUpdate) attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      const clickables = document.querySelectorAll('a, button, .clickable, [data-cursor-text]');
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    const ring = ringRef.current;
    const cursor = cursorRef.current;
    const textEl = textRef.current;
    
    if (!ring || !cursor) return;

    if (cursorState === 'text') {
      // Text Mode (Large Circle)
      gsap.to(ring, { 
        scale: 6, // Big circle
        opacity: 1, 
        backgroundColor: '#7C3AED', 
        borderColor: 'transparent',
        mixBlendMode: 'normal', // Disable difference for colored overlay
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(cursor, {
        scale: 0, // Hide center dot
        duration: 0.2
      });
      gsap.to(textEl, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        delay: 0.1
      });
    } else if (cursorState === 'hover') {
      // Hover Mode (Small Highlight)
      gsap.to(ring, { 
        scale: 1.5, 
        opacity: 1, // Keep high opacity for clear inversion
        backgroundColor: 'transparent', 
        borderColor: baseColor,
        borderWidth: '2px',
        mixBlendMode: 'difference',
        duration: 0.3 
      });
      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: baseColor,
        mixBlendMode: 'difference',
        duration: 0.3
      });
      gsap.to(textEl, { opacity: 0, scale: 0.5, duration: 0.1 });
    } else {
      // Default Mode
      gsap.to(ring, { 
        scale: 1, 
        opacity: 1, 
        backgroundColor: 'transparent', 
        borderColor: baseColor,
        borderWidth: '1px',
        mixBlendMode: 'difference',
        duration: 0.3 
      });
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: baseColor,
        mixBlendMode: 'difference',
        duration: 0.3
      });
      gsap.to(textEl, { opacity: 0, scale: 0.5, duration: 0.1 });
    }
  }, [cursorState, baseColor]);

  return (
    <>
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-current pointer-events-none z-[9998] hidden md:flex items-center justify-center overflow-hidden mix-blend-difference"
        style={{ borderColor: baseColor }}
      >
        <span 
          ref={textRef} 
          className="font-mono text-[4px] leading-none uppercase tracking-widest text-white opacity-0 absolute"
        >
          {cursorText}
        </span>
      </div>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{ backgroundColor: baseColor }}
      />
    </>
  );
};

export default CustomCursor;
