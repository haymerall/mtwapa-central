import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Play, ArrowRight, Clock, Menu, X, Calendar, 
  Users, BookOpen, Heart, MapPin, DollarSign, Smartphone, CheckCircle2, Music,
  Shield, Activity, Coins, Radio
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [givingTab, setGivingTab] = useState('tithe');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleMpesaSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b]/90 backdrop-blur p-2.5 rounded-xl border border-white/10 shadow-lg">
              <Building2 className="text-amber-500" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide text-white">Mtwapa Central SDA</h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">CHURCH PLATFORM</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
            <a href="#home" className="text-white hover:text-amber-400 transition">Home</a>
            <Link to="/about" className="hover:text-white transition">About</Link>
            <Link to="/ministries" className="hover:text-white transition">Ministries</Link>
            <Link to="/events" className="hover:text-white transition">Events</Link>
            <Link to="/music" className="hover:text-white transition">Music</Link>
            <a href="#giving" className="hover:text-white transition">Giving</a>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <Link to="/portal" className="text-sm font-medium text-slate-200 hover:text-white transition">
              Sign in
            </Link>
            <Link to="/portal" className="bg-[#c29b38] hover:bg-[#b08a2f] text-slate-950 font-bold text-sm px-5 py-2.5 rounded-lg shadow-md transition">
              Member Portal
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-6 space-y-4 text-slate-200">
            <a href="#home" className="block hover:text-white font-medium">Home</a>
            <Link to="/about" className="block hover:text-white font-medium">About</Link>
            <Link to="/ministries" className="block hover:text-white font-medium">Ministries</Link>
            <Link to="/events" className="block hover:text-white font-medium">Events</Link>
            <Link to="/music" className="block hover:text-white font-medium">Music</Link>
            <a href="#giving" className="block hover:text-white font-medium">Giving</a>
            <Link to="/contact" className="block hover:text-white font-medium">Contact</Link>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link to="/portal" className="text-center py-2.5 font-medium border border-slate-700 rounded-lg">Sign in</Link>
              <Link to="/portal" className="bg-[#c29b38] text-slate-950 text-center font-bold py-2.5 rounded-lg">Member Portal</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Header */}
      <section id="home" className="relative min-h-[78vh] flex flex-col justify-end bg-[#071322] pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/70 to-[#0B1B30]/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2000" 
            alt="Mtwapa Central Congregation" 
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
        </div>

        <div className="max-w-7xl w-full mx-auto relative z-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-800/70 backdrop-blur border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-medium text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Mtwapa Central Seventh-day Adventist Church · Kilifi South
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08]">
            A community of faith, hope & love
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            We are a Seventh-day Adventist family worshiping, growing, and serving together in Mtwapa, Kilifi South. Wherever you are on your spiritual journey, there's a home for you here.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/portal" className="bg-[#c29b38] hover:bg-[#b08a2f] text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2.5">
              Plan your visit <ArrowRight size={18} />
            </Link>
            <a href="#giving" className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition flex items-center gap-2.5">
              <DollarSign size={18} className="text-emerald-400" /> Give Tithe & Offerings
            </a>
          </div>
        </div>
      </section>

      {/* Service Schedule Bar */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 -mt-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-100 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition">
            <div className="bg-slate-100 p-3 rounded-xl text-slate-700 mt-0.5"><Clock size={20} /></div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sabbath · 9:00 AM</p>
              <h3 className="font-bold text-slate-900 text-lg">Sabbath School</h3>
            </div>
          </div>
          <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition">
            <div className="bg-slate-100 p-3 rounded-xl text-slate-700 mt-0.5"><Clock size={20} /></div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sabbath · 11:00 AM</p>
              <h3 className="font-bold text-slate-900 text-lg">Divine Worship</h3>
            </div>
          </div>
          <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition">
            <div className="bg-slate-100 p-3 rounded-xl text-slate-700 mt-0.5"><Clock size={20} /></div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Wednesday · 6:00 PM</p>
              <h3 className="font-bold text-slate-900 text-lg">Prayer Meeting</h3>
            </div>
          </div>
          <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition">
            <div className="bg-slate-100 p-3 rounded-xl text-slate-700 mt-0.5"><Clock size={20} /></div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Friday · 6:30 PM</p>
              <h3 className="font-bold text-slate-900 text-lg">Vespers</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Ministries Grid on Landing */}
      <section id="ministries" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">GET INVOLVED</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Ministries for every season of life</h2>
          </div>
          <Link to="/ministries" className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            View All 10 Departments &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"><BookOpen size={22} /></div>
            <h3 className="text-xl font-bold text-slate-900">Sabbath School</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Systematic Bible study and quarterly lesson discussions.</p>
            <p className="text-xs font-semibold text-slate-400">Sabbath 9:00 AM</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold"><Users size={22} /></div>
            <h3 className="text-xl font-bold text-slate-900">Adventist Youth (AY)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Leadership, outdoor camps, and Pathfinder honors for youth.</p>
            <p className="text-xs font-semibold text-slate-400">Sabbath 2:00 PM</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold"><Shield size={22} /></div>
            <h3 className="text-xl font-bold text-slate-900">AMO (Men's Ministry)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Spiritual leadership, mentorship, and brotherhood for men.</p>
            <p className="text-xs font-semibold text-slate-400">Monthly Meetings</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold"><Heart size={22} /></div>
            <h3 className="text-xl font-bold text-slate-900">Women's Ministries</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Nurturing women through prayer networks and family retreats.</p>
            <p className="text-xs font-semibold text-slate-400">Monthly Gatherings</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold"><Music size={22} /></div>
            <h3 className="text-xl font-bold text-slate-900">Music & Choir</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Leading divine service worship through choral hymns and praise.</p>
            <p className="text-xs font-semibold text-slate-400">Fri Rehearsals 5:00 PM</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold"><Activity size={22} /></div>
            <h3 className="text-xl font-bold text-slate-900">Health Ministries</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Promoting healthy living based on NEWSTART lifestyle principles.</p>
            <p className="text-xs font-semibold text-slate-400">Quarterly Expos</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold"><Coins size={22} /></div>
            <h3 className="text-xl font-bold text-slate-900">Stewardship</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Educating on faithful tithes, offerings, and sanctuary development.</p>
            <p className="text-xs font-semibold text-slate-400">Monthly Seminars</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold"><Radio size={22} /></div>
            <h3 className="text-xl font-bold text-slate-900">Communication</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Managing sound, live streaming, and digital announcements.</p>
            <p className="text-xs font-semibold text-slate-400">Active Daily</p>
          </div>
        </div>
      </section>

      {/* M-Pesa Giving Section */}
      <section id="giving" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-[#0f2744] text-white p-8 sm:p-10 rounded-3xl shadow-lg space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                FAITHFUL STEWARDSHIP
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Support God's Work in Mtwapa</h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                "Bring all the tithes into the storehouse, that there may be food in My house." — Malachi 3:10. You can give your tithes, combined offerings, and building fund directly via Safaricom M-Pesa STK Push.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
              <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">M-Pesa Paybill / Till Number</p>
              <p className="text-2xl font-extrabold text-white">Paybill: 247247 · Account: Mtwapa SDA</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-[#002B49] text-white p-5 border-b border-blue-900 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <DollarSign className="text-emerald-400" size={20} /> M-Pesa Online Giving
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Daraja 2.0
              </span>
            </div>

            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
              <button onClick={() => setGivingTab('tithe')} className={`flex-1 py-3 text-center border-b-2 transition ${givingTab === 'tithe' ? 'border-[#004B87] text-[#004B87] bg-white' : 'border-transparent'}`}>Tithe</button>
              <button onClick={() => setGivingTab('offering')} className={`flex-1 py-3 text-center border-b-2 transition ${givingTab === 'offering' ? 'border-[#004B87] text-[#004B87] bg-white' : 'border-transparent'}`}>Offering</button>
              <button onClick={() => setGivingTab('building')} className={`flex-1 py-3 text-center border-b-2 transition ${givingTab === 'building' ? 'border-[#004B87] text-[#004B87] bg-white' : 'border-transparent'}`}>Building Fund</button>
            </div>

            <div className="p-6">
              {submitted && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">STK Push Triggered!</p>
                    <p className="text-xs">Prompt sent to phone to authorize payment.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleMpesaSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Amount (KSh)</label>
                  <input type="number" placeholder="1000" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#004B87]" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">M-Pesa Phone Number</label>
                  <input type="tel" placeholder="0712345678" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#004B87]" required />
                </div>
                <button type="submit" className="w-full bg-[#008A4B] hover:bg-[#00733E] text-white font-bold py-3.5 rounded-lg transition shadow-md flex items-center justify-center gap-2">
                  <Smartphone size={18} /> Send STK Push
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#071322] text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="text-amber-500" size={24} />
              <span className="font-bold text-white text-lg">Mtwapa Central SDA Church</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Proclaiming the everlasting gospel in Mtwapa, Kilifi South, Kenya.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/ministries" className="hover:text-white transition">Ministries</Link></li>
              <li><Link to="/events" className="hover:text-white transition">Events</Link></li>
              <li><a href="#giving" className="hover:text-white transition">Giving</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Visit Us</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mtwapa Town, Kilifi South, Kilifi County, Kenya
            </p>
            <div className="mt-4">
              <Link to="/portal" className="text-amber-400 font-semibold text-sm hover:underline">
                Member Portal Access &rarr;
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
