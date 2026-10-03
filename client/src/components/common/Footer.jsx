import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Shield, CheckCircle2, Globe, Radio } from 'lucide-react';
import { api } from '../../services/api';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      await api.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-racing-black border-t border-racing-border relative overflow-hidden select-none text-white">
      {/* Background Subtle Monogram Watermark */}
      <div className="absolute -bottom-16 right-0 text-[18vw] font-display font-black text-white/[0.015] pointer-events-none tracking-tighter leading-none">
        AKR
      </div>

      {/* Top Banner: Stay In The Race Newsletter */}
      <div className="border-b border-white/10 py-12 px-6 sm:px-12 bg-racing-graphite/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-racing-red uppercase font-bold flex items-center gap-2">
              <Radio size={14} className="animate-pulse" /> OFFICIAL TELEMETRY DISPATCHES
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
              STAY IN THE RACE
            </h3>
            <p className="text-xs text-racing-silver font-sans max-w-md">
              Receive confidential race strategy briefings, technical car upgrades, behind-the-scenes photography, and VIP ticket allocations.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-racing-red/10 border border-racing-red flex items-center gap-3 text-white">
                <CheckCircle2 size={20} className="text-racing-red shrink-0" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase">
                  YOU ARE REGISTERED ON THE AKR PADDOCK GRID. CHECK YOUR INBOX SOON.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR OFFICIAL EMAIL ADDRESS..."
                  required
                  className="flex-1 bg-racing-black border border-racing-border px-4 py-3.5 text-xs font-mono text-white placeholder:text-racing-silver/50 focus:outline-none focus:border-racing-red"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest transition-colors shrink-0"
                >
                  {loading ? 'TRANSMITTING...' : 'SUBSCRIBE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 text-xs">
        {/* Col 1: Racing */}
        <div className="space-y-4">
          <h4 className="font-mono text-[11px] font-bold tracking-widest text-racing-red uppercase">RACING</h4>
          <ul className="space-y-2.5 font-sans text-racing-silver">
            <li><Link to="/racing" className="hover:text-white transition-colors">Program Overview</Link></li>
            <li><Link to="/championships" className="hover:text-white transition-colors">24H Series 2026</Link></li>
            <li><Link to="/championships" className="hover:text-white transition-colors">European GT Cup</Link></li>
            <li><Link to="/calendar" className="hover:text-white transition-colors">Race Calendar</Link></li>
            <li><Link to="/results" className="hover:text-white transition-colors">Results Archive</Link></li>
            <li><Link to="/live" className="text-racing-red font-bold hover:underline">Live Pit Wall</Link></li>
          </ul>
        </div>

        {/* Col 2: Driver & Heritage */}
        <div className="space-y-4">
          <h4 className="font-mono text-[11px] font-bold tracking-widest text-racing-red uppercase">DRIVER</h4>
          <ul className="space-y-2.5 font-sans text-racing-silver">
            <li><Link to="/driver" className="hover:text-white transition-colors">Ajith Kumar Profile</Link></li>
            <li><Link to="/driver#philosophy" className="hover:text-white transition-colors">Racing Philosophy</Link></li>
            <li><Link to="/driver#timeline" className="hover:text-white transition-colors">Career Timeline</Link></li>
            <li><Link to="/heritage" className="hover:text-white transition-colors">AKR Heritage</Link></li>
            <li><Link to="/stories/carbon-and-sweat-the-human-engine" className="hover:text-white transition-colors">Physiological Training</Link></li>
          </ul>
        </div>

        {/* Col 3: The Machine */}
        <div className="space-y-4">
          <h4 className="font-mono text-[11px] font-bold tracking-widest text-racing-red uppercase">THE MACHINE</h4>
          <ul className="space-y-2.5 font-sans text-racing-silver">
            <li><Link to="/cars/akr-gt3-01" className="hover:text-white transition-colors">AKR GT3-01 Spec</Link></li>
            <li><Link to="/cars/akr-gt4-cup" className="hover:text-white transition-colors">AKR GT4 Challenge</Link></li>
            <li><Link to="/cars#360" className="hover:text-white transition-colors">360° Vehicle Viewer</Link></li>
            <li><Link to="/technology#aero" className="hover:text-white transition-colors">CFD Aerodynamics</Link></li>
            <li><Link to="/technology#telemetry" className="hover:text-white transition-colors">Motec Telemetry</Link></li>
          </ul>
        </div>

        {/* Col 4: Technology */}
        <div className="space-y-4">
          <h4 className="font-mono text-[11px] font-bold tracking-widest text-racing-red uppercase">TECHNOLOGY</h4>
          <ul className="space-y-2.5 font-sans text-racing-silver">
            <li><Link to="/technology" className="hover:text-white transition-colors">Engineering Center</Link></li>
            <li><Link to="/technology#simulation" className="hover:text-white transition-colors">Motion Simulator</Link></li>
            <li><Link to="/technology#telemetry" className="hover:text-white transition-colors">Data Systems</Link></li>
            <li><Link to="/stories/telemetry-the-language-of-speed" className="hover:text-white transition-colors">Telemetry Deep-Dive</Link></li>
          </ul>
        </div>

        {/* Col 5: Editorial & Media */}
        <div className="space-y-4">
          <h4 className="font-mono text-[11px] font-bold tracking-widest text-racing-red uppercase">EDITORIAL</h4>
          <ul className="space-y-2.5 font-sans text-racing-silver">
            <li><Link to="/news" className="hover:text-white transition-colors">Latest News</Link></li>
            <li><Link to="/stories" className="hover:text-white transition-colors">Magazine Stories</Link></li>
            <li><Link to="/media" className="hover:text-white transition-colors">Photo & Video Hub</Link></li>
            <li><Link to="/team" className="hover:text-white transition-colors">Team & Engineers</Link></li>
            <li><Link to="/partners" className="hover:text-white transition-colors">Official Partners</Link></li>
          </ul>
        </div>

        {/* Col 6: Paddock & Shop */}
        <div className="space-y-4">
          <h4 className="font-mono text-[11px] font-bold tracking-widest text-racing-red uppercase">EXPERIENCES</h4>
          <ul className="space-y-2.5 font-sans text-racing-silver">
            <li><Link to="/experiences" className="hover:text-white transition-colors">VIP Paddock Club</Link></li>
            <li><Link to="/experiences" className="hover:text-white transition-colors">Track Day Masterclass</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Official Store</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Sponsorship Desk</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1"><Shield size={10}/> Admin Portal</Link></li>
          </ul>
        </div>
      </div>

      {/* Large Brand Typography */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            AJITH KUMAR <span className="text-racing-red">RACING</span>
          </div>
          <div className="text-[11px] font-mono tracking-[0.3em] text-racing-silver mt-1">
            RACING. PERFORMANCE. PRECISION.
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {[
            { name: "INSTAGRAM", href: "https://instagram.com" },
            { name: "YOUTUBE", href: "https://youtube.com" },
            { name: "X", href: "https://x.com" },
            { name: "LINKEDIN", href: "https://linkedin.com" }
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono tracking-widest text-racing-silver hover:text-racing-red transition-colors flex items-center gap-1 border border-white/10 px-3 py-1.5 hover:border-racing-red"
            >
              <span>{social.name}</span>
              <ArrowUpRight size={10} />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Legal Copyright */}
      <div className="border-t border-white/5 py-6 px-6 sm:px-12 bg-black text-[10px] font-mono text-racing-silver/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} AJITH KUMAR RACING (AKR). ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white">LEGAL NOTICE</Link>
            <Link to="/contact" className="hover:text-white">PRIVACY POLICY</Link>
            <Link to="/contact" className="hover:text-white">COOKIE SETTINGS</Link>
            <Link to="/contact" className="hover:text-white">FIA HOMOLOGATION</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
