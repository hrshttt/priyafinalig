import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMenuOpenRef = useRef(isMenuOpen);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useGSAP(() => {
    const el = navContainerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { yPercent: -150, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 }
    );

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        if (isMenuOpenRef.current) return;
        const currentScroll = self.scroll();

        if (self.direction === 1 && currentScroll > 50) {
          gsap.to(el, {
            yPercent: -150,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        } else if (self.direction === -1) {
          gsap.to(el, {
            yPercent: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        }
      },
    });
  }, []);

  useGSAP(
    () => {
      if (!menuRef.current) return;
      tl.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          yPercent: 100,
          duration: 0.6,
          ease: "power4.inOut",
        })
        .from(
          ".mobile-nav-link",
          {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.3"
        );
    },
    { scope: menuRef }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current?.reverse();
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const handleNavigation = (path: string) => {
    if (isMenuOpen) setIsMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
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

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMenuOpen) setIsMenuOpen(false);
    if (window.innerWidth < 768) {
      if (location.pathname === "/") {
        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: "contact" } });
      }
      return;
    }
    const event = new CustomEvent("trigger-transition", {
      detail: { theme: "dark" },
    });
    window.dispatchEvent(event);
    setTimeout(() => {
      if (location.pathname === "/") {
        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "auto" });
        window.dispatchEvent(new Event("reveal-transition"));
      } else {
        navigate("/", { state: { scrollTo: "contact" } });
      }
    }, 200);
  };

  return (
    <>
      {/* Main Container - No Mix Blend Mode on Parent */}
      <div
        ref={navContainerRef}
        className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-[100] pointer-events-none"
      >
        {/* LOGO SECTION FIX: Removed 'mix-blend-difference' */}
        <div className="pointer-events-auto relative z-[101]">
          <Magnetic>
            <button
              onClick={() => handleNavigation("/")}
              className="block hover:opacity-70 transition-opacity duration-300"
            >
              {/* IMAGE FIX: Removed 'invert' so it stays black */}
              <img
                src="/MyLogo.png"
                alt="Priyatharshini"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </button>
          </Magnetic>
        </div>

        {/* Navigation Capsule */}
        <div
          ref={capsuleRef}
          className="pointer-events-auto bg-stone-50 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-2 md:px-3 py-2 flex items-center gap-2 md:gap-8 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        >
          <div className="hidden md:flex gap-1 bg-black/5 rounded-full p-1">
            {["About", "Work"].map((item) => {
              const path = `/${item.toLowerCase()}`;
              const active = isActive(path);
              return (
                <button
                  key={item}
                  onClick={() => handleNavigation(path)}
                  className={`relative px-6 py-2 rounded-full transition-all duration-300 overflow-hidden group ${
                    active ? "bg-white shadow-sm" : "hover:bg-black/5"
                  }`}
                >
                  <span
                    className={`relative z-10 font-mono text-xs uppercase tracking-widest ${
                      active ? "text-black font-semibold" : "text-black/60"
                    }`}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pr-1 md:pr-1">
            <div className="hidden md:block">
              <Magnetic>
                <button
                  onClick={handleContactClick}
                  className="group relative px-6 py-2.5 rounded-full bg-black text-stone-50 overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-violet translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                  <span className="relative font-mono text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 block">
                    Contact
                  </span>
                </button>
              </Magnetic>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-black"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[90] bg-black text-stone-50 flex flex-col justify-center items-center -translate-y-full"
      >
        <div className="flex flex-col gap-8 text-center">
          <button
            onClick={() => handleNavigation("/about")}
            className={`mobile-nav-link font-serif italic text-5xl clickable transition-colors duration-300 ${
              isActive("/about") ? "text-violet" : "hover:text-violet"
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("/work")}
            className={`mobile-nav-link font-serif italic text-5xl clickable transition-colors duration-300 ${
              isActive("/work") ? "text-violet" : "hover:text-violet"
            }`}
          >
            Work
          </button>
          <button
            onClick={handleContactClick}
            className="mobile-nav-link font-serif italic text-5xl clickable hover:text-violet transition-colors duration-300"
          >
            Contact
          </button>
        </div>
        <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50 mobile-nav-link">
          <span className="font-mono text-xs uppercase tracking-widest">
            Follow Me
          </span>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet transition-colors font-mono"
            >
              LI
            </a>
            <a
              href="https://www.behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet transition-colors font-mono"
            >
              BE
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
