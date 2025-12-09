
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "Hearzap",
    subtitle: "Unified Hearing-Care Operational Platform",
    tags: ["Healthcare SaaS", "Enterprise Workflows"],
    description: "Designed 4000+ screens across appointments, sales, service, inventory, procurement, and CMS to build a single connected ecosystem for clinics, stores, technicians, and central office teams.",
    duration: "6 months",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
  {
    id: "02",
    title: "SPM — AI Product Partner",
    subtitle: "Chrome Extension for PMs",
    tags: ["Productivity", "AI", "PM Tools"],
    description: "An all-in-one Chrome extension for product managers that generates PRDs, analyses documents, surfaces product strategies, and automates PM workflows with AI-powered insights and contextual actions.",
    duration: "1 month",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-square",
  },
  {
    id: "03",
    title: "AMS & LMS",
    subtitle: "Assessment and Learning Management Systems",
    tags: ["EdTech SaaS", "Learning Systems"],
    description: "Designed an end-to-end edtech ecosystem used by all from students to counsellors, to universities — covering various modules like program creation, admissions, exams, fee payments, loan workflows, university setup, complete academic management.. etc",
    duration: "6 months",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-square",
  },
  {
    id: "04",
    title: "TalentXchange",
    subtitle: "AI Powered Corp to Corp Hiring Platform",
    tags: ["HR Tech", "AI", "SaaS Platform"],
    description: "Designed the end-to-end hiring ecosystem for employers and vendors, including dashboards, AI/ML smart matching, requisition flows, analytics, and a complete multi-role SaaS workflow.",
    duration: "4 months",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
  {
    id: "05",
    title: "Nano Apps",
    subtitle: "15+ AI-Powered Hiring tools",
    tags: ["AI/ML Tools", "HR Tech"],
    description: "Created UX/UI for 15+ hiring tools including resume parsing/redaction, market intelligence, evaluations, and role mapping—built for speed, clarity, and recruiter productivity.",
    duration: "2 months",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
  {
    id: "06",
    title: "Sharely",
    subtitle: "Ad Sharing & Earn Platform",
    tags: ["AdTech", "Social Commerce"],
    description: "A social ad-sharing platform where everyday users can earn by sharing ads or products; designed for effortless onboarding, simple referral tracking, and seamless micro-payments.",
    duration: "1 month",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop",
    aspect: "aspect-square",
  }
];

const ProjectCard: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => (
  <div className="work-card group relative">
    <div 
      className="w-full aspect-[4/3] bg-stone-200 overflow-hidden relative cursor-none"
      data-cursor-text="VIEW CASE"
    >
       {/* Overlay with Blend Mode */}
       <div className="absolute inset-0 bg-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply pointer-events-none"></div>
       
       <img 
         src={project.image} 
         alt={project.title} 
         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-105 will-change-transform"
       />
       
       {/* ID Badge */}
       <div className="absolute top-0 left-0 bg-white/90 backdrop-blur-sm px-4 py-2 border-r border-b border-black/10 z-20">
          <span className="font-mono text-xs font-bold text-black">{project.id}</span>
       </div>

       {/* Duration Badge */}
       <div className="absolute top-0 right-0 bg-black text-stone-50 px-4 py-2 z-20">
          <span className="font-mono text-xs uppercase">{project.duration}</span>
       </div>
    </div>

    {/* Content Section */}
    <div className="flex flex-col mt-8 border-b border-black/10 pb-8 group-hover:border-black/40 transition-colors duration-500">
       
       {/* Tags & Arrow Row */}
       <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 flex-wrap">
             {project.tags.map(tag => (
                 <span key={tag} className="border border-black/10 px-3 py-1 rounded-full font-mono text-[10px] text-black/60 uppercase whitespace-nowrap bg-white/50">
                   {tag}
                 </span>
             ))}
          </div>
          <ArrowUpRight className="text-black/30 group-hover:text-violet group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 w-6 h-6 md:w-8 md:h-8" />
       </div>

       {/* Title & Description */}
       <div>
           <h2 className="font-serif italic text-3xl md:text-5xl text-black mb-2 group-hover:text-violet transition-colors duration-300 leading-tight">
             {project.title}
           </h2>
           <h3 className="font-mono text-sm uppercase tracking-widest text-black/50 mb-6">
             {project.subtitle}
           </h3>
           <p className="font-sans text-lg text-black/70 leading-relaxed max-w-xl">
             {project.description}
           </p>
       </div>
    </div>
  </div>
);

const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Reveal
    gsap.from(".work-header-line", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2
    });

    // Card Reveal Animation
    gsap.utils.toArray<HTMLElement>('.work-card').forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-stone-50 min-h-screen blueprint-grid pt-32 pb-20 overflow-hidden">
      
      {/* 1. HEADER */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-24">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black pb-8 gap-8 md:gap-0">
            <div className="overflow-hidden">
                <h1 className="work-header-line font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] whitespace-nowrap">
                   Selected Works
                </h1>
            </div>
            <div className="mt-8 md:mt-0 work-header-line md:max-w-lg text-left md:text-right">
               <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-4">2022 — Present</p>
               <p className="font-serif italic text-xl md:text-2xl text-black/80 leading-relaxed">
                  A curated collection of digital products where <span className="text-violet">systems thinking</span> meets <span className="text-violet">human-centered design</span>.
               </p>
            </div>
         </div>
      </section>

      {/* 2. GRID LAYOUT */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {PROJECTS.map((project) => (
               <ProjectCard key={project.id} project={project} />
            ))}
         </div>
      </section>

      {/* 3. FOOTER NOTE */}
      <div className="text-center py-20 mt-12">
         <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="group flex flex-col items-center gap-2 mx-auto opacity-30 hover:opacity-100 transition-opacity duration-300 clickable"
         >
            <span className="font-mono text-xs uppercase tracking-[0.3em]">End of Selection</span>
            <span className="font-serif italic text-sm text-violet opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
               Back to Top
            </span>
         </button>
      </div>

    </div>
  );
};

export default Work;
