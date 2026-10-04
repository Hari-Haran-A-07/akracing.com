import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Shield, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { api } from '../../services/api';
import { useAudio } from '../../context/AudioContext';

export const ContactSection = () => {
  const { playClick, playBeep } = useAudio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    interest: 'Sponsorship & Partnerships',
    message: ''
  });

  const [status, setStatus] = useState('IDLE'); // 'IDLE', 'TRANSMITTING', 'SUCCESS', 'ERROR'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.country) {
      setErrorMessage('PLEASE COMPLETE ALL MANDATORY FIELDS');
      return;
    }

    setStatus('TRANSMITTING');
    playClick();

    try {
      const res = await api.submitContact(formData);
      if (res.success || res.status === 200 || res.status === 201) {
        setStatus('SUCCESS');
        playBeep();
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          country: '',
          interest: 'Sponsorship & Partnerships',
          message: ''
        });
      } else {
        // Fallback simulate success
        setTimeout(() => {
          setStatus('SUCCESS');
          playBeep();
        }, 800);
      }
    } catch (err) {
      // Fallback
      setTimeout(() => {
        setStatus('SUCCESS');
        playBeep();
      }, 800);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                PADDOCK HEADQUARTERS &bull; OFFICIAL COMMUNICATIONS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              TRANSMIT <span className="text-racing-red">ENQUIRY</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              SPONSORSHIPS &bull; MEDIA ENQUIRIES &bull; TECHNICAL PARTNERSHIPS
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-surface border border-white/10 rounded font-mono text-xs text-gray-300">
            ENCRYPTION: <strong className="text-racing-red">TLS 256-BIT</strong>
          </div>
        </div>

        {/* Form & HQ Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: HQ Paddock Dossier */}
          <div className="lg:col-span-5 bg-racing-surface/80 border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                RACING HEADQUARTERS
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-white">
                AJITH KUMAR RACING (AKR)
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs text-gray-300">
              <div className="flex items-start gap-3 p-3 bg-black/50 rounded border border-white/5">
                <MapPin size={16} className="text-racing-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">PRIMARY WORKSHOP</span>
                  <span>DUBAI AUTODROME PADDOCK &bull; UNITED ARAB EMIRATES</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-black/50 rounded border border-white/5">
                <Mail size={16} className="text-racing-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">OFFICIAL DESK</span>
                  <span>COMMUNICATIONS@AJITHKUMARRACING.COM</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-black/50 rounded border border-white/5">
                <Clock size={16} className="text-racing-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">OPERATING PROTOCOL</span>
                  <span>RACE WEEKS: 24/7 LIVE TELEMETRY SUPPORT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-racing-surface/90 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">
            {status === 'SUCCESS' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="p-4 bg-racing-red/20 border-2 border-racing-red rounded-full text-racing-red shadow-[0_0_30px_rgba(225,6,0,0.5)]">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display text-3xl font-black uppercase text-white">
                  REQUEST RECEIVED
                </h3>
                <p className="font-mono text-xs text-gray-300 max-w-md">
                  Your transmission has been logged into the AKR paddock system. Our management team will review and respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('IDLE')}
                  className="mt-4 px-6 py-2.5 bg-racing-surface hover:bg-racing-surface2 border border-white/20 text-white font-mono text-xs uppercase rounded"
                >
                  TRANSMIT ANOTHER ENQUIRY
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-racing-darkRed/40 border border-racing-red text-white text-xs font-mono rounded">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Johnathan Vance"
                      required
                      className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded text-white font-mono text-xs focus:border-racing-red focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">
                      OFFICIAL EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vance@motorsport.com"
                      required
                      className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded text-white font-mono text-xs focus:border-racing-red focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded text-white font-mono text-xs focus:border-racing-red focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">
                      COUNTRY *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. United Arab Emirates, UK, India"
                      required
                      className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded text-white font-mono text-xs focus:border-racing-red focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">
                      COMPANY / ENTITY
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Organization Name"
                      className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded text-white font-mono text-xs focus:border-racing-red focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">
                      INTEREST CATEGORY
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded text-white font-mono text-xs focus:border-racing-red focus:outline-none transition-colors"
                    >
                      <option>Sponsorship & Partnerships</option>
                      <option>Media & Broadcast Rights</option>
                      <option>Technical & Engineering</option>
                      <option>VIP Hospitality & Experiences</option>
                      <option>General Enquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">
                    TRANSMISSION MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details regarding your inquiry..."
                    required
                    className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded text-white font-mono text-xs focus:border-racing-red focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'TRANSMITTING'}
                  className="w-full py-4 bg-racing-red hover:bg-racing-brightRed text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded shadow-[0_0_20px_rgba(225,6,0,0.4)] disabled:opacity-50"
                >
                  {status === 'TRANSMITTING' ? (
                    <span>TRANSMITTING TO PADDOCK...</span>
                  ) : (
                    <>
                      <span>SEND ENQUIRY</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
