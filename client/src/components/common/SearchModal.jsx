import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Zap, Trophy, Car, FileText, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const searchableItems = [
    { title: "AKR GT3-01 Spec Vehicle", category: "CARS", path: "/cars/akr-gt3-01", type: "car" },
    { title: "AKR GT4 Challenge Clubsport", category: "CARS", path: "/cars/akr-gt4-cup", type: "car" },
    { title: "Ajith Kumar - Lead Driver Profile", category: "DRIVER", path: "/driver", type: "driver" },
    { title: "Driver Career Timeline & Achievements", category: "HERITAGE", path: "/driver#timeline", type: "driver" },
    { title: "2026 24H Series Middle East Campaign", category: "CHAMPIONSHIP", path: "/championships", type: "trophy" },
    { title: "European GT Challenge 2026", category: "CHAMPIONSHIP", path: "/championships", type: "trophy" },
    { title: "12H Spa-Francorchamps Circuit Round", category: "CALENDAR", path: "/calendar", type: "race" },
    { title: "24H Dubai Historic Podium Results", category: "RESULTS", path: "/results", type: "race" },
    { title: "Live Virtual Pit Wall & Telemetry", category: "TELEMETRY", path: "/live", type: "live" },
    { title: "Aerodynamics & CFD Optimization", category: "TECHNOLOGY", path: "/technology#aero", type: "tech" },
    { title: "Motec High-Frequency Telemetry Lab", category: "TECHNOLOGY", path: "/technology#telemetry", type: "tech" },
    { title: "Yas Marina Historic Class Victory", category: "NEWS", path: "/news/akr-claims-monumental-victory-at-yas-marina", type: "news" },
    { title: "The Pursuit of Perfection: Monza to Spa", category: "STORIES", path: "/stories/the-pursuit-of-perfection-monza-to-spa", type: "story" },
    { title: "Official Team Softshell Jacket 2026", category: "SHOP", path: "/shop", type: "shop" },
    { title: "VIP Paddock Club Race Access", category: "EXPERIENCE", path: "/experiences", type: "exp" },
    { title: "AKR Technical Staff & Race Engineers", category: "TEAM", path: "/team", type: "team" }
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filtered = query.trim() === ''
    ? searchableItems.slice(0, 6)
    : searchableItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-racing-graphite border border-racing-border shadow-2xl rounded-none overflow-hidden"
        >
          {/* Header / Input */}
          <div className="flex items-center px-6 py-5 border-b border-white/10 bg-racing-carbon/80">
            <Search size={20} className="text-racing-red mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cars, driver, races, telemetry, news, shop..."
              className="w-full bg-transparent text-white placeholder:text-racing-silver/50 focus:outline-none text-base font-sans"
            />
            <button
              onClick={onClose}
              className="text-racing-silver hover:text-white p-1 ml-2 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-racing-silver uppercase">
              {query.trim() === '' ? 'QUICK NAVIGATION / POPULAR DISPATCHES' : `RESULTS (${filtered.length})`}
            </div>

            {filtered.length === 0 ? (
              <div className="p-8 text-center text-racing-silver font-mono text-xs">
                NO MOTORSPORT ASSETS FOUND MATCHING "{query.toUpperCase()}"
              </div>
            ) : (
              filtered.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className="w-full text-left px-4 py-3 hover:bg-white/[0.04] border border-transparent hover:border-racing-red/40 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-racing-silver group-hover:text-racing-red group-hover:bg-racing-red/10 transition-colors">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-racing-red transition-colors font-sans">
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-white/20 group-hover:text-racing-red group-hover:translate-x-1 transition-all" />
                </button>
              ))
            )}
          </div>

          {/* Search Footer */}
          <div className="px-6 py-3 bg-racing-black border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-racing-silver/60">
            <span>PRESS <kbd className="px-1.5 py-0.5 bg-white/10 text-white rounded text-[10px]">ESC</kbd> TO CLOSE</span>
            <span>AJITH KUMAR RACING TELEMETRY INDEX</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
