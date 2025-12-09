
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<{ value: number }>({ value: 0 });
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    // Set a global flag so other components know to wait
    (window as any).preloaderActive = true;
    return () => {
      (window as any).preloaderActive = false;
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Counter Animation (0 -> 100)
    tl.to(counterRef.current, {
      value: 100,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => {
        if (textRef.current) {
           textRef.current.textContent = Math.round(counterRef.current.value) + "%";
        }
      }
    });

    // 2. Short pause for impact
    tl.to({}, { duration: 0.3 });

    // 3. Counter Exit
    tl.to(textRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
    });

    // 4. Curtain Reveal (Slide Up)
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.4,
      ease: "power4.inOut",
      onStart: () => {
        // Trigger Home animations to start just as curtain lifts for seamless integration
        window.dispatchEvent(new Event('preloader-complete'));
      },
      onComplete: () => {
        onComplete();
      }
    }, "-=0.4"); // Overlap slightly with text exit

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#151515] text-stone-50 flex items-end justify-end p-6 md:p-12 cursor-none"
    >
      <div className="overflow-hidden">
        <h1 ref={textRef} className="font-mono text-[15vw] md:text-[12rem] font-bold leading-none tracking-tighter opacity-100 mix-blend-difference">
          0%
        </h1>
      </div>
    </div>
  );
};

export default Preloader;
