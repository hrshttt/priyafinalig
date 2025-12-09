import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

const MagneticButton: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.3); // Magnetic strength
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={buttonRef}
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center w-full md:w-80 h-24 md:h-32 bg-stone-50 text-black rounded-full overflow-hidden will-change-transform clickable"
    >
      <div className="absolute inset-0 bg-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out"></div>
      <span className="relative z-10 font-serif italic text-2xl md:text-3xl group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>
    </a>
  );
};

export default MagneticButton;