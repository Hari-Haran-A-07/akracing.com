import React from 'react';
import { Link } from 'react-router-dom';
import { X, Volume2, VolumeX, Shield, ArrowRight, ShoppingBag, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const MobileNav = ({ isOpen, onClose, onOpenSearch }) => {
  const { soundEnabled, toggleSound } = useAudio();
  const { totalCount, setIsCartOpen } = useCart();
  const { isAdmin, user } = useAuth();

  const links = [
    { name: 'RACING', path: '/racing', num: '01' },
    { name: 'DRIVER', path: '/driver', num: '02' },
    { name: 'CARS', path: '/cars', num: '03' },
    { name: 'CHAMPIONSHIPS', path: '/championships', num: '04' },
    { name: 'CALENDAR', path: '/calendar', num: '05' },
    { name: 'RESULTS', path: '/results', num: '06' },
    { name: 'LIVE RACE', path: '/live', num: '07', highlight: true },
    { name: 'TECHNOLOGY', path: '/technology', num: '08' },
    { name: 'NEWS', path: '/news', num: '09' },
    { name: 'STORIES', path: '/stories', num: '10' },
    { name: 'MEDIA', path: '/media', num: '11' },
    { name: 'TEAM', path: '/team', num: '12' },
    { name: 'HERITAGE', path: '/heritage', num: '13' },
    { name: 'EXPERIENCES', path: '/experiences', num: '14' },
    { name: 'SHOP', path: '/shop', num: '15' },
    { name: 'CONTACT', path: '/contact', num: '16' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-racing-black/98 flex flex-col justify-between p-6 sm:p-10 overflow-y-auto text-white"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <div className="w-8 h-8 border border-racing-red rotate-45 flex items-center justify-center bg-black">
              <span className="-rotate-45 font-display font-black text-xs">AKR</span>
            </div>
            <span className="font-display font-black text-lg tracking-wider">
              AJITH KUMAR <span className="text-racing-red">RACING</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSearch?.();
              }}
              className="p-2 border border-white/20 text-racing-silver hover:text-white"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 border border-white/20 text-racing-silver hover:text-white"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Staggered Navigation Items */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
          {links.map((link, idx) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.3 }}
            >
              <Link
                to={link.path}
                onClick={onClose}
                className={`group flex items-baseline justify-between py-2 border-b border-white/5 transition-all ${
                  link.highlight ? 'text-racing-red' : 'text-white hover:text-racing-red'
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] font-mono text-racing-silver/50 group-hover:text-racing-red">
                    {link.num}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">
                    {link.name}
                  </span>
                </div>
                {link.highlight && (
                  <span className="text-[9px] font-mono font-bold bg-racing-red text-white px-2 py-0.5 animate-pulse">
                    LIVE
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Utility Grid */}
        <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-racing-silver">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 hover:text-white transition-colors uppercase text-[11px]"
            >
              {soundEnabled ? <Volume2 size={16} className="text-racing-red" /> : <VolumeX size={16} />}
              <span>{soundEnabled ? 'SOUND: ON' : 'SOUND: OFF'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                setIsCartOpen(true);
              }}
              className="flex items-center gap-2 hover:text-white transition-colors uppercase text-[11px]"
            >
              <ShoppingBag size={16} className="text-racing-red" />
              <span>CART ({totalCount})</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin ? (
              <Link
                to="/admin"
                onClick={onClose}
                className="text-racing-red font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Shield size={14} /> RACE DIRECTOR PORTAL
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="hover:text-white uppercase tracking-wider"
              >
                MEMBER LOGIN
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
