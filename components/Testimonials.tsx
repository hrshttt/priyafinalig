
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: "I had the opportunity to work closely with Priyatharshini during her tenure as a full time UI/UX Designer at Hiringhood, where she made significant contributions to key initiatives, including the Corp-to-Corp project and Nano Apps. Her creativity, structured design approach, and strong grasp of user experience principles consistently elevated the quality of our products. She played an essential role in translating complex workflows into clean, intuitive, and user friendly interfaces. Her ability to understand user needs, collaborate effectively with cross-functional teams, and incorporate feedback seamlessly made her a dependable and impactful member of the team. Her designs not only aligned with business goals but also improved usability across various stages of the product lifecycle. I highly recommend Priyatharshini for future opportunities in UI/UX design or related roles. Her dedication, problem solving skills, and commitment to delivering thoughtful and well crafted designs make her an asset to any organization.",
    author: "Shreya Guptha",
    role: "Associate Product Manager, Hiringhood"
  },
  {
    text: "I worked with Priya for revamping our design for an existing product. From the day one she has been transparently communicating on how should we deal with scope and along with what design choices we have. She was also punctual to what she committed. She was able to simplify. She quickly understood our product. Ours was a Chrome extension with lots of limitations, especially the space. With a limited screen space, she was able to navigate well and revamp the design. She was quick to understand how the product works. She was able to identify the design issues. And she was able to arrive at meaningful and viable designs. She was also open to feedback. She handled feedback gracefully. She was able to articulate her point of views well.",
    author: "Chiranjeevi",
    role: "Founder, Litethink ai"
  }
];

const TestimonialCard: React.FC<{ data: typeof TESTIMONIALS[0] }> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = data.text.length > 150;

  return (
    <div className={`w-[260px] md:w-[600px] flex-shrink-0 bg-white p-6 md:p-12 border border-black/5 rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,0.03)] hover:shadow-[12px_12px_0px_0px_rgba(124,58,237,0.1)] transition-all duration-300 flex flex-col justify-between ${expanded ? 'h-auto' : 'h-[480px]'}`}>
       <div>
         <div className="text-violet text-4xl font-serif leading-none mb-6">“</div>
         <div className="font-sans text-sm md:text-lg leading-relaxed text-black/80 mb-6">
           {expanded ? data.text : (
             <span className="line-clamp-6">
               {data.text}
             </span>
           )}
         </div>
         
         {isLong && (
           <button 
             onClick={() => setExpanded(!expanded)}
             className="text-xs font-mono uppercase tracking-widest text-violet hover:text-black transition-colors flex items-center gap-1 mb-6 clickable"
           >
             {expanded ? (
               <>Show Less <ChevronUp size={14} /></>
             ) : (
               <>Show More <ChevronDown size={14} /></>
             )}
           </button>
         )}
       </div>

       <div className="border-t border-black/5 pt-4 mt-auto">
         <h4 className="font-serif italic text-lg text-black">{data.author}</h4>
         <span className="font-mono text-xs uppercase text-black/40">{data.role}</span>
       </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween>(null);

  // Create 4 copies of the data to ensure smooth infinite loop logic
  const REPEATED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  useGSAP(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const duration = 60; // Slower duration for readability

    tweenRef.current = gsap.to(el, {
      xPercent: -50, // Move halfway because we have enough duplicates
      duration: duration,
      ease: "none",
      repeat: -1
    });

  }, []);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.play();
  };

  return (
    <section className="py-24 bg-stone-50 border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
         <h2 className="font-serif italic text-4xl md:text-6xl text-black mb-4">
            Impact <span className="text-violet">&</span> Trust
         </h2>
         <p className="font-mono text-xs uppercase tracking-widest text-black/50">
            What people say about working with me
         </p>
      </div>

      <div 
        className="w-full overflow-hidden" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <div ref={marqueeRef} className="flex gap-8 w-fit px-6 will-change-transform items-start">
          {REPEATED_TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} data={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
