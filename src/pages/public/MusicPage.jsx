import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Play, ExternalLink, Disc, Video } from 'lucide-react';

export default function MusicPage() {
  const heroVideo = {
    title: "SEMA NENO - OFFICIAL VIDEO",
    ensemble: "Mtwapa Central Church Choir",
    youtubeUrl: "https://youtu.be/L0NEPG4uGz0",
    videoId: "L0NEPG4uGz0",
    duration: "5:26",
    views: "594 views"
  };

  const songs = [
    { 
      id: 1, 
      title: "SEMA NENO", 
      ensemble: "Mtwapa Central Church Choir", 
      duration: "5:26",
      album: "Official Video Production 2026",
      youtubeUrl: "https://youtu.be/L0NEPG4uGz0",
      videoId: "L0NEPG4uGz0",
      views: "594 views"
    },
    { 
      id: 2, 
      title: "NITEMBEE NAWE", 
      ensemble: "Mtwapa Central Church Choir", 
      duration: "4:56",
      album: "Official Video Production 2026",
      youtubeUrl: "https://youtu.be/pJD0K_ZTvEc",
      videoId: "pJD0K_ZTvEc",
      views: "1,596 views"
    },
    { 
      id: 3, 
      title: "KUNA NJIA", 
      ensemble: "Mtwapa Central SDA Church Choir", 
      duration: "5:02",
      album: "Official Video Production 2026",
      youtubeUrl: "https://youtu.be/K-fyR8W67wg",
      videoId: "K-fyR8W67wg",
      views: "7,992 views"
    },
    { 
      id: 4, 
      title: "MWANAMKE", 
      ensemble: "Mtwapa Central SDA Church Choir", 
      duration: "4:44",
      album: "Official Video Production 2026",
      youtubeUrl: "https://youtu.be/Qqpzo0420sI",
      videoId: "Qqpzo0420sI",
      views: "5,664 views"
    },
    { 
      id: 5, 
      title: "Choral Ministrations Vol. 1", 
      ensemble: "SDA Mtwapa Central Church Choir", 
      duration: "4:15",
      album: "Studio Worship Release",
      youtubeUrl: "https://youtu.be/99mla8EwgTo",
      videoId: "99mla8EwgTo",
      views: "Official Release"
    },
    { 
      id: 6, 
      title: "Choral Ministrations Vol. 2", 
      ensemble: "SDA Mtwapa Central Church Choir", 
      duration: "3:50",
      album: "Studio Worship Release",
      youtubeUrl: "https://youtu.be/k9OqX9dyB44",
      videoId: "k9OqX9dyB44",
      views: "Official Release"
    },
    { 
      id: 7, 
      title: "Choral Ministrations Vol. 3", 
      ensemble: "SDA Mtwapa Central Church Choir", 
      duration: "4:30",
      album: "Studio Worship Release",
      youtubeUrl: "https://youtu.be/uRzlRk1bZAA",
      videoId: "uRzlRk1bZAA",
      views: "Official Release"
    }
  ];

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
            src={`https://img.youtube.com/vi/${heroVideo.videoId}/maxresdefault.jpg`} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-25 filter blur-xs scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/90 to-[#071322]/70"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
              Official YouTube Choirs
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Mtwapa Central SDA Church Choir Music
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Watch all official music videos and choral ministrations direct from our sanctuary choir YouTube channel. Lift your voice in praise and worship.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href={heroVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow flex items-center gap-2 text-sm"
              >
                <Play size={16} className="fill-slate-950" /> Watch Featured Video <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Featured Video Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-3xl border border-white/10 shadow-2xl group">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${heroVideo.videoId}/hqdefault.jpg`} 
                  alt={heroVideo.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <a 
                    href={heroVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-xl transition transform group-hover:scale-110"
                    title="Play Featured Video"
                  >
                    <Play size={24} className="fill-white ml-1" />
                  </a>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded backdrop-blur-sm">
                  {heroVideo.duration}
                </span>
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-extrabold text-white text-base">{heroVideo.title}</h4>
                <p className="text-xs text-amber-400 font-semibold">{heroVideo.ensemble}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-extrabold text-slate-900">All Choral Releases & Videos</h3>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">7 Official Tracks</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <div key={song.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              
              {/* Thumbnail Header */}
              <div className="relative aspect-video bg-slate-900 group">
                <img 
                  src={`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`} 
                  alt={song.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                  <a 
                    href={song.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition transform group-hover:scale-110"
                    title="Play on YouTube"
                  >
                    <Play size={20} className="fill-white ml-0.5" />
                  </a>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                  {song.duration}
                </span>
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {song.views}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg line-clamp-1">{song.title}</h3>
                  <p className="text-xs font-semibold text-amber-600 mt-0.5">{song.ensemble}</p>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Disc size={12} /> {song.album}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-0">
                <a 
                  href={song.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#071322] hover:bg-[#002B49] text-white text-xs font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <Play size={14} className="fill-white" /> Watch on YouTube <ExternalLink size={12} />
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
