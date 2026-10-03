import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Zap, Trophy, Gauge, Flag } from 'lucide-react';

export const MegaMenu = ({ category, onClose }) => {
  const menuData = {
    RACING: {
      title: "RACING OPERATIONS & PROGRAMS",
      description: "Compete at the limit of grip, strategy, and mechanical endurance in international GT championships.",
      featured: {
        title: "2026 24H Series Campaign",
        tag: "FLAGSHIP PROGRAM",
        image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=600&auto=format&fit=crop",
        link: "/racing"
      },
      links: [
        { name: "Racing Program Overview", path: "/racing", desc: "Our global GT3 endurance strategy" },
        { name: "Championship Standings", path: "/championships", desc: "Current points, rounds & positions" },
        { name: "2026 Race Calendar", path: "/calendar", desc: "Upcoming European & Middle East rounds" },
        { name: "Race Results Archive", path: "/results", desc: "Telemetry logs, qualifying & podiums" },
        { name: "Live Pit Wall Stream", path: "/live", desc: "Real-time telemetry, sectors & onboard" }
      ]
    },
    DRIVER: {
      title: "AJITH KUMAR & MOTORSPORT HERITAGE",
      description: "Over two decades of national and international open-wheel and endurance racing pedigree.",
      featured: {
        title: "The Racing Philosophy",
        tag: "DRIVER PROFILE",
        image: "/images/ajith-kumar-management.jpg",
        link: "/driver"
      },
      links: [
        { name: "Ajith Kumar Profile", path: "/driver", desc: "Bio, philosophy and career statistics" },
        { name: "Interactive Timeline", path: "/driver#timeline", desc: "From Formula BMW to 24H Series" },
        { name: "Driver Biometrics & Training", path: "/stories/carbon-and-sweat-the-human-engine", desc: "High-G physiological conditioning" },
        { name: "Heritage & Milestones", path: "/heritage", desc: "Founding Ajith Kumar Racing" }
      ]
    },
    CARS: {
      title: "THE RACING MACHINES",
      description: "Homologated FIA GT3 and GT4 endurance machines precision-tuned for 24-hour reliability.",
      featured: {
        title: "AKR GT3-01 Spec",
        tag: "510 BHP / CARBON MONOCOQUE",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
        link: "/cars/akr-gt3-01"
      },
      links: [
        { name: "AKR GT3-01 Spec (Flagship)", path: "/cars/akr-gt3-01", desc: "4.0L Flat-6 Naturally Aspirated" },
        { name: "AKR GT4 Challenge", path: "/cars/akr-gt4-cup", desc: "Clubsport sprint and endurance spec" },
        { name: "Interactive 360° Viewer", path: "/cars#360", desc: "Rotate vehicle & explore telemetry hotspots" },
        { name: "Aerodynamics & Powertrain", path: "/technology", desc: "CFD wind tunnel data & telemetry" }
      ]
    },
    TECH: {
      title: "ENGINEERED FOR PERFORMANCE",
      description: "High-frequency telemetry acquisition, CFD aerodynamics, and multi-axis hardware simulation.",
      featured: {
        title: "Live Telemetry Software",
        tag: "1,000 HZ SENSORS",
        image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&auto=format&fit=crop",
        link: "/technology"
      },
      links: [
        { name: "Aerodynamics & CFD", path: "/technology#aero", desc: "Downforce balancing and vortex control" },
        { name: "Motec Live Telemetry", path: "/technology#telemetry", desc: "Tire temp, brake pressure & G-force data" },
        { name: "Driver-in-the-Loop Simulator", path: "/technology#simulation", desc: "6-DOF LiDAR circuit modeling" },
        { name: "Virtual Pit Wall", path: "/live", desc: "Real-time live race telemetry interface" }
      ]
    },
    EDITORIAL: {
      title: "NEWS, STORIES & MEDIA",
      description: "Editorial dispatches, behind-the-scenes photography, and cinematic paddock documentaries.",
      featured: {
        title: "Yas Marina Victory Dispatch",
        tag: "LATEST NEWS",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop",
        link: "/news/akr-claims-monumental-victory-at-yas-marina"
      },
      links: [
        { name: "Latest Official News", path: "/news", desc: "Race reports, technical upgrades & announcements" },
        { name: "Magazine Stories", path: "/stories", desc: "Long-form editorial essays and interviews" },
        { name: "Media Gallery", path: "/media", desc: "High-res photos and 4K race video archives" },
        { name: "Official Team Roster", path: "/team", desc: "Engineers, strategists & mechanics" }
      ]
    },
    EXPERIENCE: {
      title: "PADDOCK & VIP EXPERIENCES",
      description: "Join Ajith Kumar Racing in the garage and on the track with bespoke VIP hospitality.",
      featured: {
        title: "VIP Paddock Club Access",
        tag: "24H SERIES WEEKENDS",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop",
        link: "/experiences"
      },
      links: [
        { name: "VIP Paddock Club", path: "/experiences", desc: "Garage walk, radio headsets & driver briefing" },
        { name: "Track Day Masterclass", path: "/experiences", desc: "On-track coaching with Motec telemetry" },
        { name: "Official Merchandise Store", path: "/shop", desc: "Team apparel, caps, jackets & scale models" },
        { name: "Contact & Sponsorship Desk", path: "/contact", desc: "Partnership, media & career inquiries" }
      ]
    }
  };

  const current = menuData[category];
  if (!current) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-racing-black/95 backdrop-blur-2xl border-b border-racing-border shadow-2xl py-10 px-8 z-50 text-white animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10">
        {/* Category Description */}
        <div className="col-span-3 border-r border-white/10 pr-6">
          <span className="text-[10px] font-mono tracking-widest text-racing-red uppercase font-semibold">
            EXPLORE {category}
          </span>
          <h3 className="font-display text-2xl font-black uppercase tracking-tight mt-2 mb-3">
            {current.title}
          </h3>
          <p className="text-xs text-racing-silver leading-relaxed font-sans mb-6">
            {current.description}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <span className="w-1.5 h-1.5 bg-racing-red rounded-full" />
            <span>AKR OFFICIAL PLATFORM</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="col-span-5 grid grid-cols-1 gap-2">
          {current.links.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={onClose}
              className="group p-3 rounded-none border border-transparent hover:border-racing-red/30 hover:bg-white/[0.03] transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold tracking-wide text-white group-hover:text-racing-red transition-colors uppercase font-display flex items-center gap-2">
                  <span className="text-xs font-mono text-racing-silver/50 group-hover:text-racing-red">0{idx + 1}</span>
                  {link.name}
                </div>
                <div className="text-xs text-racing-silver/70 font-sans mt-0.5">
                  {link.desc}
                </div>
              </div>
              <ArrowRight size={14} className="text-white/20 group-hover:text-racing-red group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Featured Card */}
        <div className="col-span-4 pl-4">
          <Link
            to={current.featured.link}
            onClick={onClose}
            className="group block relative overflow-hidden h-full border border-white/10 hover:border-racing-red transition-all"
          >
            <img
              src={current.featured.image}
              alt={current.featured.title}
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-5 flex flex-col justify-end">
              <span className="text-[10px] font-mono tracking-widest text-racing-red uppercase font-bold">
                {current.featured.tag}
              </span>
              <h4 className="font-display text-lg font-bold uppercase text-white mt-1 group-hover:text-racing-red transition-colors flex items-center justify-between">
                {current.featured.title}
                <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
              </h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
