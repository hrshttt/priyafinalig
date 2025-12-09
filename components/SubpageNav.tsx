
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SubpageNav: React.FC<{ title: string, dark?: boolean }> = ({ title, dark }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const textColor = dark ? 'text-stone-50' : 'text-black';
  const hoverColor = dark ? 'hover:text-violet' : 'hover:text-violet';

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    if (location.pathname === path) return;

    // Check for mobile: Navigate immediately without transition effect
    if (window.innerWidth < 768) {
      navigate(path);
      return;
    }

    // Trigger Light Transition
    const event = new CustomEvent('trigger-transition', { detail: { theme: 'light' } });
    window.dispatchEvent(event);

    // Reduced delay from 400ms to 200ms
    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  const handleContactClick = () => {
    // Check for mobile: Navigate immediately without transition effect
    if (window.innerWidth < 768) {
      navigate('/', { state: { scrollTo: 'contact' } });
      return;
    }

    // Trigger Dark Transition for Contact
    const event = new CustomEvent('trigger-transition', { detail: { theme: 'dark' } });
    window.dispatchEvent(event);

    // Reduced delay from 400ms to 200ms
    setTimeout(() => {
      navigate('/', { state: { scrollTo: 'contact' } });
    }, 200);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full px-6 md:px-12 py-6 md:py-8 flex justify-between items-center z-50 ${textColor} mix-blend-difference`}>
      <div className="flex items-center gap-8">
        <button 
          onClick={() => handleNavigation('/')}
          className={`font-mono text-xs uppercase tracking-widest clickable flex items-center gap-2 ${hoverColor} transition-colors group`}
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden md:inline">Back</span>
        </button>
        
        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
            <button 
              onClick={() => handleNavigation('/about')} 
              className={`clickable ${isActive('/about') ? 'text-violet' : ''} ${hoverColor} transition-colors`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/work')} 
              className={`clickable ${isActive('/work') ? 'text-violet' : ''} ${hoverColor} transition-colors`}
            >
              Work
            </button>
            <button 
              onClick={handleContactClick}
              className={`clickable ${hoverColor} transition-colors`}
            >
              Contact
            </button>
        </div>
      </div>
      
      <span className="font-serif italic text-xl md:text-2xl">{title}</span>
    </nav>
  );
};

export default SubpageNav;
