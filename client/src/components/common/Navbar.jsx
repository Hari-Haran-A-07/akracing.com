import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Volume2, VolumeX, Menu, Shield, Radio, ChevronDown, User } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { SearchModal } from './SearchModal';
import { useCart } from '../../context/CartContext';
import { useAudio } from '../../context/AudioContext';
import { useAuth } from '../../context/AuthContext';
import { useTelemetry } from '../../context/TelemetryContext';

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { totalCount, setIsCartOpen } = useCart();
  const { soundEnabled, toggleSound, playClick } = useAudio();
  const { isAdmin } = useAuth();
  const { telemetry } = useTelemetry();
  const location = useLocation();

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global `/` key listener for search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !isSearchOpen && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMenu(null);
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  const navCategories = [
    { key: 'RACING', label: 'RACING', path: '/racing' },
    { key: 'DRIVER', label: 'DRIVER', path: '/driver' },
    { key: 'CARS', label: 'CARS', path: '/cars' },
    { key: 'TECH', label: 'TECHNOLOGY', path: '/technology' },
    { key: 'EDITORIAL', label: 'EDITORIAL', path: '/news' },
    { key: 'EXPERIENCE', label: 'EXPERIENCES', path: '/experiences' },
    { key: 'SHOP', label: 'SHOP', path: '/shop' },
  ];

  return (
    <>
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-racing-black/95 backdrop-blur-xl border-b border-racing-border shadow-2xl' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent'
      }`}>
        {/* Top Mini Telemetry Ticker */}
        <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-racing-black/80 border-b border-white/5 text-[10px] font-mono tracking-widest text-racing-silver select-none">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-racing-red animate-pulse" />
              <span className="text-white font-bold">LIVE TELEMETRY:</span>
              <span className="text-racing-red font-bold">{telemetry.car}</span>
            </div>
            <span>SPEED: <strong className="text-white">{telemetry.currentSpeed} KM/H</strong></span>
            <span>POSITION: <strong className="text-white">P{telemetry.currentPosition}</strong> ({telemetry.gapToLeader})</span>
            <span>RPM: <strong className="text-white">{telemetry.rpm}</strong></span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/live" className="text-racing-red hover:underline flex items-center gap-1 font-bold">
              <Radio size={12} className="animate-pulse" /> VIRTUAL PIT WALL
            </Link>
            <span className="text-white/40">|</span>
            <span className="tracking-[0.2em] text-white/70">SPEED × ENGINEERING × RACING</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-18 lg:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={playClick}
            className="flex items-center gap-3.5 group relative"
          >
            <div className="h-10 sm:h-11 flex items-center bg-white px-2 py-1 rounded border border-racing-red/40 group-hover:border-racing-red transition-all duration-300 shadow-[0_0_15px_rgba(217,4,41,0.25)]">
              <img
                src="/images/akr-logo.jpg"
                alt="Ajith Kumar Racing Official Logo"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white uppercase group-hover:text-racing-red transition-colors leading-none">
                AJITH KUMAR <span className="text-racing-red">RACING</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-racing-silver uppercase">
                OFFICIAL MOTORSPORT PLATFORM
              </span>
            </div>
          </Link>

          {/* Desktop MegaMenu Links */}
          <nav className="hidden xl:flex items-center space-x-1" onMouseLeave={() => setActiveMenu(null)}>
            {navCategories.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => {
                  setActiveMenu(item.key);
                  playClick();
                }}
              >
                <Link
                  to={item.path}
                  className={`px-3.5 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-colors flex items-center gap-1 ${
                    activeMenu === item.key ? 'text-racing-red' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  <ChevronDown size={11} className={`transition-transform duration-200 ${activeMenu === item.key ? 'rotate-180 text-racing-red' : 'opacity-40'}`} />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Action Icons & Member Tools */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => {
                playClick();
                setIsSearchOpen(true);
              }}
              className="p-2 text-racing-silver hover:text-white transition-colors flex items-center gap-1.5"
              title="Search [/]"
              aria-label="Search"
            >
              <Search size={18} />
              <span className="hidden md:inline-block text-[10px] font-mono text-white/40 border border-white/20 px-1 py-0.2 rounded">/</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 text-racing-silver hover:text-white transition-colors"
              title={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
              aria-label="Sound Toggle"
            >
              {soundEnabled ? <Volume2 size={18} className="text-racing-red animate-pulse" /> : <VolumeX size={18} />}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => {
                playClick();
                setIsCartOpen(true);
              }}
              className="p-2 text-racing-silver hover:text-white transition-colors relative"
              title="AKR Merchandise Cart"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-racing-red text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* VIP Member / Admin Link */}
            {isAdmin ? (
              <Link
                to="/admin"
                onClick={playClick}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-racing-red/10 border border-racing-red text-racing-red hover:bg-racing-red hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-wider"
              >
                <Shield size={13} />
                <span>DIRECTOR</span>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={playClick}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red transition-all text-xs font-mono font-bold uppercase tracking-wider"
              >
                <User size={13} />
                <span>PADDOCK</span>
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                playClick();
                setIsMobileNavOpen(true);
              }}
              className="xl:hidden p-2 text-racing-silver hover:text-white transition-colors ml-1"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Dynamic MegaMenu Drawer on Hover */}
        {activeMenu && (
          <MegaMenu
            category={activeMenu}
            onClose={() => setActiveMenu(null)}
          />
        )}
      </header>
    </>
  );
};
