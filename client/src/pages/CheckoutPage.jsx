import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'United Kingdom',
    postalCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) return;

    setLoading(true);
    try {
      const payload = {
        customer: form,
        items,
        totalAmount: subtotal + 15, // +15 EUR express shipping
      };

      const res = await api.createOrder(payload);
      if (res.success) {
        setCompletedOrder(res.data);
        clearCart();
        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D90429', '#FFFFFF', '#0A0A0A']
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-racing-black text-white pt-28 pb-20 px-6 sm:px-12 flex items-center justify-center select-none">
        <div className="max-w-2xl w-full bg-racing-graphite border border-racing-red p-8 sm:p-12 space-y-6 text-center shadow-[0_0_40px_rgba(217,4,41,0.25)]">
          <div className="w-16 h-16 rounded-full bg-racing-red/20 border border-racing-red flex items-center justify-center mx-auto text-racing-red">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
              ORDER CONFIRMED &bull; WELCOME TO THE AKR PADDOCK
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              DISPATCH ORDER PLACED
            </h1>
            <p className="text-xs sm:text-sm text-racing-silver font-sans max-w-md mx-auto">
              Your order has been recorded in the Ajith Kumar Racing logistics center. Official team confirmation has been transmitted to <strong className="text-white">{form.email}</strong>.
            </p>
          </div>

          <div className="p-4 bg-racing-black border border-white/10 font-mono text-xs space-y-1 text-left">
            <div className="flex justify-between">
              <span className="text-racing-silver">TRACKING REFERENCE:</span>
              <span className="text-racing-red font-bold">{completedOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-racing-silver">TOTAL AMOUNT:</span>
              <span className="text-white font-bold">€{completedOrder.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-racing-silver">STATUS:</span>
              <span className="text-green-400 font-bold uppercase">{completedOrder.status}</span>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest transition-colors"
          >
            <span>RETURN TO PADDOCK HOME</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-racing-black text-white pt-32 pb-20 px-6 sm:px-12 flex items-center justify-center text-center select-none">
        <div className="space-y-6">
          <div className="font-display text-2xl font-black uppercase">YOUR CART IS EMPTY</div>
          <p className="text-xs text-racing-silver">Select team apparel from the AKR Store before proceeding to checkout.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-racing-red text-white text-xs font-mono font-bold uppercase tracking-widest"
          >
            EXPLORE STORE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 space-y-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono text-racing-silver hover:text-white uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO STORE</span>
        </Link>

        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
          PADDOCK <span className="text-racing-red">CHECKOUT</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <div className="p-8 bg-racing-graphite border border-racing-border space-y-6">
              <h3 className="font-display text-lg font-black uppercase tracking-tight text-white border-b border-white/10 pb-4">
                1. RECIPIENT & DISPATCH DETAILS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="block text-racing-silver uppercase mb-1">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="AJITH KUMAR"
                    className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>

                <div>
                  <label className="block text-racing-silver uppercase mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="vip@ajithkumarracing.com"
                    className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>

                <div>
                  <label className="block text-racing-silver uppercase mb-1">PHONE NUMBER</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+44 7911 123456"
                    className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>

                <div>
                  <label className="block text-racing-silver uppercase mb-1">DESTINATION COUNTRY</label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                  >
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Italy">Italy</option>
                    <option value="United States">United States</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-racing-silver uppercase mb-1">DELIVERY ADDRESS *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="PADDOCK SUITE 4B, SILVERSTONE CIRCUIT"
                    className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>

                <div>
                  <label className="block text-racing-silver uppercase mb-1">CITY</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Towcester"
                    className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>

                <div>
                  <label className="block text-racing-silver uppercase mb-1">POSTAL CODE</label>
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    placeholder="NN12 8TN"
                    className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-lg"
            >
              <span>{loading ? 'CONFIRMING TRANSACTION...' : 'COMPLETE DISPATCH ORDER'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-racing-graphite border border-racing-border space-y-4">
              <h3 className="font-display text-base font-black uppercase text-white border-b border-white/10 pb-3">
                ORDER SUMMARY ({items.length} ITEMS)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-mono">
                    <div>
                      <div className="text-white font-bold">{item.name}</div>
                      <div className="text-racing-silver text-[10px]">SIZE: {item.size} &bull; QTY: {item.quantity}</div>
                    </div>
                    <div className="text-white">€{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-racing-silver">
                  <span>SUBTOTAL</span>
                  <span className="text-white">€{subtotal}</span>
                </div>
                <div className="flex justify-between text-racing-silver">
                  <span>EXPRESS RACING SHIPPING</span>
                  <span className="text-white">€15.00</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-white/10">
                  <span className="font-display uppercase text-white">TOTAL</span>
                  <span className="text-racing-red">€{(subtotal + 15).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
