import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const VehicleTechnicalNav = () => {
  const [activeSection, setActiveSection] = useState('engine');

  const navItems = [
    { id: 'engine', label: 'ENGINE' },
    { id: 'transmission', label: 'TRANSMISSION' },
    { id: 'suspension', label: 'SUSPENSION' },
    { id: 'braking', label: 'BRAKING' },
    { id: 'aerodynamics', label: 'AERODYNAMICS' },
    { id: 'body', label: 'BODY SHELL' },
    { id: 'cockpit', label: 'COCKPIT' },
    { id: 'steering', label: 'STEERING WHEEL' },
    { id: 'design', label: 'DESIGN' },
    { id: 'history', label: 'RACING HISTORY' },
    { id: 'gallery', label: 'GALLERY' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-20 z-40 bg-racing-black/95 backdrop-blur-xl border-y border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between overflow-x-auto no-scrollbar py-3 gap-6">
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 sm:px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase whitespace-nowrap transition-all relative rounded ${
                  isActive
                    ? 'text-white bg-white/5'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="tech-nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-racing-red shadow-[0_0_8px_#E10600]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Small live telemetry badge */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-racing-red animate-ping" />
          <span className="uppercase">CHASSIS 992 SPEC</span>
        </div>
      </div>
    </nav>
  );
};
