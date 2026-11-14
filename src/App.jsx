import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Building2, Calendar, Music, Video, Mail, Users, ArrowRight, 
  ShieldCheck, Heart, Send, CheckCircle2, Play, ExternalLink, Smartphone, Clock, MapPin, LogIn, LayoutDashboard 
} from 'lucide-react';

import About from './pages/public/About';
import EventsPage from './pages/public/EventsPage';
import MusicPage from './pages/public/MusicPage';
import SermonPage from './pages/public/SermonPage';
import Contact from './pages/public/Contact';
import MemberPortal from './pages/public/MemberPortal';
import LoginPage from './pages/public/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

function Home() {
  const [giveAmount, setGiveAmount] = useState('');
  const [givePhone, setGivePhone] = useState('');
  const [giveCategory, setGiveCategory] = useState('Tithe');
  const [stkStatus, setStkStatus] = useState(null);

  const handleGiving = (e) => {
    e.preventDefault();
    setStkStatus('initiating');
    setTimeout(() => {
      setStkStatus('success');
      setTimeout(() => {
        setStkStatus(null);
        setGiveAmount('');
        setGivePhone('');
      }, 5000);
    }, 1500);
  };

  const departments = [
    { id: 'treasury', name: 'Treasury & Stewardship', leader: 'Elder James Omondi', desc: 'Financial planning, M-Pesa tithes, offerings, and building fund allocation.' },
    { id: 'music', name: 'Music Ministry & Choirs', leader: 'Bro. Eric Otieno', desc: 'Sanctuary Choir, Youth Praise team, and sacred choral audio productions.' },
    { id: 'youth', name: 'Adventist Youth (AY)', leader: 'Elder Brian Kiptoo', desc: 'Youth empowerment, Pathfinder honors, camporees, and retreats.' },
    { id: 'education', name: 'Education Department', leader: 'Elder Okoyo', desc: 'Promoting Christian education, student mentorship, and Sabbath School.' },
    { id: 'personal-ministries', name: 'Personal Ministries', leader: 'Elder Peter Njuguna', desc: 'Community outreach, Bible studies, and neighborhood evangelism.' },
    { id: 'women', name: 'Women\'s Ministries', leader: 'Sr. Mary Akinyi', desc: 'Spiritual growth, women\'s prayer retreats, and community welfare.' },
    { id: 'health', name: 'Health Ministries', leader: 'Dr. Sarah Cherono', desc: 'Health expos, lifestyle medicine, and community medical camps.' },
    { id: 'sabbath-school', name: 'Sabbath School', leader: 'Sr. Eunice Wanjiru', desc: 'Weekly lesson study, mission stories, and age-group Bible classes.' },
    { id: 'deacons', name: 'Deaconry & Ushering', leader: 'Bro. Joseph Mwangi', desc: 'Sanctuary order, communion preparation, and member assistance.' },
    { id: 'children', name: 'Children\'s Ministries', leader: 'Sr. Grace Mbithe', desc: 'Vacation Bible School, Adventurer club, and children\'s Sabbath School.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header Navigation */}
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2.5 rounded-2xl border border-white/10 shadow">
              <Building2 className="text-amber-500" size={24} />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-white tracking-tight">Mtwapa Central SDA</h1>
              <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">Church Platform</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <Link to="/about" className="hover:text-amber-400 transition">About</Link>
            <Link to="/events" className="hover:text-amber-400 transition">Events</Link>
            <Link to="/music" className="hover:text-amber-400 transition">Music & Choirs</Link>
            <Link to="/sermons" className="hover:text-amber-400 transition">Sermons</Link>
            <Link to="/contact" className="hover:text-amber-400 transition">Contact</Link>
            <Link to="/admin" className="hover:text-amber-400 transition flex items-center gap-1 text-xs bg-white/5 px-3 py-2 rounded-xl border border-white/10">
              <LayoutDashboard size={14} /> Admin
            </Link>
            <Link to="/login" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5">
              <LogIn size={14} /> Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#071322] text-white py-24 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-6 text-center relative z-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20">
            Seventh-day Adventist Church • Kilifi South
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Rooted in Scripture, Reaching Our Community
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Welcome to Mtwapa Central SDA Church. We are a Christ-centered fellowship dedicated to worshipping God, maturing disciples, and preparing lives for Christ's second coming.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/sermons" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-2xl transition shadow-lg flex items-center gap-2">
              <Video size={18} /> Watch Live Sermons <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition border border-white/10 flex items-center gap-2">
              <LogIn size={18} /> Member Portal Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Daraja 2.0 M-Pesa Giving Widget */}
        <section className="bg-[#071322] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-amber-500/20 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Smartphone size={16} /> Safaricom Daraja 2.0 M-Pesa STK
            </span>
            <h3 className="text-3xl font-extrabold">Online Tithes, Offerings & Building Fund</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Return your tithe and offerings safely via M-Pesa STK Push directly from your phone.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>• Paybill Number: <span className="text-amber-400 font-bold">247247</span></p>
              <p>• Account Number: <span className="text-amber-400 font-bold">300250</span></p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            {stkStatus === 'success' && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3.5 rounded-xl text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 size={16} /> STK Push sent! Enter your M-Pesa PIN on your phone to complete.
              </div>
            )}

            <form onSubmit={handleGiving} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Amount (KES)</label>
                  <input 
                    type="number" 
                    placeholder="1000" 
                    value={giveAmount} 
                    onChange={(e) => setGiveAmount(e.target.value)} 
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-amber-500 text-sm" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Category</label>
                  <select 
                    value={giveCategory} 
                    onChange={(e) => setGiveCategory(e.target.value)} 
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-amber-500 text-sm"
                  >
                    <option value="Tithe">Tithe</option>
                    <option value="Offering">Offering</option>
                    <option value="Building Fund">Building Fund</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">M-Pesa Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="0712345678" 
                  value={givePhone} 
                  onChange={(e) => setGivePhone(e.target.value)} 
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-amber-500 text-sm" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={stkStatus === 'initiating'}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 text-sm"
              >
                {stkStatus === 'initiating' ? 'Initiating STK Push...' : 'Send M-Pesa STK Push'}
              </button>
            </form>
          </div>
        </section>

        {/* 10 Church Department Portals */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">MINISTRY DEPARTMENTS</span>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">Our 10 Official Church Ministries</h3>
            </div>
            <Link to="/admin" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
              Executive Oversight <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Link 
                key={dept.id} 
                to="/admin"
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition space-y-3 flex flex-col justify-between group"
              >
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-600 transition">{dept.name}</h4>
                  <p className="text-xs font-semibold text-amber-600 mt-0.5">Leader: {dept.leader}</p>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2">{dept.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Dashboard Portal</span>
                  <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#071322] text-slate-300 py-12 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Mtwapa Central Seventh-day Adventist Church. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/sermons" element={<SermonPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<MemberPortal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
