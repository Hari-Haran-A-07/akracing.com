import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'car', 'image', 'telemetry', 'play', 'drag', 'scroll'
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      // 1. Explicit data-cursor attribute
      const cursorAttr = target.closest('[data-cursor]');
      if (cursorAttr) {
        const type = cursorAttr.getAttribute('data-cursor');
        setCursorType(type);
        setIsHovered(true);
        return;
      }

      // 2. Car showcases or 3D viewports
      if (target.closest('[data-car]') || target.closest('.car-viewer-container') || target.closest('canvas')) {
        setCursorType('car');
        setIsHovered(true);
        return;
      }

      // 3. Telemetry dials and charts
      if (target.closest('[data-telemetry]') || target.closest('.telemetry-cluster')) {
        setCursorType('telemetry');
        setIsHovered(true);
        return;
      }

      // 4. Gallery images & media lightboxes
      if (target.closest('[data-lightbox]') || (target.tagName === 'IMG' && target.closest('.gallery-grid'))) {
        setCursorType('image');
        setIsHovered(true);
        return;
      }

      // 5. Video elements
      if (target.closest('video') || target.closest('[data-video]')) {
        setCursorType('play');
        setIsHovered(true);
        return;
      }

      // 6. Links & Buttons
      if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
        setCursorType('pointer');
        setIsHovered(true);
        return;
      }

      // Default state
      setCursorType('default');
      setIsHovered(false);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const getLabel = () => {
    switch (cursorType) {
      case 'car': return 'EXPLORE';
      case 'image': return 'VIEW';
      case 'telemetry': return 'DATA';
      case 'play': return 'PLAY';
      case 'drag': return 'DRAG';
      case 'scroll': return 'SCROLL';
      case 'open': return 'OPEN';
      default: return '';
    }
  };

  const label = getLabel();
  const hasLabel = !!label;

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-[999999] select-none">
      {/* Precision Center Aim Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-racing-red pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
        transition={{ type: 'spring', damping: 45, stiffness: 800, mass: 0.1 }}
      />

      {/* Outer Trailing Ring with Context Label & Crosshairs */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          hasLabel
            ? 'w-20 h-20 bg-racing-red/90 border-white text-white backdrop-blur-md shadow-[0_0_25px_rgba(217,4,41,0.6)]'
            : isHovered
            ? 'w-12 h-12 bg-white/10 border-racing-red backdrop-blur-sm'
            : 'w-8 h-8 border-white/40'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.2 }}
      >
        {hasLabel ? (
          <span className="text-[10px] font-black tracking-widest uppercase font-mono text-center">
            {label}
          </span>
        ) : isHovered ? (
          <div className="w-1.5 h-1.5 rounded-full bg-racing-red animate-ping" />
        ) : null}
      </motion.div>
    </div>
  );
};
