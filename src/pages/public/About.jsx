import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Users, Calendar, BookOpen, Heart, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header Navigation */}
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10 shadow">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Mtwapa Central SDA</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Church Platform</p>
            </div>
          </div>
          <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-[#071322] text-white py-20 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2000" 
            alt="Church Community" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
            About Our Church
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">Rooted in Scripture, Reaching Our Community</h2>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            Mtwapa Central Seventh-day Adventist Church is a vibrant Christ-centered fellowship dedicated to worshipping God, maturing disciples, and extending hope across Kilifi South and beyond.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        
        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold">
              <Compass size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-base">
              To proclaim the everlasting gospel of Jesus Christ within the context of the Three Angels' Messages of Revelation 14:6–12, leading individuals to accept Christ as their personal Savior and unite with His remnant church.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-base">
              In harmony with Bible prophecy, we see as the climax of God's plan the restoration of all His creation to full harmony with His perfect will and righteousness, living in eager expectation of Jesus Christ's second coming.
            </p>
          </div>
        </div>

        {/* Impact Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-2">
            <Users className="text-amber-600 mb-2" size={28} />
            <div className="text-4xl font-extrabold text-slate-900">180+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Members</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-2">
            <Calendar className="text-amber-600 mb-2" size={28} />
            <div className="text-4xl font-extrabold text-slate-900">4</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Weekly Services</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-2">
            <BookOpen className="text-amber-600 mb-2" size={28} />
            <div className="text-4xl font-extrabold text-slate-900">10</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Departments</div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <Heart className="text-amber-600 mb-2" size={28} />
            <div className="text-4xl font-extrabold text-slate-900">25</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Years Serving Mtwapa</div>
          </div>
        </div>

        {/* What We Believe Section */}
        <div className="bg-[#071322] text-white p-10 sm:p-12 rounded-3xl shadow-xl space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">DOCTRINE & FAITH</span>
            <h3 className="text-3xl font-extrabold tracking-tight">Core Seventh-day Adventist Beliefs</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We accept the Bible as the infallible revelation of God's will, holding 28 fundamental beliefs that describe how God's love guides our lives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
              <CheckCircle2 className="text-amber-400" size={20} />
              <h4 className="font-bold text-white text-base">The Holy Scriptures</h4>
              <p className="text-xs text-slate-300 leading-relaxed">The Old and New Testaments are the written word of God, given by divine inspiration.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
              <CheckCircle2 className="text-amber-400" size={20} />
              <h4 className="font-bold text-white text-base">The Seventh-day Sabbath</h4>
              <p className="text-xs text-slate-300 leading-relaxed">The creator rested on the seventh day, instituting the Sabbath as a perpetual memorial of creation.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
              <CheckCircle2 className="text-amber-400" size={20} />
              <h4 className="font-bold text-white text-base">The Second Coming</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Christ's return is the blessed hope of the church, the grand climax of the gospel.</p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#071322] text-slate-300 py-12 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Mtwapa Central Seventh-day Adventist Church. All rights reserved.</p>
      </footer>

    </div>
  );
}
