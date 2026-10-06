import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  Shield,
  Activity,
  FileText,
  Calendar,
  Car,
  ShoppingBag,
  Mail,
  Users,
  Radio,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Zap,
  Layers,
  Cpu
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'news', 'races', 'cars', 'orders', 'messages', 'telemetry'
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Entities for management
  const [newsList, setNewsList] = useState([]);
  const [racesList, setRacesList] = useState([]);
  const [carsList, setCarsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [liveTelemetry, setLiveTelemetry] = useState(null);

  // Form states
  const [newArticle, setNewArticle] = useState({ title: '', category: 'Racing', excerpt: '', content: '', coverImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=800' });
  const [newRace, setNewRace] = useState({ round: 'ROUND 07', title: '', circuit: '', country: '', date: '', trackLength: '5.0 KM', status: 'upcoming' });
  const [statusMsg, setStatusMsg] = useState('');

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [mRes, nRes, rRes, cRes, oRes, msgRes, telRes] = await Promise.all([
        api.getAdminMetrics(),
        api.getNews(),
        api.getRaces(),
        api.getCars(),
        api.getOrders(),
        api.getMessages(),
        api.getLiveTelemetry()
      ]);

      if (mRes.success) setMetrics(mRes.data);
      if (nRes.success) setNewsList(nRes.data);
      if (rRes.success) setRacesList(rRes.data);
      if (cRes.success) setCarsList(cRes.data);
      if (oRes.success) setOrdersList(oRes.data);
      if (msgRes.success) setMessagesList(msgRes.data);
      if (telRes.success) setLiveTelemetry(telRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }
    loadAllAdminData();
  }, [isAdmin]);

  const handleCreateNews = async (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) return;
    try {
      const res = await api.createNews(newArticle);
      if (res.success) {
        setStatusMsg('News article published to AKR Dispatches.');
        setNewArticle({ title: '', category: 'Racing', excerpt: '', content: '', coverImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=800' });
        loadAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNews = async (id) => {
    if (confirm('Delete article from dispatches?')) {
      await api.deleteNews(id);
      loadAllAdminData();
    }
  };

  const handleCreateRace = async (e) => {
    e.preventDefault();
    if (!newRace.title || !newRace.circuit) return;
    try {
      const res = await api.createRace(newRace);
      if (res.success) {
        setStatusMsg('Race event logged in official AKR calendar.');
        setNewRace({ round: 'ROUND 07', title: '', circuit: '', country: '', date: '', trackLength: '5.0 KM', status: 'upcoming' });
        loadAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-8">
        {/* Top Control Room Bar */}
        <div className="p-6 bg-racing-graphite border border-racing-red flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-racing-red text-white">
              <Shield size={22} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                AJITH KUMAR RACING &bull; MASTER CONTROL ROOM
              </span>
              <h1 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                RACE DIRECTOR DASHBOARD
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <button
              onClick={loadAllAdminData}
              className="p-2 border border-white/20 hover:border-white text-racing-silver hover:text-white transition-colors flex items-center gap-1.5"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>SYNC</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-4 py-2 bg-white/10 hover:bg-racing-red text-white transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="p-4 bg-racing-red/10 border border-racing-red flex items-center justify-between text-xs font-mono text-white">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-racing-red" />
              <span>{statusMsg}</span>
            </div>
            <button onClick={() => setStatusMsg('')} className="text-racing-silver hover:text-white">DISMISS</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-racing-border pb-2 font-mono text-xs font-bold uppercase">
          {[
            { id: 'overview', label: 'SYSTEM OVERVIEW', icon: Activity },
            { id: 'polyglot', label: 'POLYGLOT OS (11-LANG)', icon: Cpu },
            { id: 'news', label: 'EDITORIAL NEWS', icon: FileText },
            { id: 'races', label: 'RACE CALENDAR', icon: Calendar },
            { id: 'cars', label: 'RACING FLEET', icon: Car },
            { id: 'orders', label: 'SHOP ORDERS', icon: ShoppingBag },
            { id: 'messages', label: 'INQUIRIES', icon: Mail }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-racing-red text-white shadow-lg'
                    : 'bg-racing-graphite text-racing-silver hover:text-white border border-racing-border'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Counts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 font-mono text-xs">
              <div className="p-4 bg-racing-graphite border border-white/10">
                <span className="text-[10px] text-racing-silver uppercase">DATABASE STORAGE</span>
                <div className="font-display text-xl font-bold text-racing-red mt-1">ONLINE</div>
                <span className="text-[9px] text-racing-silver">RESILIENT HYBRID ENGINE</span>
              </div>
              <div className="p-4 bg-racing-graphite border border-white/10">
                <span className="text-[10px] text-racing-silver uppercase">RACING CARS</span>
                <div className="font-display text-3xl font-black text-white mt-1">{metrics?.counts?.cars || 2}</div>
              </div>
              <div className="p-4 bg-racing-graphite border border-white/10">
                <span className="text-[10px] text-racing-silver uppercase">CALENDAR RACES</span>
                <div className="font-display text-3xl font-black text-white mt-1">{metrics?.counts?.races || 6}</div>
              </div>
              <div className="p-4 bg-racing-graphite border border-white/10">
                <span className="text-[10px] text-racing-silver uppercase">NEWS ARTICLES</span>
                <div className="font-display text-3xl font-black text-white mt-1">{metrics?.counts?.news || 4}</div>
              </div>
              <div className="p-4 bg-racing-graphite border border-white/10">
                <span className="text-[10px] text-racing-silver uppercase">STORE ORDERS</span>
                <div className="font-display text-3xl font-black text-racing-red mt-1">{ordersList.length}</div>
              </div>
              <div className="p-4 bg-racing-graphite border border-white/10">
                <span className="text-[10px] text-racing-silver uppercase">INCOMING MESSAGES</span>
                <div className="font-display text-3xl font-black text-white mt-1">{messagesList.length}</div>
              </div>
            </div>

            {/* Quick Live Telemetry Preview */}
            {liveTelemetry && (
              <div className="p-6 bg-racing-graphite border border-racing-border space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-racing-red font-bold uppercase flex items-center gap-2">
                    <Radio size={14} className="animate-pulse" /> LIVE TELEMETRY SIMULATOR BROADCASTER
                  </span>
                  <Link to="/live" className="text-xs font-mono text-white hover:underline">
                    VIEW PUBLIC STREAM &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div>DRIVER: <strong className="text-white">{liveTelemetry.driver}</strong></div>
                  <div>CAR: <strong className="text-racing-red">{liveTelemetry.car}</strong></div>
                  <div>SPEED: <strong className="text-white">{liveTelemetry.currentSpeed} KM/H</strong></div>
                  <div>POSITION: <strong className="text-white">P{liveTelemetry.currentPosition}</strong></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Polyglot OS & Automation */}
        {activeTab === 'polyglot' && (
          <div className="space-y-6">
            <div className="p-6 bg-racing-graphite border border-racing-red/30 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-white">
                    AKR 11-LANGUAGE POLYGLOT GRID ORCHESTRATOR
                  </h3>
                  <p className="text-xs font-mono text-racing-silver mt-1">
                    TypeScript • JavaScript • Java • Go • C# • Python • Rust • Kotlin • PHP • Ruby • SQL
                  </p>
                </div>
                <Link
                  to="/engineering-suite"
                  className="px-5 py-2.5 bg-racing-red hover:bg-racing-crimson text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Cpu size={14} /> OPEN FULL ENGINEERING SUITE &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
                {[
                  { l: 'Go (Golang)', s: '100k pkts/s', st: 'ONLINE' },
                  { l: 'Rust (WASM)', s: '14 μs Physics', st: 'ONLINE' },
                  { l: 'Python 3.13', s: 'AI Degradation', st: 'ONLINE' },
                  { l: 'C# (.NET 8)', s: 'CAN M1 Decoder', st: 'ONLINE' },
                  { l: 'Java 17', s: 'FIA Homologation', st: 'ONLINE' },
                  { l: 'SQL (Timeseries)', s: '0.9ms Queries', st: 'ONLINE' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-black/40 border border-white/10 rounded">
                    <span className="text-[10px] text-racing-silver">{item.l}</span>
                    <div className="text-sm font-bold text-white mt-1">{item.s}</div>
                    <span className="text-[9px] text-emerald-400 font-bold mt-1 inline-block">● {item.st}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: News Management */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create News Form */}
            <form onSubmit={handleCreateNews} className="lg:col-span-5 p-6 bg-racing-graphite border border-racing-border space-y-4 font-mono text-xs">
              <h3 className="font-display text-lg font-black uppercase text-white border-b border-white/10 pb-3">
                PUBLISH OFFICIAL DISPATCH
              </h3>
              <div>
                <label className="block text-racing-silver uppercase mb-1">HEADLINE *</label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="e.g. MONZA QUALIFYING REPORT"
                  className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                />
              </div>
              <div>
                <label className="block text-racing-silver uppercase mb-1">CATEGORY</label>
                <select
                  value={newArticle.category}
                  onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                  className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                >
                  <option value="Racing">Racing</option>
                  <option value="Technology">Technology</option>
                  <option value="Driver">Driver</option>
                  <option value="Team">Team</option>
                </select>
              </div>
              <div>
                <label className="block text-racing-silver uppercase mb-1">EXCERPT</label>
                <textarea
                  rows={2}
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  placeholder="Short brief overview..."
                  className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                />
              </div>
              <div>
                <label className="block text-racing-silver uppercase mb-1">FULL ARTICLE CONTENT *</label>
                <textarea
                  rows={5}
                  required
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  placeholder="Full editorial dispatch..."
                  className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Plus size={14} />
                <span>PUBLISH DISPATCH</span>
              </button>
            </form>

            {/* List News */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-display text-lg font-black uppercase text-white">CURRENT DISPATCHES ({newsList.length})</h3>
              {newsList.map((item) => (
                <div key={item.id} className="p-4 bg-racing-graphite border border-racing-border flex items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-racing-red uppercase font-bold">{item.category}</span>
                    <h4 className="font-display text-base font-bold uppercase text-white mt-0.5">{item.title}</h4>
                    <span className="text-[10px] text-racing-silver">{item.publishDate}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="p-2 text-racing-silver hover:text-racing-red transition-colors"
                    title="Delete article"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Race Calendar Management */}
        {activeTab === 'races' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleCreateRace} className="lg:col-span-5 p-6 bg-racing-graphite border border-racing-border space-y-4 font-mono text-xs">
              <h3 className="font-display text-lg font-black uppercase text-white border-b border-white/10 pb-3">
                ADD RACE EVENT
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-racing-silver uppercase mb-1">ROUND *</label>
                  <input
                    type="text"
                    required
                    value={newRace.round}
                    onChange={(e) => setNewRace({ ...newRace, round: e.target.value })}
                    className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>
                <div>
                  <label className="block text-racing-silver uppercase mb-1">COUNTRY *</label>
                  <input
                    type="text"
                    required
                    value={newRace.country}
                    onChange={(e) => setNewRace({ ...newRace, country: e.target.value })}
                    placeholder="ITALY"
                    className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                  />
                </div>
              </div>
              <div>
                <label className="block text-racing-silver uppercase mb-1">EVENT TITLE *</label>
                <input
                  type="text"
                  required
                  value={newRace.title}
                  onChange={(e) => setNewRace({ ...newRace, title: e.target.value })}
                  placeholder="12H MONZA 2026"
                  className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                />
              </div>
              <div>
                <label className="block text-racing-silver uppercase mb-1">CIRCUIT NAME *</label>
                <input
                  type="text"
                  required
                  value={newRace.circuit}
                  onChange={(e) => setNewRace({ ...newRace, circuit: e.target.value })}
                  placeholder="Autodromo Nazionale Monza"
                  className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                />
              </div>
              <div>
                <label className="block text-racing-silver uppercase mb-1">EVENT DATE *</label>
                <input
                  type="text"
                  required
                  value={newRace.date}
                  onChange={(e) => setNewRace({ ...newRace, date: e.target.value })}
                  placeholder="May 22 - 24, 2026"
                  className="w-full bg-racing-black border border-racing-border px-3 py-2 text-white focus:outline-none focus:border-racing-red"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Plus size={14} />
                <span>SAVE RACE EVENT</span>
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-display text-lg font-black uppercase text-white">CALENDAR SCHEDULE ({racesList.length})</h3>
              {racesList.map((race) => (
                <div key={race.id} className="p-4 bg-racing-graphite border border-racing-border flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-white font-bold">{race.round} &bull; {race.country}</span>
                    <h4 className="font-display text-base font-bold uppercase text-white">{race.title}</h4>
                    <span className="text-[10px] text-racing-silver">{race.date} &bull; {race.circuit}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-black text-racing-red border border-racing-red/30">
                    {race.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Fleet */}
        {activeTab === 'cars' && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-black uppercase text-white">HOMOLOGATED CARS ({carsList.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carsList.map((car) => (
                <div key={car.id} className="p-6 bg-racing-graphite border border-racing-border space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-racing-red font-bold uppercase">{car.class}</span>
                    <span>{car.season} SEASON</span>
                  </div>
                  <h4 className="font-display text-2xl font-black uppercase text-white">{car.name}</h4>
                  <div className="p-3 bg-black border border-white/5 space-y-1 text-racing-silver">
                    <div>POWER: <strong className="text-white">{car.specs?.power}</strong></div>
                    <div>WEIGHT: <strong className="text-white">{car.specs?.weight}</strong></div>
                    <div>TOP SPEED: <strong className="text-racing-red">{car.specs?.topSpeed}</strong></div>
                  </div>
                  <Link to={`/cars/${car.id}`} className="block text-center py-2 bg-white/5 hover:bg-white/10 text-white font-bold uppercase transition-colors">
                    INSPECT VEHICLE DOSSIER
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Shop Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4 font-mono text-xs">
            <h3 className="font-display text-lg font-black uppercase text-white">LOGGED CUSTOMER ORDERS ({ordersList.length})</h3>
            {ordersList.length === 0 ? (
              <div className="p-8 bg-racing-graphite text-center text-racing-silver">
                NO ORDERS RECORDED YET. ORDERS FROM /checkout WILL APPEAR HERE INSTANTLY.
              </div>
            ) : (
              ordersList.map((order) => (
                <div key={order.id} className="p-6 bg-racing-graphite border border-racing-border space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-racing-red font-bold">TRACKING: {order.trackingNumber}</span>
                    <span className="text-white font-bold">TOTAL: €{order.totalAmount}</span>
                  </div>
                  <div className="text-white">CUSTOMER: {order.customer?.name} ({order.customer?.email})</div>
                  <div className="text-racing-silver text-[11px]">DISPATCH ADDRESS: {order.customer?.address}, {order.customer?.city}, {order.customer?.country}</div>
                  <div className="text-green-400 font-bold uppercase">STATUS: {order.status}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 6: Inquiries */}
        {activeTab === 'messages' && (
          <div className="space-y-4 font-mono text-xs">
            <h3 className="font-display text-lg font-black uppercase text-white">INCOMING DISPATCHES ({messagesList.length})</h3>
            {messagesList.map((msg) => (
              <div key={msg.id} className="p-6 bg-racing-graphite border border-racing-border space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-racing-red font-bold">CATEGORY: {msg.category}</span>
                  <span className="text-racing-silver">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <div className="text-white font-bold">{msg.name} ({msg.email} &bull; {msg.phone})</div>
                <p className="text-racing-silver/90 font-sans text-xs bg-black/50 p-3 border border-white/5 whitespace-pre-line">
                  "{msg.message}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
