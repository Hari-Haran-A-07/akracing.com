import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ShoppingBag, Heart, ArrowLeft, ShieldCheck, Check, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, wishlist } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const res = await api.getProductBySlug(slug);
        if (res.success) {
          setProduct(res.data);
          if (res.data.sizes?.length) {
            setSelectedSize(res.data.sizes[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-racing-black flex items-center justify-center text-white font-mono">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-racing-red animate-ping" />
          <span>LOADING MERCHANDISE ASSET...</span>
        </div>
      </div>
    );
  }

  const isWish = wishlist.includes(product.id);

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 space-y-10">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono text-racing-silver hover:text-white uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO AKR STORE</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Images Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border border-racing-border overflow-hidden bg-black shadow-2xl">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-[450px] sm:h-[540px] object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`${product.name} angle`}
                    className="w-full h-32 object-cover border border-racing-border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details, Size Selection & Add to Cart */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
                OFFICIAL AKR TEAM APPAREL &bull; {product.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>
              <div className="font-mono text-2xl font-bold text-racing-red pt-2">
                €{product.price} <span className="text-xs text-racing-silver font-normal">VAT INCLUDED</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3 font-mono">
                <div className="flex justify-between text-xs text-racing-silver">
                  <span>SELECT HOMOLOGATED SIZE:</span>
                  <span className="text-white font-bold">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 text-xs font-bold uppercase border transition-all ${
                        selectedSize === sz
                          ? 'bg-racing-red text-white border-racing-red'
                          : 'bg-racing-graphite text-racing-silver border-racing-border hover:border-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  className="flex-1 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-lg"
                >
                  <ShoppingBag size={16} />
                  <span>ADD TO PADDOCK CART</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-4 bg-racing-graphite border border-racing-border hover:border-racing-red text-white transition-colors"
                >
                  <Heart size={18} className={isWish ? 'fill-racing-red text-racing-red' : ''} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px] font-mono text-racing-silver pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-green-500 shrink-0" />
                  <span>AUTHENTIC LICENSED GEAR</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-racing-red shrink-0" />
                  <span>EXPRESS GLOBAL SHIPPING</span>
                </div>
              </div>
            </div>

            {/* Specs / Features */}
            {product.specs && (
              <div className="p-6 bg-racing-graphite border border-racing-border space-y-3">
                <span className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                  FABRIC & TECHNICAL SPECIFICATIONS
                </span>
                <ul className="space-y-2 text-xs font-sans text-white/80">
                  {product.specs.map((sp, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check size={12} className="text-racing-red shrink-0" />
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
