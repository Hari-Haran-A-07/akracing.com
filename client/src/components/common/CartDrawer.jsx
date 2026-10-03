import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalCount } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md bg-racing-black border-l border-racing-border h-full shadow-2xl flex flex-col z-10 text-white"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-racing-graphite/50">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-racing-red" />
              <div>
                <h3 className="font-display text-lg font-black uppercase tracking-tight">AKR PADDOCK GEAR</h3>
                <p className="text-[10px] font-mono text-racing-silver uppercase tracking-widest">{totalCount} ITEMS IN GARAGE</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-white/10 text-racing-silver hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-racing-silver">
                  <ShoppingBag size={28} />
                </div>
                <div className="font-display text-lg font-bold uppercase">YOUR CART IS EMPTY</div>
                <p className="text-xs text-racing-silver max-w-xs">
                  Equip yourself with official Ajith Kumar Racing team apparel, limited edition caps, and collectibles.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-4 px-6 py-2.5 bg-racing-red text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-racing-crimson transition-colors"
                >
                  EXPLORE MERCHANDISE
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="p-4 bg-racing-graphite border border-racing-border flex gap-4 relative group"
                >
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400'}
                    alt={item.name}
                    className="w-20 h-20 object-cover bg-black shrink-0 border border-white/10"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase tracking-tight text-white leading-tight">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs font-mono text-racing-silver mt-1">
                        <span>SIZE: <strong className="text-white">{item.size}</strong></span>
                        <span>€{item.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-racing-silver hover:text-white hover:bg-white/10 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-racing-silver hover:text-white hover:bg-white/10 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-racing-silver hover:text-racing-red transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-racing-graphite/80 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-racing-silver">
                <span>ESTIMATED TAX & SHIPPING</span>
                <span className="text-white">CALCULATED AT CHECKOUT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-display text-lg font-black uppercase">SUBTOTAL</span>
                <span className="font-mono text-xl font-bold text-racing-red">€{subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all group"
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-racing-silver/70">
                <ShieldCheck size={12} className="text-green-500" />
                <span>OFFICIAL AKR AUTHENTIC RACING MERCHANDISE</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
