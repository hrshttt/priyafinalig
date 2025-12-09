import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FocusParagraph: React.FC<{ children: React.ReactNode; highlight?: boolean }> = ({ children, highlight }) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.fromTo(textRef.current, 
      { 
        opacity: 0, 
        filter: "blur(12px)", 
        y: 40 
      },
      { 
        opacity: 1, 
        filter: "blur(0px)", 
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%", // Trigger when top of text hits 85% of viewport height
          toggleActions: "play none none reverse" // Play on enter, reverse on leave up
        }
      }
    );
  }, []);

  return (
    <p ref={textRef} className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-tight transition-colors duration-500 will-change-transform ${highlight ? 'text-black' : 'text-black/70'}`}>
      {children}
    </p>
  );
};

export default FocusParagraph;