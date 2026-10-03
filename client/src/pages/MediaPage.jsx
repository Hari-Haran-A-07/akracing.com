import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Play, Image as ImageIcon, Maximize2, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MediaPage = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMedia = async () => {
      try {
        const res = await api.getMedia();
        if (res.success) {
          setMedia(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const filtered = media.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'PHOTOS') return item.type === 'photo';
    if (filter === 'VIDEOS') return item.type === 'video';
    return item.category.toUpperCase() === filter.toUpperCase();
  });

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Hero */}
      <section className="py-20 px-6 sm:px-12 border-b border-racing-border relative overflow-hidden">
        <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-racing-red" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
              HIGH-RESOLUTION ARCHIVE
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            MEDIA <span className="text-racing-red">VAULT</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            OFFICIAL RACE PHOTOGRAPHY, ONBOARD FOOTAGE, GARAGE DOCUMENTARIES & ASSETS
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {['ALL', 'PHOTOS', 'VIDEOS', 'RACING', 'DRIVER', 'CARS', 'TEAM', 'BEHIND THE SCENES'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-colors ${
                filter.toUpperCase() === tab.toUpperCase()
                  ? 'bg-racing-red text-white'
                  : 'bg-black/50 text-racing-silver hover:text-white border border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative h-80 bg-racing-graphite border border-racing-border overflow-hidden cursor-pointer shadow-lg hover:border-racing-red transition-all duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover filter brightness-60 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="bg-racing-red text-white text-[9px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest flex items-center gap-1">
                  {item.type === 'video' ? <Play size={10} fill="currentColor" /> : <ImageIcon size={10} />}
                  <span>{item.category}</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-mono text-racing-red uppercase font-bold tracking-widest">{item.location}</span>
                <h4 className="font-display text-base font-bold uppercase text-white leading-tight group-hover:text-racing-red transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
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

              <div className="p-6 bg-racing-graphite border-t border-white/10">
                <span className="text-[10px] font-mono text-racing-red uppercase font-bold tracking-widest">
                  {lightboxItem.category} &bull; {lightboxItem.location}
                </span>
                <h3 className="font-display text-xl font-black uppercase text-white mt-1">{lightboxItem.title}</h3>
                <p className="text-xs text-racing-silver font-sans mt-1">{lightboxItem.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
