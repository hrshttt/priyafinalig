import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Copy,
  ArrowDown,
  Brain,
  Search,
  LayoutGrid,
  Target,
  Users,
  Linkedin,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import ProjectAccordion from "../components/ProjectAccordion";
import SkillsTicker from "../components/SkillsTicker";
import CaseStudySection from "../components/CaseStudySection";
import Testimonials from "../components/Testimonials";
import JourneySection from "../components/JourneySection";
import Magnetic from "../components/Magnetic";
import MagneticButton from "../components/MagneticButton";
import FocusParagraph from "../components/FocusParagraph";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Behance Icon Component since it's not in standard Lucide
const BehanceIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavigation = (path: string) => {
    // Check for mobile: Navigate immediately without transition effect
    if (window.innerWidth < 768) {
      navigate(path);
      return;
    }

    const event = new CustomEvent("trigger-transition", {
      detail: { theme: "light" },
    });
    window.dispatchEvent(event);
    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  // Handle scroll from other pages instantly
  useLayoutEffect(() => {
    if (location.state && (location.state as any).scrollTo === "contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "auto" });
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (window.scrollY < 100) {
        // Check if preloader is running to pause the start
        const isPreloaderActive = (window as any).preloaderActive;

        const tl = gsap.timeline({ paused: isPreloaderActive });

        tl.from(".hero-line-inner", {
          yPercent: 120,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.1,
          clearProps: "all",
        })
          .from(
            ".hero-btn",
            {
              opacity: 0,
              y: 30,
              duration: 1,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "all",
            },
            "<0.2"
          )
          .from(
            ".hero-meta",
            {
              opacity: 0,
              y: -10,
              duration: 1,
              ease: "power2.out",
            },
            "<"
          );

        // If preloader is active, wait for the complete event to play
        if (isPreloaderActive) {
          const playAnim = () => tl.play();
          window.addEventListener("preloader-complete", playAnim);
          return () =>
            window.removeEventListener("preloader-complete", playAnim);
        }
      }

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.from(".strength-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".strengths-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const sectionHeaders = gsap.utils.toArray(".section-reveal");
      sectionHeaders.forEach((header: any) => {
        gsap.from(header, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        });
      });

      const footerLines = gsap.utils.toArray(".footer-line");
      gsap.from(footerLines, {
        yPercent: 100,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".footer-container",
          start: "top 70%",
        },
      });
    },
    { scope: containerRef }
  );

  const copyEmail = () => {
    navigator.clipboard.writeText("tharshini161000@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="bg-stone-50 min-h-screen relative selection:bg-black selection:text-stone-50 blueprint-grid overflow-x-hidden"
    >
      {/* SECTION A: HERO */}
      <section
        ref={heroRef}
        className="min-h-screen w-full relative flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden py-20 md:py-0"
      >
        <div
          ref={parallaxRef}
          className="flex flex-col items-center justify-center z-10 w-full will-change-transform pt-12 md:pt-0"
        >
          <div className="flex flex-col items-center justify-center mix-blend-multiply w-full">
            {/* Added py-4 md:py-6 to prevent clipping of italic font ascenders/descenders */}
            <div className="clip-text-container block overflow-hidden px-4 py-4 md:py-6">
              <h1 className="hero-line-inner font-serif italic text-[10vw] leading-[0.85] text-center text-black whitespace-nowrap">
                PRIYATHARSHINI
              </h1>
            </div>

            <div className="clip-text-container block overflow-hidden mt-2 md:mt-4">
              <h2 className="hero-line-inner font-mono font-bold text-base md:text-2xl tracking-[0.2em] md:tracking-[0.4em] text-black/80 text-center uppercase">
                Digital Product Designer
              </h2>
            </div>

            <div className="overflow-hidden w-full flex justify-center mt-8 md:mt-12">
              <div className="hero-line-inner text-center">
                <p className="font-sans text-sm md:text-lg leading-relaxed text-black/70 max-w-2xl mx-auto px-4">
                  Digital Product Designer blending in-depth research, product
                  thinking, and systems design to shape intuitive,
                  human-centered experiences for SaaS products and fast-growing
                  startups.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-12 md:mt-16 w-full max-w-lg px-6 relative z-30 justify-center items-center">
            <Magnetic>
              <button
                onClick={() => handleNavigation("/about")}
                className="hero-btn clickable group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-black/20 hover:border-black transition-colors duration-300 w-full md:w-48"
              >
                <span className="relative z-10 font-serif italic text-xl text-black group-hover:text-stone-50 transition-colors duration-300">
                  About Me
                </span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              </button>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => scrollToSection("work")}
                className="hero-btn clickable group relative px-8 py-4 bg-black overflow-hidden rounded-full w-full md:w-56 border border-black"
              >
                <span className="relative z-10 font-serif italic text-xl text-stone-50 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                  View My Work
                  <ArrowDown
                    size={18}
                    className="group-hover:translate-y-1 transition-transform duration-300"
                  />
                </span>
                <div className="absolute inset-0 bg-violet translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hero-meta animate-bounce text-black/30 hidden md:block">
          <ArrowDown size={20} />
        </div>
      </section>

      {/* SECTION B: ABOUT */}
      <section
        id="about"
        className="min-h-screen w-full py-32 px-6 md:px-12 relative z-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          {/* Portrait Image */}
          <div className="md:col-span-4 relative perspective-1000">
            <div className="sticky top-32 group">
              <div className="relative bg-white border border-black p-5 pb-8 rotate-[-3deg] transition-all duration-500 hover:rotate-0 hover:shadow-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] will-change-transform">
                <div className="relative w-full aspect-[3/4] bg-stone-200 overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-700 border-b border-black/5">
                  <img
                    src="/Photo.png"
                    alt="Priyatharshini"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-1.5 bg-violet mb-8 rounded-full"></div>
                <div className="space-y-3 font-mono text-xs md:text-sm tracking-wider">
                  <div className="flex justify-between items-baseline border-b border-black/10 pb-2">
                    <span className="text-black/40">NAME</span>
                    <span className="text-black font-semibold">
                      PRIYATHARSHINI
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-black/10 pb-2">
                    <span className="text-black/40">ROLE</span>
                    <span className="text-black font-semibold">
                      Digital Product Designer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="md:col-span-8 flex flex-col gap-24 pt-12 md:pt-0 pb-32">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-black/40 mb-8">
                [ The Philosophy ]
              </h3>
              <h2 className="font-serif italic text-4xl md:text-6xl text-black leading-tight mb-12">
                Digital Product Designer
              </h2>

              <div className="space-y-12">
                <FocusParagraph>
                  I approach design like a problem-solver — analytical, curious,
                  and driven by understanding how{" "}
                  <span className="text-violet">
                    systems, people, and business goals
                  </span>{" "}
                  intersect.
                </FocusParagraph>

                {/* Simplified Content as requested */}
                <p className="font-sans text-lg md:text-xl text-black/70 leading-relaxed max-w-3xl">
                  My decisions are guided by research, structured thinking, and
                  the pursuit of clarity. I break down complex workflows into
                  clear, usable flows and design systems that stand the test of
                  time.
                </p>
              </div>
            </div>

            {/* Key Strengths Grid */}
            <div className="strengths-grid">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-black/40">
                  [ Key Strengths ]
                </h3>
                <div className="h-[1px] bg-black/10 w-32 md:w-64"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="strength-card p-6 border border-black/10 bg-white/40 hover:border-black transition-colors duration-300 group">
                  <div className="mb-4 text-violet">
                    <Brain size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif italic text-xl text-black mb-2">
                    Analytical Problem Solving
                  </h4>
                  <p className="font-sans text-sm text-black/70 leading-relaxed">
                    I break down complex workflows into clear, usable flows.
                  </p>
                </div>

                <div className="strength-card p-6 border border-black/10 bg-white/40 hover:border-black transition-colors duration-300 group">
                  <div className="mb-4 text-violet">
                    <Search size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif italic text-xl text-black mb-2">
                    Research-Driven Thinking
                  </h4>
                  <p className="font-sans text-sm text-black/70 leading-relaxed">
                    I rely on interviews, data, and insights to shape meaningful
                    experiences.
                  </p>
                </div>

                <div className="strength-card p-6 border border-black/10 bg-white/40 hover:border-black transition-colors duration-300 group">
                  <div className="mb-4 text-violet">
                    <LayoutGrid size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif italic text-xl text-black mb-2">
                    Systems Approach
                  </h4>
                  <p className="font-sans text-sm text-black/70 leading-relaxed">
                    Design systems, scalable patterns, and functional
                    consistency.
                  </p>
                </div>

                <div className="strength-card p-6 border border-black/10 bg-white/40 hover:border-black transition-colors duration-300 group">
                  <div className="mb-4 text-violet">
                    <Target size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif italic text-xl text-black mb-2">
                    Precision & Clarity
                  </h4>
                  <p className="font-sans text-sm text-black/70 leading-relaxed">
                    From micro-interactions to information architecture, I
                    refine until the design feels “right.”
                  </p>
                </div>

                <div className="strength-card p-6 border border-black/10 bg-white/40 hover:border-black transition-colors duration-300 md:col-span-2 group">
                  <div className="mb-4 text-violet">
                    <Users size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif italic text-xl text-black mb-2">
                    Cross-functional Collaboration
                  </h4>
                  <p className="font-sans text-sm text-black/70 leading-relaxed">
                    I work closely with PMs, developers, QA, and stakeholders to
                    deliver impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: FEATURED WORK */}
      <CaseStudySection />

      {/* SECTION D: JOURNEY */}
      <JourneySection />

      {/* SECTION E: IMPACT QUOTE */}
      <section className="py-32 flex justify-center items-center bg-black px-6">
        <div className="max-w-4xl text-center">
          <h2 className="font-serif italic text-3xl md:text-5xl leading-tight text-stone-50 mb-6">
            “The most important step a person can take is the next one.”
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-50/40">
            — Brandon Sanderson, Oathbringer
          </p>
        </div>
      </section>

      {/* SECTION F: TESTIMONIALS */}
      <Testimonials />

      {/* SECTION G: ARCHIVE */}
      <section className="py-32 px-6 md:px-12 relative z-20 bg-stone-50 border-t border-black/5">
        <ProjectAccordion />
      </section>

      {/* SECTION H: ARSENAL */}
      <section className="py-24 bg-stone-50 relative z-20 overflow-hidden">
        <div className="mb-12 px-6 md:px-12 flex items-center justify-between section-reveal">
          <h3 className="font-mono text-xs uppercase tracking-widest text-black/50">
            [ Tooling & Systems ]
          </h3>
          <div className="h-[1px] bg-black/10 w-full ml-6"></div>
        </div>
        <SkillsTicker />
      </section>

      {/* SECTION I: FOOTER */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-between px-6 md:px-12 py-12 bg-black text-stone-50 relative overflow-hidden footer-container"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-stone-50 via-stone-50 to-transparent h-12 z-10 pointer-events-none opacity-10"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-violet/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="flex justify-between items-start pt-12 md:pt-24 z-10">
          <div>
            <div className="overflow-hidden">
              <h2 className="font-serif italic text-6xl md:text-[8rem] leading-[0.8] mb-8 footer-line">
                Let's
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="font-serif italic text-6xl md:text-[8rem] leading-[0.8] mb-8 text-lavender pl-12 md:pl-32 footer-line">
                Build.
              </h2>
            </div>
          </div>
          <div className="hidden md:block text-right font-mono text-sm opacity-50 footer-line">
            <p>BASED IN INDIA</p>
            <p>AVAILABLE GLOBALLY</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end pb-12 z-10">
          <div className="space-y-12">
            <div
              className="group cursor-pointer footer-line clickable"
              onClick={copyEmail}
            >
              <label className="font-mono text-xs text-stone-50/40 uppercase tracking-widest mb-2 block">
                Drop a line
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:tharshini161000@gmail.com"
                  className="text-lg sm:text-2xl md:text-4xl font-mono hover:text-lavender transition-colors duration-300"
                >
                  tharshini161000@gmail.com
                </a>
                <button
                  className="p-3 rounded-full border border-stone-50/20 hover:bg-stone-50 hover:text-black transition-all duration-300 clickable"
                  title="Copy Email"
                >
                  {copied ? (
                    <span className="font-bold text-sm">COPIED</span>
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="group footer-line">
              <label className="font-mono text-xs text-stone-50/40 uppercase tracking-widest mb-2 block">
                Call
              </label>
              <a
                href="tel:+919499929875"
                className="text-2xl md:text-4xl font-mono hover:text-lavender transition-colors duration-300 block"
              >
                +91 9499929875
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-6 footer-line">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-stone-50/20 rounded-full hover:bg-stone-50 hover:text-black transition-all duration-300 clickable"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-stone-50/20 rounded-full hover:bg-stone-50 hover:text-black transition-all duration-300 clickable"
              >
                <BehanceIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-12 footer-line">
            <div className="flex flex-col gap-4 w-full md:w-auto">
              {/* Resume Button */}
              <MagneticButton href="https://drive.google.com/file/d/1cihPxNl4oqQH2Z2Z1PUtueSw4wgQagxd/view?usp=sharing">
                VIEW RESUME <ArrowUpRight />
              </MagneticButton>
            </div>

            <div className="flex gap-8 font-mono text-xs md:text-sm text-stone-50/40">
              <span className="border border-stone-50/20 px-4 py-2 rounded-full">
                B.Arch (2018-2023)
              </span>
              <span className="border border-stone-50/20 px-4 py-2 rounded-full">
                Google UX Design
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
