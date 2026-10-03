import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';

export const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionFilter, setSectionFilter] = useState('ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchStories = async () => {
      try {
        const res = await api.getStories();
        if (res.success) {
          setStories(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const filtered = stories.filter((s) => {
    if (sectionFilter === 'ALL') return true;
    return s.section.toUpperCase() === sectionFilter.toUpperCase();
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
              LONG-FORM EDITORIAL ESSAYS
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            AKR <span className="text-racing-red">MAGAZINE</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            RACING &bull; PEOPLE &bull; TECHNOLOGY &bull; TRACK &bull; HERITAGE &bull; BEHIND THE SCENES
          </p>
        </div>
      </section>

      {/* Filter Ribbon */}
      <section className="py-6 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {['ALL', 'RACING', 'PEOPLE', 'TECHNOLOGY'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSectionFilter(sec)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-colors ${
                sectionFilter === sec
                  ? 'bg-racing-red text-white'
                  : 'bg-black/50 text-racing-silver hover:text-white border border-white/10'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((story) => (
            <Link
              key={story.id}
              to={`/stories/${story.slug}`}
              className="group bg-racing-graphite border border-racing-border overflow-hidden flex flex-col justify-between hover:border-racing-red transition-all duration-300 shadow-xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover filter brightness-50 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-racing-red text-white text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest">
                  {story.section}
                </div>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-racing-silver uppercase tracking-widest">{story.readTime}</span>
                  <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-xs text-racing-silver/90 font-sans leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-racing-red transition-colors">
                  <span>READ ESSAY</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
