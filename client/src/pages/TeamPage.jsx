import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Shield, Award, ArrowRight } from 'lucide-react';

export const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deptFilter, setDeptFilter] = useState('ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTeam = async () => {
      try {
        const res = await api.getTeam();
        if (res.success) {
          setTeam(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const filtered = team.filter((member) => {
    if (deptFilter === 'ALL') return true;
    const memberDept = (member.department || '').toUpperCase();
    const filter = deptFilter.toUpperCase();
    return memberDept === filter || memberDept.includes(filter);
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
              THE RACING ORGANIZATION
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            THE <span className="text-racing-red">TEAM</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            LEADERSHIP, PRO DRIVERS, MANAGEMENT, MARKETING, RACE ENGINEERS & STRATEGISTS
          </p>
        </div>
      </section>

      {/* Filter Department Ribbon */}
      <section className="py-6 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {['ALL', 'MANAGEMENT', 'DRIVERS', 'MARKETING', 'ENGINEERING', 'STRATEGY', 'PIT CREW', 'PERFORMANCE'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-colors ${
                deptFilter.toUpperCase() === dept.toUpperCase()
                  ? 'bg-racing-red text-white'
                  : 'bg-black/50 text-racing-silver hover:text-white border border-white/10'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((member) => (
            <div
              key={member.id}
              className="bg-racing-graphite border border-racing-border overflow-hidden flex flex-col justify-between group hover:border-racing-red transition-all duration-300 shadow-xl"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover filter contrast-110 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-racing-red text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
                  {member.department}
                </div>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-racing-silver mt-1 uppercase font-semibold">
                    {member.role}
                  </div>
                  <div className="text-[11px] font-mono text-white/50 mt-1">
                    EXPERIENCE: {member.experienceYears}
                  </div>
                  <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed mt-4">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-[11px] font-mono text-racing-red font-bold uppercase">
                    ACCOLADE: {member.accolades}
                  </div>
                  {member.quote && (
                    <div className="text-[11px] font-mono text-white/40 italic">
                      "{member.quote}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
