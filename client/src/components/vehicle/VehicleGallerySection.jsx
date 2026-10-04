import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const VehicleGallerySection = ({ car }) => {
  const { playClick } = useAudio();
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    {
      url: "/images/akr-porsche-gt3-cup.jpg",
      title: "AKR PORSCHE 911 GT3 CUP (#9)",
      caption: "FIA GT3 Homologated competition machine in official Ajith Kumar Racing livery."
    },
    {
      url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop",
      title: "HIGH-SPEED TRACK TESTING",
      caption: "Aerodynamic stability validation across high-speed straightaways."
    },
    {
      url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop",
      title: "DRIVER COCKPIT & HELMET RIG",
      caption: "Customized ergonomic driver setup ready for endurance stint changes."
    },
    {
      url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
      title: "PIT LANE & REFUELLING RIG",
      caption: "High-pressure dry break refuelling system for 24-hour endurance rounds."
    },
    {
      url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop",
      title: "AERODYNAMIC SWAN-NECK WING",
      caption: "11-stage adjustable autoclaved carbon rear wing generating 850kg downforce."
    },
    {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
      title: "MONOBLOC 6-PISTON BRAKES",
      caption: "Brembo racing monobloc calipers with internally ventilated 380mm slotted discs."
    }
  ];

  return (
    <section id="gallery" className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                HIGH-RESOLUTION MEDIA VAULT
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              CINEMATIC <span className="text-racing-red">GALLERY</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              AKR 911 GT3 CUP &bull; TRACK PHOTOGRAPHY &bull; CLICK ANY SHOT TO EXPAND
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-surface border border-white/10 rounded font-mono text-xs text-gray-300">
            ASSETS: <strong className="text-white">6 4K FRAMES</strong>
          </div>
        </div>

        {/* 6-Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveImage(img);
                playClick();
              }}
              className="h-72 bg-racing-surface/80 border border-white/10 rounded-xl overflow-hidden group shadow-xl relative cursor-pointer"
              data-cursor="image"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover filter brightness-70 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-racing-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 space-y-1 z-10">
                <div className="text-[9px] font-mono text-racing-red uppercase font-bold tracking-widest">
                  FRAME 0{idx + 1}
                </div>
                <h4 className="font-display text-lg font-black uppercase text-white tracking-tight leading-tight">
                  {img.title}
                </h4>
              </div>

              <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 sm:p-12 select-none"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-racing-red text-white rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center justify-center space-y-4"
            >
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
              />

              <div className="text-center space-y-1">
                <h3 className="font-display text-2xl font-black uppercase text-white">
                  {activeImage.title}
                </h3>
                <p className="font-mono text-xs text-gray-400">
                  {activeImage.caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
