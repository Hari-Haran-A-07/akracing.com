import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2, Shield } from 'lucide-react';

export const NewsDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      try {
        const res = await api.getNewsBySlug(slug);
        if (res.success) {
          setArticle(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading || !article) {
    return (
      <div className="min-h-screen bg-racing-black flex items-center justify-center text-white font-mono">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-racing-red animate-ping" />
          <span>DECODING OFFICIAL DISPATCH...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Article Header & Cover */}
      <article className="max-w-4xl mx-auto px-6 sm:px-12 py-12 space-y-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-mono text-racing-silver hover:text-white uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO LATEST DISPATCHES</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs text-racing-red">
            <span className="px-2.5 py-0.5 bg-racing-red/10 border border-racing-red/30 uppercase font-bold">
              {article.category}
            </span>
            <span className="text-racing-silver">&bull; {article.publishDate}</span>
            <span className="text-racing-silver">&bull; {article.readTime}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <div className="text-xs font-mono text-racing-silver pt-1">
            DISPATCH BY: <strong className="text-white">{article.author || "AKR Motorsport Communications"}</strong>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="border border-racing-border overflow-hidden shadow-2xl">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-80 sm:h-[460px] object-cover filter contrast-110"
          />
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6 text-sm sm:text-base font-sans text-racing-silver leading-relaxed border-b border-white/10 whitespace-pre-line">
          {article.content}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <Tag size={14} className="text-racing-red mr-1" />
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-3 py-1 bg-racing-graphite border border-white/10 text-white uppercase"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};
