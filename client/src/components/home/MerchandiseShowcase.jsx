import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAudio } from '../../context/AudioContext';

export const MerchandiseShowcase = () => {
  const { addItem, setIsCartOpen } = useCart();
  const { playClick } = useAudio();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [addedId, setAddedId] = useState(null);

  const products = [
    {
      id: 'akr-team-polo',
      name: 'AKR OFFICIAL TEAM POLO 2026',
      category: 'MENS',
      price: 85,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
      badge: 'OFFICIAL TEAM WEAR'
    },
    {
      id: 'akr-windbreaker',
      name: 'ENDURANCE PIT CREW WINDBREAKER',
      category: 'ESSENTIALS',
      price: 160,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
      badge: 'WEATHERPROOF'
    },
    {
      id: 'akr-cap-09',
      name: 'AJITH KUMAR #09 SNAPBACK CAP',
      category: 'ESSENTIALS',
      price: 45,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
      badge: 'DRIVER SIGNATURE'
    },
    {
      id: 'akr-sweatshirt-women',
      name: 'PADDOCK PERFORMANCE HOODIE',
      category: 'WOMENS',
      price: 120,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      badge: 'FLEECE LINED'
    }
  ];

  const filtered = activeCategory === 'ALL' ? products : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addItem(product, 1);
    setAddedId(product.id);
    playClick();
    setIsCartOpen(true);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-28 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header with Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                OFFICIAL TEAM APPAREL & ACCESSORIES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              TEAM <span className="text-racing-red">STORE</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-racing-surface p-1 border border-white/10 rounded">
            {['ALL', 'MENS', 'WOMENS', 'ESSENTIALS'].map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); playClick(); }}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all rounded ${
                  activeCategory === cat ? 'bg-racing-red text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-racing-surface/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-racing-red/60 transition-all shadow-xl"
            >
              <div className="space-y-4">
                {/* Product Image Stage */}
                <div className="relative h-64 bg-black/60 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl filter brightness-85 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 rounded border border-white/10 text-[9px] font-mono font-bold text-racing-red uppercase">
                    {item.badge}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-2">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">{item.category} COLLECTION</div>
                  <h3 className="font-display text-lg font-bold uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <div className="font-mono text-base font-black text-white pt-1">
                    ${item.price}.00 <span className="text-[10px] text-gray-500 font-normal">USD</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={(e) => handleAddToCart(item, e)}
                  className={`w-full py-3 text-xs font-mono font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all ${
                    addedId === item.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-racing-red hover:bg-racing-brightRed text-white shadow-lg'
                  }`}
                >
                  {addedId === item.id ? (
                    <>
                      <Check size={14} />
                      <span>ADDED TO CART</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400">WORLDWIDE EXPRESS SHIPPING ON ALL ORDERS</span>
          <Link
            to="/shop"
            onClick={playClick}
            className="text-xs font-mono text-racing-red hover:underline font-bold uppercase flex items-center gap-1.5"
          >
            <span>VIEW COMPLETE CATALOGUE</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
