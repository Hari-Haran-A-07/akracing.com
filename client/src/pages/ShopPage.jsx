import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { ShoppingBag, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const { addToCart, toggleWishlist, wishlist } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const res = await api.getProducts();
        if (res.success) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    if (categoryFilter === 'ALL') return true;
    return p.category.toLowerCase() === categoryFilter.toLowerCase();
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
              OFFICIAL TEAM MERCHANDISE
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            AKR <span className="text-racing-red">STORE</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            AUTHENTIC 2026 TEAM APPAREL, CAPS, TECHNICAL TEES & LIMITED COLLECTIBLE SCALE MODELS
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {['ALL', 'Jackets', 'Caps', 'T-Shirts', 'Collectibles'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-colors ${
                categoryFilter.toLowerCase() === cat.toLowerCase()
                  ? 'bg-racing-red text-white'
                  : 'bg-black/50 text-racing-silver hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product) => {
            const isWish = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-racing-graphite border border-racing-border overflow-hidden flex flex-col justify-between group hover:border-racing-red transition-all duration-300 shadow-xl"
              >
                <div className="relative h-72 overflow-hidden bg-black">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-racing-red text-white text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest">
                    {product.category}
                  </div>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-black/60 border border-white/10 hover:border-racing-red transition-colors"
                  >
                    <Heart size={14} className={isWish ? 'fill-racing-red text-racing-red' : 'text-white'} />
                  </button>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold uppercase text-white group-hover:text-racing-red transition-colors leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="font-mono text-lg font-bold text-white pt-1">
                      €{product.price}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => addToCart(product, product.sizes?.[0] || 'L')}
                      className="w-full py-3 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <ShoppingBag size={14} />
                      <span>ADD TO CART</span>
                    </button>

                    <Link
                      to={`/shop/${product.slug}`}
                      className="block text-center py-2 text-[11px] font-mono text-racing-silver hover:text-white uppercase transition-colors"
                    >
                      VIEW PRODUCT DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
