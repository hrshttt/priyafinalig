
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

const CASES: CaseStudy[] = [
  {
    id: '01',
    title: 'Hearzap',
    category: 'Healthcare SaaS',
    description: 'Designed 4000+ screens across appointments, sales, inventory, and CMS to build a single connected ecosystem.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop',
    link: 'https://www.figma.com'
  },
  {
    id: '02',
    title: 'SPM — AI Partner',
    category: 'Productivity · AI',
    description: 'Chrome extension for product managers that generates PRDs, analyses documents, and automates workflows.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    link: 'https://www.figma.com'
  },
  {
    id: '03',
    title: 'AMS & LMS',
    category: 'EdTech SaaS',
    description: 'End-to-end edtech ecosystem covering admissions, exams, fee payments, and complete academic management.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2670&auto=format&fit=crop',
    link: 'https://www.figma.com'
  }
];

const CaseStudySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navigate = useNavigate();

  useGSAP(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Responsive Cylinder Math
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 210 : 420; 
    
    // ARC LOGIC:
    // Instead of using 360 / length, we use a fixed angle spacing (e.g., 85 degrees).
    // This creates an "Arc" of projects rather than a closed circle.
    // Result: Project 1 does not touch Project 3.
    const angleIncrement = 85; 

    // Calculate rotation needed to bring the last item to the center (0 deg)
    // Item 0 is at 0. Item 1 is at 85. Item 2 is at 170.
    // To center Item 2, we rotate -170.
    const finalRotation = -(angleIncrement * (CASES.length - 1));

    // 1. Initial Setup: Position cards in an arc
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.set(card, {
          rotationY: i * angleIncrement,
          z: radius,
          transformOrigin: `50% 50% -${radius}px` // Matches negative radius
        });
      }
    });

    // 2. Rotate the entire carousel based on scroll
    gsap.to(carousel, {
      rotationY: finalRotation, // Stops exactly at the last item
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

  }, { scope: sectionRef });

  const handleViewAll = () => {
    // Check for mobile: Navigate immediately without transition effect
    if (window.innerWidth < 768) {
      navigate('/work');
      return;
    }

    const event = new CustomEvent('trigger-transition', { detail: { theme: 'light' } });
    window.dispatchEvent(event);
    setTimeout(() => {
      navigate('/work');
    }, 200);
  };

  return (
    <section 
      ref={sectionRef} 
      id="work"
      className="h-screen bg-[#1F1F1F] text-stone-50 overflow-hidden relative perspective-container flex items-center justify-center"
    >
       {/* Texture Overlay */}
       <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}>
       </div>

       {/* 3D Scene Container */}
       <div className="relative w-full h-full flex items-center justify-center max-h-[100vh]" style={{ perspective: '2000px' }}>
          
          {/* Rotating Carousel Wrapper */}
          <div 
            ref={carouselRef}
            className="w-[220px] md:w-[300px] aspect-[2/3] relative will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
             {CASES.map((item, index) => (
               <a 
                 key={item.id}
                 ref={(el) => { cardsRef.current[index] = el; }}
                 href={item.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="absolute top-0 left-0 w-full h-full bg-stone-50 p-2 md:p-3 group clickable block border border-white/10 backface-hidden shadow-2xl"
                 style={{ backfaceVisibility: 'hidden' }} // Prevents flickering
               >
                 {/* Image Container */}
                 <div className="w-full h-[60%] overflow-hidden bg-black/5 relative mb-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
                 </div>

                 {/* Content */}
                 <div className="flex flex-col h-[35%] justify-between text-black px-2 pb-2" style={{ transform: 'translateZ(1px)' }}>
                    <div>
                      <div className="flex justify-between items-start mb-1">
                         <span className="font-mono text-[10px] text-black/50 uppercase tracking-widest">{item.category}</span>
                         <span className="font-mono text-[10px] text-black/50">0{index + 1}</span>
                      </div>
                      <h3 className="font-serif italic text-lg md:text-2xl text-black leading-none group-hover:text-violet transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="flex justify-between items-end mt-1">
                       <p className="font-sans text-[10px] text-black/60 max-w-[85%] line-clamp-3 leading-tight">
                         {item.description}
                       </p>
                       <div className="bg-black text-stone-50 p-1.5 rounded-full transform group-hover:rotate-45 transition-transform duration-300">
                          <ArrowUpRight size={12} />
                       </div>
                    </div>
                 </div>
               </a>
             ))}
          </div>

          <div className="absolute bottom-12 z-20">
             <Magnetic>
                 <button 
                    onClick={handleViewAll}
                    className="group relative px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-stone-50 overflow-hidden transition-all duration-300 hover:border-transparent hover:bg-white/10 clickable flex items-center gap-3"
                 >
                    <div className="absolute inset-0 bg-stone-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                    <span className="relative z-10 font-serif italic text-lg group-hover:text-black transition-colors duration-300">
                       View All Works
                    </span>
                    <ArrowUpRight size={18} className="relative z-10 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                 </button>
             </Magnetic>
          </div>

       </div>
    </section>
  );
};

export default CaseStudySection;
