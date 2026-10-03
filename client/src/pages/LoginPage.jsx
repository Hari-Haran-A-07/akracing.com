import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('admin@ajithkumarracing.com');
  const [password, setPassword] = useState('akr2026');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Authentication rejected');
    }
  };

  const handleDemoAdmin = async () => {
    setEmail('admin@ajithkumarracing.com');
    setPassword('akr2026');
    const res = await login('admin@ajithkumarracing.com', 'akr2026');
    if (res.success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-racing-black text-white pt-28 pb-20 px-6 sm:px-12 flex items-center justify-center select-none">
      <div className="max-w-md w-full bg-racing-graphite border border-racing-border p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Accent Red Corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-racing-red/20 rotate-45 translate-x-8 -translate-y-8" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 border border-racing-red rotate-45 flex items-center justify-center bg-black mx-auto mb-4">
            <span className="-rotate-45 font-display font-black text-sm">AKR</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            PADDOCK <span className="text-racing-red">PORTAL</span>
          </h1>
          <p className="text-xs font-mono text-racing-silver uppercase tracking-widest">
            AUTHENTICATED RACE DIRECTOR & MEMBER ACCESS
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-900/30 border border-racing-red text-racing-red text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-racing-silver uppercase mb-1">EMAIL ADDRESS</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
            />
          </div>

          <div>
            <label className="block text-racing-silver uppercase mb-1">PASSWORD / ACCESS KEY</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-racing-black border border-racing-border px-4 py-3 text-white focus:outline-none focus:border-racing-red"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <Lock size={14} />
            <span>{isLoading ? 'AUTHENTICATING...' : 'ACCESS CONTROL ROOM'}</span>
          </button>
        </form>

        {/* 1-Click Master Access */}
        <div className="pt-4 border-t border-white/10 space-y-3 text-center">
          <button
            onClick={handleDemoAdmin}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Shield size={14} className="text-racing-red" />
            <span>1-CLICK RACE DIRECTOR ACCESS</span>
          </button>
          <div className="text-[10px] font-mono text-racing-silver/60">
            ADMIN CREDENTIALS: admin@ajithkumarracing.com / akr2026
          </div>
        </div>
      </div>
    </div>
  );
};
