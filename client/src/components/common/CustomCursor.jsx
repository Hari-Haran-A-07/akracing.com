import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'view', 'play', 'open'
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Inspect target
      const target = e.target;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]');
      if (cursorAttr) {
        const type = cursorAttr.getAttribute('data-cursor');
        setCursorType(type);
        setIsHovered(true);
        return;
      }

      if (target.closest('video') || target.closest('[data-video]')) {
        setCursorType('play');
        setIsHovered(true);
      } else if (target.closest('img') || target.closest('[data-lightbox]')) {
        setCursorType('view');
        setIsHovered(true);
      } else if (target.closest('a')) {
        setCursorType('open');
        setIsHovered(true);
      } else if (target.closest('button') || target.closest('[role="button"]') || target.closest('input') || target.closest('select')) {
        setCursorType('pointer');
        setIsHovered(true);
      } else {
        setCursorType('default');
        setIsHovered(false);
      }
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
      case 'view': return 'VIEW';
      case 'play': return 'PLAY';
      case 'open': return 'OPEN';
      default: return '';
    }
  };

  const label = getLabel();
  const hasLabel = !!label;

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-[999999]">
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-racing-red pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Follower Ring with Label */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
          hasLabel
            ? 'w-16 h-16 bg-racing-red/90 border-racing-red text-white backdrop-blur-md shadow-lg shadow-racing-red/40'
            : isHovered
            ? 'w-10 h-10 bg-white/10 border-racing-red/80 backdrop-blur-sm'
            : 'w-7 h-7 border-white/40'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {hasLabel && (
          <span className="text-[10px] font-black tracking-widest uppercase font-mono">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
};
