import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Radio } from 'lucide-react';

export const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    try {
      const res = await api.sendMessage(form);
      if (res.success) {
        setSuccessMsg(res.message || 'Your message has reached Ajith Kumar Racing headquarters.');
        setForm({ name: '', email: '', phone: '', category: 'General', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Hero */}
      <section className="py-20 px-6 sm:px-12 border-b border-racing-border relative overflow-hidden">
        <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-racing-red" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
              COMMUNICATIONS & OPERATIONS DESK
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            CONTACT <span className="text-racing-red">AKR</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            SPONSORSHIP, MEDIA ACCREDITATION, VIP HOSPITALITY & RACING PROGRAM INQUIRIES
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
                HEADQUARTERS & TECHNICAL BASES
              </span>
              <h2 className="font-display text-3xl font-black uppercase text-white">
                AJITH KUMAR RACING HEADQUARTERS
              </h2>
            </div>

            <div className="space-y-6 font-mono text-xs">
              <div className="p-6 bg-racing-black border border-racing-border space-y-2">
                <div className="text-racing-red font-bold flex items-center gap-2">
                  <MapPin size={14} /> MIDDLE EAST OPERATIONS BASE
                </div>
                <div className="text-white">Dubai Autodrome Circuit Tech Park, Motor City, Dubai, UAE</div>
                <div className="text-racing-silver text-[11px]">Primary GT3 Endurance Engineering Facility</div>
              </div>

              <div className="p-6 bg-racing-black border border-racing-border space-y-2">
                <div className="text-racing-red font-bold flex items-center gap-2">
                  <MapPin size={14} /> INDIA MOTORSPORT HEADQUARTERS
                </div>
                <div className="text-white">Madras International Circuit Hub, Irungattukottai, Chennai, India</div>
                <div className="text-racing-silver text-[11px]">Driver Development & Sim Lab</div>
              </div>

              <div className="p-6 bg-racing-black border border-racing-border space-y-2">
                <div className="text-racing-red font-bold flex items-center gap-2">
                  <Mail size={14} /> OFFICIAL CHANNELS
                </div>
                <div className="text-white">sponsorship@ajithkumarracing.com</div>
                <div className="text-white">media@ajithkumarracing.com</div>
                <div className="text-white">operations@ajithkumarracing.com</div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-racing-black border border-racing-border shadow-2xl space-y-6">
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white border-b border-white/10 pb-4">
                TRANSMIT DISPATCH
              </h3>

              {successMsg && (
                <div className="p-4 bg-racing-red/10 border border-racing-red flex items-center gap-3 text-white">
                  <CheckCircle2 size={20} className="text-racing-red shrink-0" />
                  <span className="text-xs font-mono font-bold">{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-racing-silver uppercase mb-1">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ajith Kumar"
                      className="w-full bg-racing-graphite border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                    />
                  </div>

                  <div>
                    <label className="block text-racing-silver uppercase mb-1">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="corporate@organization.com"
                      className="w-full bg-racing-graphite border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-racing-silver uppercase mb-1">PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 / +971"
                      className="w-full bg-racing-graphite border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                    />
                  </div>

                  <div>
                    <label className="block text-racing-silver uppercase mb-1">INQUIRY CATEGORY *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-racing-graphite border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                    >
                      <option value="General">General Inquiries</option>
                      <option value="Sponsorship">Sponsorship & Partnerships</option>
                      <option value="Media">Media & Press Accreditation</option>
                      <option value="Racing">Racing Program & Driver Inquiries</option>
                      <option value="Hospitality">VIP Paddock Hospitality</option>
                      <option value="Careers">Engineering & Mechanic Careers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-racing-silver uppercase mb-1">CONFIDENTIAL MESSAGE *</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Enter the details of your inquiry..."
                    className="w-full bg-racing-graphite border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <span>{loading ? 'TRANSMITTING DISPATCH...' : 'SEND OFFICIAL INQUIRY'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
