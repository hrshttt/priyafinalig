
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ruler, Search, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_STEPS = [
  {
    id: '01',
    title: 'Architecture',
    subtitle: 'My Foundation',
    icon: <Ruler strokeWidth={1.5} size={24} />,
    description: 'My journey began in architecture, learning structure, visual clarity, and systems thinking. This formed my obsession with form-function balance.',
    year: '2018 — 2022'
  },
  {
    id: '02',
    title: 'Research',
    subtitle: 'The Pivot Point',
    icon: <Search strokeWidth={1.5} size={24} />,
    description: 'While conducting architectural behavioral studies, I grew curious about human decision-making. I realized I wanted to design for people, not just spaces.',
    year: '2022 — 2023'
  },
  {
    id: '03',
    title: 'Product Design',
    subtitle: 'The Convergence',
    icon: <Layers strokeWidth={1.5} size={24} />,
    description: 'I merged structure with logic to design for SaaS and AI platforms. Today, I create clarity within complex enterprise ecosystems.',
    year: '2023 — Present'
  }
];

const JourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    // 1. Line Draw Animation
    // The line "draws" itself as the user scrolls past.
    gsap.fromTo(lineRef.current, 
      { height: '0%' },
      { 
        height: '100%', 
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 60%', // Starts drawing when section is 60% down the screen
          end: 'bottom 60%', // Finishes when section bottom hits 60%
          scrub: 1
        }
      }
    );

    // 2. Icon Activation (Color Change)
    // We trigger the color change exactly when the icon passes the "60%" threshold where the line is drawing.
    const markers = gsap.utils.toArray<HTMLElement>('.journey-marker');
    markers.forEach((marker) => {
      const icon = marker.querySelector('.journey-icon');
      
      gsap.fromTo([marker, icon],
        { 
          borderColor: '#151515', // black border
          color: 'rgba(21, 21, 21, 0.4)', // faded text
          backgroundColor: '#F2F0E9',
        },
        {
          borderColor: '#7C3AED', // violet border
          color: '#7C3AED', // violet text
          backgroundColor: '#F2F0E9',
          duration: 0.4,
          scrollTrigger: {
            trigger: marker,
            start: 'top 60%', // Syncs with the line drawing position
            toggleActions: 'play reverse play reverse' // Toggles on scroll up/down
          }
        }
      );
    });

    // 3. Items Reveal (Fade Up)
    const items = gsap.utils.toArray('.journey-content');
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-stone-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 section-reveal">
           <div>
              <h2 className="font-serif italic text-5xl md:text-8xl text-black mb-4">
                 The <span className="text-violet">Journey</span>
              </h2>
              <p className="font-mono text-xs uppercase tracking-widest text-black/40">
                 Evolution of Practice
              </p>
           </div>
           <div className="hidden md:block h-px bg-black/10 flex-1 ml-12 mb-4"></div>
        </div>

        {/* Timeline Layout */}
        <div className="relative grid grid-cols-[40px_1fr] md:grid-cols-[56px_1fr] gap-6 md:gap-12">
           
           {/* Absolute Timeline Lines */}
           {/* Positioned at the horizontal center of the first column (20px on mobile, 28px on desktop) */}
           <div className="absolute top-2 bottom-0 left-[20px] md:left-[28px] w-px bg-black/10 -translate-x-1/2 z-0"></div>
           <div ref={lineRef} className="absolute top-2 left-[20px] md:left-[28px] w-px bg-violet h-0 origin-top -translate-x-1/2 z-0"></div>

           {/* Journey Items */}
           {JOURNEY_STEPS.map((step) => (
             <React.Fragment key={step.id}>
                
                {/* Marker Column (Col 1) */}
                <div className="relative flex justify-center items-start pt-1 z-10">
                   <div className="journey-marker w-10 h-10 md:w-14 md:h-14 rounded-full border border-black bg-stone-50 flex items-center justify-center transition-all duration-300">
                      <div className="journey-icon text-black/40 transition-colors duration-300">
                         {step.icon}
                      </div>
                   </div>
                </div>

                {/* Content Column (Col 2) */}
                <div className="journey-content pb-16 md:pb-24 pt-2">
                   <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                      <h3 className="font-serif italic text-3xl md:text-4xl text-black">
                         {step.title}
                      </h3>
                      <span className="font-mono text-xs text-violet py-1 px-3 border border-violet/20 rounded-full w-fit">
                         {step.year}
                      </span>
                   </div>

                   <div className="pl-4 border-l border-black/5">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-black/50 mb-3">
                         {step.subtitle}
                      </h4>
                      <p className="font-sans text-sm md:text-lg text-black/70 leading-relaxed max-w-2xl">
                         {step.description}
                      </p>
                   </div>
                </div>

             </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
