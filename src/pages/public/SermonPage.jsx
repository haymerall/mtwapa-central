import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Calendar, User, ExternalLink, Play } from 'lucide-react';

export default function SermonPage() {
  const [filter, setFilter] = useState('all');

  const heroSermon = {
    title: "Education Sabbath Service & Divine Hour",
    speaker: "Pst. Dan Deya Omondi",
    date: "Sabbath, November 7, 2026",
    youtubeUrl: "https://www.youtube.com/live/AUuEImHC_mc",
    videoId: "AUuEImHC_mc",
    duration: "2h 54m",
    category: "Education"
  };

  const sermons = [
    {
      id: 1,
      title: "Education Sabbath Service & Divine Hour",
      speaker: "Pst. Dan Deya Omondi",
      date: "Sabbath, November 7, 2026",
      category: "Education",
      duration: "2h 54m",
      youtubeUrl: "https://www.youtube.com/live/AUuEImHC_mc",
      videoId: "AUuEImHC_mc",
      desc: "Education Sabbath live stream featuring powerful choral ministrations, children's story, and divine message."
    },
    {
      id: 2,
      title: "Camp Meeting 2026 - Day 01 Opening",
      speaker: "District Ministry Team",
      date: "August 2026",
      category: "Camp Meeting",
      duration: "5h 23m",
      youtubeUrl: "https://www.youtube.com/live/gxph1Y0zyig",
      videoId: "gxph1Y0zyig",
      desc: "Opening sessions of the Mtwapa District Camp Meeting 2026 focusing on spiritual awakening and the remnant identity."
    },
    {
      id: 3,
      title: "Camp Meeting 2026 - Day 4 Service",
      speaker: "Mtwapa District Pastors",
      date: "August 2026",
      category: "Camp Meeting",
      duration: "4h 52m",
      youtubeUrl: "https://www.youtube.com/live/U0Hlze41nx4",
      videoId: "U0Hlze41nx4",
      desc: "Mid-week camp meeting divine service, scripture readings, and fellowship across Mtwapa district churches."
    },
    {
      id: 4,
      title: "Music Sabbath Celebration",
      speaker: "Sanctuary Choirs & Guest Ensembles",
      date: "September 2023",
      category: "Music",
      duration: "1h 32m",
      youtubeUrl: "https://www.youtube.com/live/twmXElRGIBw",
      videoId: "twmXElRGIBw",
      desc: "A special Music Sabbath featuring uplifting choral arrangements, hymnody, and praise ministrations."
    },
    {
      id: 5,
      title: "Camp Meeting 2026 - Final Day Closing",
      speaker: "District Leadership",
      date: "August 2026",
      category: "Camp Meeting",
      duration: "2h 21m",
      youtubeUrl: "https://www.youtube.com/live/qGJ7odErKWw",
      videoId: "qGJ7odErKWw",
      desc: "Grand closing ceremonies, baptismal reports, choir presentations, and final blessings of Camp Meeting 2026."
    }
  ];

  const filteredSermons = filter === 'all' 
    ? sermons 
    : sermons.filter(s => s.category.toLowerCase() === filter.toLowerCase());

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

      {/* Hero Banner with Thumbnail Background */}
      <section className="bg-[#071322] text-white py-20 px-6 border-b border-slate-800 relative overflow-hidden">
        {/* Background Thumbnail Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`https://img.youtube.com/vi/${heroSermon.videoId}/maxresdefault.jpg`} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-25 filter blur-xs scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/90 to-[#071322]/70"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
              Spiritual Nourishment
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Sermons & Live Worship Streams
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Watch Sabbath sermons, camp meeting services, and divine messages from Mtwapa Central SDA Church. Deepen your faith through the preached word.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href={heroSermon.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow flex items-center gap-2 text-sm"
              >
                <Play size={16} className="fill-slate-950" /> Watch Featured Live Stream <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Featured Sermon Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-3xl border border-white/10 shadow-2xl group">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${heroSermon.videoId}/hqdefault.jpg`} 
                  alt={heroSermon.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <a 
                    href={heroSermon.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-xl transition transform group-hover:scale-110"
                    title="Play Live Stream"
                  >
                    <Play size={24} className="fill-white ml-1" />
                  </a>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded backdrop-blur-sm">
                  {heroSermon.duration}
                </span>
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-extrabold text-white text-base">{heroSermon.title}</h4>
                <p className="text-xs text-amber-400 font-semibold">{heroSermon.speaker}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter By Category:</span>
          {['all', 'education', 'camp meeting', 'music'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                filter === cat 
                  ? 'bg-[#071322] text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sermon Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <div key={sermon.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              
              {/* Thumbnail Header */}
              <div className="relative aspect-video bg-slate-900 group">
                <img 
                  src={`https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`} 
                  alt={sermon.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                  <a 
                    href={sermon.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition transform group-hover:scale-110"
                    title="Watch on YouTube"
                  >
                    <Play size={20} className="fill-white ml-0.5" />
                  </a>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                  {sermon.duration}
                </span>
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {sermon.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <Calendar size={14} className="text-amber-600" /> {sermon.date}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg line-clamp-2">{sermon.title}</h3>
                <p className="text-xs font-semibold text-amber-600 flex items-center gap-1.5">
                  <User size={14} /> {sermon.speaker}
                </p>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 pt-1">{sermon.desc}</p>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-0">
                <a 
                  href={sermon.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#071322] hover:bg-[#002B49] text-white text-xs font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <Play size={14} className="fill-white" /> Watch Live Service <ExternalLink size={12} />
                </a>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#071322] text-slate-300 py-12 border-t border-slate-800 text-center text-sm mt-20">
        <p>&copy; {new Date().getFullYear()} Mtwapa Central Seventh-day Adventist Church. All rights reserved.</p>
      </footer>

    </div>
  );
}
