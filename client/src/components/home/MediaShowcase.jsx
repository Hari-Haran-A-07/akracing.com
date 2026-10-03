import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Image as ImageIcon, Maximize2, X, ArrowRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MediaShowcase = ({ media = [] }) => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredMedia = media.filter((item) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'PHOTOS') return item.type === 'photo';
    if (activeTab === 'VIDEOS') return item.type === 'video';
    return item.category.toUpperCase() === activeTab.toUpperCase();
  });

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header with Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                CINEMATIC PHOTOGRAPHY & VIDEO ARCHIVE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              MEDIA <span className="text-racing-red">GALLERY</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-racing-graphite p-1 border border-racing-border">
            {['ALL', 'PHOTOS', 'VIDEOS', 'RACING', 'DRIVER', 'CARS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-colors ${
                  activeTab === tab
                    ? 'bg-racing-red text-white'
                    : 'text-racing-silver hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Media Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative h-72 sm:h-80 bg-racing-graphite border border-racing-border overflow-hidden cursor-pointer shadow-lg hover:border-racing-red/80 transition-all duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover filter brightness-60 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Type Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-racing-red text-white text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest flex items-center gap-1">
                  {item.type === 'video' ? <Play size={10} fill="currentColor" /> : <ImageIcon size={10} />}
                  <span>{item.category}</span>
                </span>
              </div>

              {/* Fullscreen Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={13} />
              </div>

              {/* Caption & Location */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-mono text-racing-red uppercase font-bold tracking-widest">{item.location}</span>
                <h4 className="font-display text-base font-bold uppercase text-white leading-tight group-hover:text-racing-red transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            to="/media"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-racing-red text-white text-xs font-mono font-bold uppercase tracking-widest transition-all"
          >
            <span>EXPLORE FULL MEDIA VAULT (PHOTOS & 4K FOOTAGE)</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightboxItem(null)}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-6 right-6 p-3 text-racing-silver hover:text-white z-50 bg-black/50 border border-white/20"
            >
              <X size={24} />
            </button>

            <div
              className="max-w-5xl w-full max-h-[85vh] bg-racing-black border border-racing-border overflow-hidden flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                {lightboxItem.type === 'video' ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[60vh] w-full object-contain"
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-racing-on-a-track-34676-large.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={lightboxItem.url}
                    alt={lightboxItem.title}
                    className="max-h-[65vh] w-full object-contain"
                  />
                )}
              </div>

              <div className="p-6 bg-racing-graphite border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-racing-red uppercase font-bold tracking-widest">
                    {lightboxItem.category} &bull; {lightboxItem.location} &bull; {lightboxItem.date}
                  </span>
                  <h3 className="font-display text-xl font-black uppercase text-white">{lightboxItem.title}</h3>
                  <p className="text-xs text-racing-silver font-sans">{lightboxItem.caption}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
