import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Ruler,
  Sparkles,
  Brain,
  Search,
  GitBranch,
  Layers,
} from "lucide-react";
import FocusParagraph from "../components/FocusParagraph";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header Reveal
      gsap.from(".header-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });

      // Image Reveal
      gsap.from(".about-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.8,
      });

      // Content Reveal
      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block) => {
        gsap.from(block, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 95%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="bg-stone-50 min-h-screen blueprint-grid selection:bg-black selection:text-stone-50 pt-32 pb-20"
    >
      {/* 1. HERO HEADER */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="overflow-hidden pt-4 pb-12 px-2 -mx-2">
          <h1 className="header-line font-serif italic text-6xl md:text-[8rem] leading-[0.9]">
            Clarity & Logic.
          </h1>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT: PHOTO LEFT / TEXT RIGHT */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left Column: Image */}
          <div className="relative group about-image md:sticky md:top-32">
            <div className="aspect-[3/4] bg-stone-200 overflow-hidden relative z-10">
              <img
                src="/Photo.png"
                alt="Priyatharshini"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-violet/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Decorative border */}
            <div className="absolute top-4 -right-4 w-full h-full border border-black/20 -z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
          </div>

          {/* Right Column: All Text Content */}
          <div className="pt-0 md:pt-12 space-y-12 reveal-block">
            {/* Introduction */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-6">
                [ The Introduction ]
              </p>
              <p className="font-sans text-xl md:text-2xl text-black/90 leading-relaxed font-medium">
                Hi, I’m Priya. I don't just design to make things pretty. I
                design to make things make sense.
              </p>
            </div>

            <div className="w-full h-px bg-black/10"></div>

            <FocusParagraph>
              A quiet thinker who loves figuring out how things actually work.
            </FocusParagraph>

            <div className="space-y-6">
              <p className="font-sans text-black/70 leading-relaxed">
                I’m naturally curious, an observer of tiny details, and someone
                who gets excited about untangling messy systems.
              </p>
              <p className="font-sans text-black/70 leading-relaxed">
                For me, design isn't about decoration. It's about clear logic.
                It's about peeling back layers of complexity to reveal the
                simple, functional core underneath.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
              <div>
                <span className="block font-serif italic text-3xl mb-1">
                  INTP
                </span>
                <span className="font-mono text-xs text-black/40 uppercase">
                  Personality
                </span>
              </div>
              <div>
                <span className="block font-serif italic text-3xl mb-1">
                  Details
                </span>
                <span className="font-mono text-xs text-black/40 uppercase">
                  Obsession
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 QUOTE SECTION */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto mb-32 text-center reveal-block">
        <p className="font-serif italic text-3xl md:text-5xl leading-tight text-black">
          "I may not be the loudest person in the room, but I’m definitely the
          one thinking the most."
        </p>
      </section>

      {/* 3. WHO AM I (THE MINDSET) */}
      <section className="bg-black text-stone-50 py-32 md:py-48 mb-32">
        <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {/* Left Column: Sticky Header */}
          <div className="md:col-span-4 relative">
            <div className="sticky top-32 reveal-block">
              <span className="font-mono text-xs text-violet uppercase tracking-widest mb-6 block">
                [ The Mindset ]
              </span>
              <h2 className="font-serif italic text-4xl md:text-6xl leading-[1.1] text-white mb-10">
                Who am I <br /> as a designer?
              </h2>
              <div className="w-12 h-px bg-white/20"></div>
            </div>
          </div>

          {/* Right Column: Bento Grid of Points */}
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Solving large puzzle-like systems where others see only confusion.",
              "Noticing patterns and connections that no one else sees.",
              "Diving into the deepest details until things finally “click”.",
              "Simplifying the complex without losing its inherent value.",
              "Making workflows feel clean, calm, and intuitively obvious.",
            ].map((text, i) => (
              <div
                key={i}
                className={`reveal-block group p-8 border border-white/10 hover:bg-white/5 transition-all duration-500 flex flex-col justify-between h-full min-h-[240px] ${
                  i === 0 ? "md:col-span-2 bg-white/5" : ""
                }`}
              >
                <span className="font-mono text-xs text-violet mb-4 block">
                  0{i + 1}
                </span>
                <p
                  className={`font-serif text-white/50 group-hover:text-white transition-colors duration-500 leading-snug ${
                    i === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT I'M GOOD AT (GRID) */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="mb-16 reveal-block">
          <h2 className="font-serif text-4xl mb-4">What I'm Really Good At</h2>
          <div className="h-px w-24 bg-violet"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
          {[
            {
              title: "Chaos to Clarity",
              icon: <Sparkles />,
              desc: "Turning messy requirements into clear, structured pathways.",
            },
            {
              title: "System Thinking",
              icon: <Brain />,
              desc: "Making big, overwhelming systems feel understandable and manageable.",
            },
            {
              title: 'The "Why"',
              icon: <Search />,
              desc: "Researching relentlessly until I find the true reason behind a user action.",
            },
            {
              title: "Humanizing SaaS",
              icon: <Layers />,
              desc: "Designing complex enterprise products without making them look scary.",
            },
            {
              title: "Edge Cases",
              icon: <GitBranch />,
              desc: "Thinking through every possible scenario (I’m very INTP about this).",
            },
            {
              title: "Effortless UI",
              icon: <Ruler />,
              desc: "Creating clean, functional interfaces that feel effortless, not flashy.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-stone-50 p-8 md:p-10 hover:bg-white transition-colors duration-300 group reveal-block"
            >
              <div className="text-black/30 mb-6 group-hover:text-violet transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif italic text-2xl mb-4">{item.title}</h3>
              <p className="font-sans text-sm text-black/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PERSONAL INTERESTS */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 reveal-block">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start border-t border-black/10 pt-24">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-black/40 uppercase tracking-widest mb-6 block">
              [ Beyond Work ]
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl leading-tight text-black">
              Things I love outside of design/work
            </h2>
          </div>

          <div className="md:col-span-8">
            <ul className="grid grid-cols-1 gap-6">
              {[
                "Reading fantasy novels (Brandon Sanderson is my go to author)",
                "Sketching, illustration and 2D animation",
                "Organising (figma files included)",
                "Playing with my cats",
                "Binge watching webseries and animes on weekends",
                "Solving almost impossible Jigsaw puzzles",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-6 border-b border-black/5 pb-6 group hover:pl-4 transition-all duration-300"
                >
                  <span className="font-mono text-xs text-violet pt-1.5">
                    0{i + 1}
                  </span>
                  <span className="font-sans text-lg md:text-xl text-black/70 group-hover:text-black transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
