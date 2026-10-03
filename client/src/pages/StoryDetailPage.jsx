import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowLeft, BookOpen, Clock, Quote } from 'lucide-react';

export const StoryDetailPage = () => {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchStory = async () => {
      try {
        const res = await api.getStoryBySlug(slug);
        if (res.success) {
          setStory(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [slug]);

  if (loading || !story) {
    return (
      <div className="min-h-screen bg-racing-black flex items-center justify-center text-white font-mono">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-racing-red animate-ping" />
          <span>LOADING MAGAZINE ESSAY...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      <article className="max-w-4xl mx-auto px-6 sm:px-12 py-12 space-y-10">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-xs font-mono text-racing-silver hover:text-white uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO MAGAZINE INDEX</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs text-racing-red">
            <span className="px-3 py-1 bg-racing-red/10 border border-racing-red/30 uppercase font-bold">
              {story.section}
            </span>
            <span className="text-racing-silver">&bull; {story.readTime}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            {story.title}
          </h1>

          {story.subtitle && (
            <p className="font-display text-xl font-bold uppercase text-racing-silver">
              {story.subtitle}
            </p>
          )}
        </div>

        {/* Hero Image */}
        <div className="border border-racing-border overflow-hidden shadow-2xl">
          <img
            src={story.heroImage}
            alt={story.title}
            className="w-full h-80 sm:h-[500px] object-cover filter contrast-110"
          />
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6 text-base font-sans text-racing-silver leading-relaxed whitespace-pre-line border-b border-white/10">
          {story.content}
        </div>

        {/* Quotes Section */}
        {story.quotes && story.quotes.length > 0 && (
          <div className="p-8 bg-racing-graphite border-l-4 border-racing-red border-y border-r border-racing-border space-y-3">
            <Quote size={28} className="text-racing-red" />
            <p className="font-display text-2xl font-black uppercase text-white leading-snug">
              "{story.quotes[0]}"
            </p>
          </div>
        )}

        {/* Gallery */}
        {story.gallery && story.gallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            {story.gallery.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt="Story gallery asset"
                className="w-full h-64 object-cover border border-racing-border filter brightness-80 hover:brightness-100 transition-all"
              />
            ))}
          </div>
        )}
      </article>
    </div>
  );
};
