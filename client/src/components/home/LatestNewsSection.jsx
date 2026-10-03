import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

export const LatestNewsSection = ({ news = [] }) => {
  const featuredArticle = news.find((n) => n.featured) || news[0];
  const otherArticles = news.filter((n) => n.id !== featuredArticle?.id).slice(0, 3);

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                OFFICIAL PADDOCK DISPATCHES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              LATEST <span className="text-racing-red">NEWS</span>
            </h2>
          </div>

          <Link
            to="/news"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>VIEW ALL DISPATCHES</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Featured Story & Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Article (7 Cols) */}
          {featuredArticle && (
            <div className="lg:col-span-7">
              <Link
                to={`/news/${featuredArticle.slug}`}
                className="group block relative bg-racing-graphite border border-racing-border overflow-hidden h-full flex flex-col justify-between hover:border-racing-red transition-all duration-500 shadow-xl"
              >
                <div className="relative h-72 sm:h-96 overflow-hidden">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover filter brightness-60 group-hover:brightness-80 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-racing-red text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
                    FEATURED STORY &bull; {featuredArticle.category}
                  </div>
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-xs font-mono text-racing-silver">
                      <span>{featuredArticle.publishDate}</span>
                      <span>&bull;</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-racing-silver/90 font-sans leading-relaxed line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-racing-red transition-colors">
                    <span>READ FULL DISPATCH</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary 3 Articles Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {otherArticles.map((art) => (
              <Link
                key={art.id}
                to={`/news/${art.slug}`}
                className="group p-5 bg-racing-graphite border border-racing-border hover:border-racing-red/60 transition-all flex gap-4 items-center"
              >
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover bg-black shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-racing-red uppercase font-bold">
                    <span>{art.category}</span>
                    <span>&bull;</span>
                    <span className="text-racing-silver">{art.publishDate}</span>
                  </div>
                  <h4 className="font-display text-sm sm:text-base font-bold uppercase text-white group-hover:text-racing-red transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h4>
                  <div className="text-[11px] font-mono text-white/50 flex items-center gap-1">
                    <span>{art.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
