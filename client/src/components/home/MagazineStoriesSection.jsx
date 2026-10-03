import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';

export const MagazineStoriesSection = ({ stories = [] }) => {
  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                EDITORIAL MAGAZINE ESSAYS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              AKR <span className="text-racing-red">STORIES</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              BEHIND THE VISOR &bull; HUMAN PERFORMANCE &bull; THE UNSEEN CRAFT
            </p>
          </div>

          <Link
            to="/stories"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>EXPLORE MAGAZINE</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stories Asymmetric Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <Link
              key={story.id}
              to={`/stories/${story.slug}`}
              className="group relative bg-racing-black border border-racing-border overflow-hidden flex flex-col justify-between hover:border-racing-red transition-all duration-500 shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover filter brightness-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-racing-red text-white text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest">
                  {story.section}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-racing-silver uppercase tracking-widest">{story.readTime}</span>
                  <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-racing-silver/90 font-sans leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-racing-red transition-colors">
                  <span>READ ESSAY</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
