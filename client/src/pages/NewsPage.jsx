import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      try {
        const res = await api.getNews();
        if (res.success) {
          setNews(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filtered = news.filter((n) => {
    if (categoryFilter === 'ALL') return true;
    return n.category.toUpperCase() === categoryFilter.toUpperCase();
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
              OFFICIAL PADDOCK EDITORIAL
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            LATEST <span className="text-racing-red">NEWS</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            RACE REPORTS, ENGINEERING UPDATES, DRIVER INTERVIEWS & ANNOUNCEMENTS
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-6 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {['ALL', 'Racing', 'Technology', 'Driver', 'Team'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-colors ${
                categoryFilter.toUpperCase() === cat.toUpperCase()
                  ? 'bg-racing-red text-white'
                  : 'bg-black/50 text-racing-silver hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.slug}`}
              className="group bg-racing-graphite border border-racing-border overflow-hidden flex flex-col justify-between hover:border-racing-red transition-all duration-300 shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-racing-red text-white text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest">
                  {item.category}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs font-mono text-racing-silver">
                    <span>{item.publishDate}</span>
                    <span>&bull;</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-racing-silver/90 font-sans leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-racing-red transition-colors">
                  <span>READ DISPATCH</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
