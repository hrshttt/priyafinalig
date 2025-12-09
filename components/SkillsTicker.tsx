
import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_ROW_1 = [
  "USER EXPERIENCE", "INTERACTION DESIGN", "USER INTERFACE", "INFORMATION ARCHITECTURE", 
  "USER FLOW", "RESPONSIVE DESIGN", "DESIGN SYSTEMS", "STYLE GUIDES", "VISUAL DESIGN", 
  "PHYSICAL AND DIGITAL WIREFRAMING", "PROTOTYPING", "LOW FIDELITY AND HIGH FIDELITY MOCKUPS", 
  "PRIMARY AND SECONDARY RESEARCH", "QUALITATIVE AND QUANTITATIVE RESEARCH", "USER INTERVIEW", 
  "USABILITY TESTING", "A/B TESTING", "JOURNEY MAPPING", "COMPETITIVE ANALYSIS", "DATA ANALYSIS IN UX RESEARCH"
];

const SKILLS_ROW_2 = [
  "FIGMA", "ADOBE XD", "VISILY", "CANVA", "ADOBE PHOTOSHOP", "ADOBE ILLUSTRATOR", "MIRO", 
  "MICROSOFT OFFICE", "GOOGLE WORKSPACE", "SKETCHBOOK", "POSTER DESIGN", "BRANDING", 
  "LOGO DESIGN", "TYPOGRAPHY", "BANNER DESIGN", "BROCHURE DESIGN", "GRAPHIC DESIGN", 
  "BOOK COVER DESIGN", "PRODUCT DESIGN"
];

const TickerBand: React.FC<{ skills: string[]; direction: 'left' | 'right'; outline?: boolean }> = ({ skills, direction, outline }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Create 3 sets of skills for seamless looping using React instead of innerHTML
  // Memoize to prevent re-creation on renders
  const tripleSkills = useMemo(() => [...skills, ...skills, ...skills], [skills]);
  
  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    
    let ctx: gsap.Context;

    // Ensure fonts are loaded so scrollWidth is accurate
    // If width is calculated before font loads, it will be smaller -> animation loops too early -> choppy jump
    document.fonts.ready.then(() => {
      // Double check element still exists in case of unmount
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        const totalWidth = containerRef.current!.scrollWidth;
        const distance = totalWidth / 3;
        
        // Speed: 60 pixels per second (smoother, readable)
        const speedPixelsPerSecond = 60; 
        const duration = distance / speedPixelsPerSecond;

        // Initial setup for 'right' direction
        if (direction === 'right') {
          gsap.set(el, { x: -distance });
        }

        // Infinite Scroll Animation
        gsap.to(el, { 
          x: direction === 'left' ? -distance : 0, 
          duration: duration, 
          ease: "none", 
          repeat: -1,
          onRepeat: () => {
            // Reset position instantly to create seamless loop
            gsap.set(el, { x: direction === 'left' ? 0 : -distance });
          }
        });

        // Velocity Skew Effect
        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skewAmount = Math.max(-5, Math.min(5, velocity / 300));
            
            gsap.to(wrapperRef.current, {
              skewX: direction === 'left' ? skewAmount : -skewAmount,
              duration: 0.5,
              ease: "power3.out",
              overwrite: 'auto'
            });
          }
        });

      }, wrapperRef);
    });

    return () => ctx && ctx.revert();
  }, [direction, tripleSkills]);

  return (
    <div className="overflow-hidden py-2" ref={wrapperRef}>
      <div ref={containerRef} className="inline-block whitespace-nowrap will-change-transform">
        {tripleSkills.map((skill, i) => (
          <span key={i} className={`inline-block mx-6 text-4xl md:text-6xl font-serif italic ${outline ? 'text-transparent stroke-black stroke-1 opacity-40' : 'text-black'}`}
          style={outline ? { WebkitTextStroke: '1px #151515' } : {}}>
            {skill} <span className="text-violet mx-4 text-xl">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsTicker: React.FC = () => {
  return (
    <div className="w-full py-12 flex flex-col gap-4">
      <TickerBand skills={SKILLS_ROW_1} direction="left" />
      <TickerBand skills={SKILLS_ROW_2} direction="right" outline={true} />
    </div>
  );
};

export default SkillsTicker;
