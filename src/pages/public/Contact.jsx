import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle2, User } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: 'prayer', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: 'prayer', message: '' });
    }, 5000);
  };

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
      <section className="bg-[#071322] text-white py-16 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact & Pastoral Team</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            We would love to hear from you. Reach out with prayer requests, Bible study inquiries, or visit us in Mtwapa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
        
        {/* Contact Info & Pastoral Team */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900">Church Office & Location</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3.5">
                <MapPin className="text-amber-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Physical Address</p>
                  <p>Mtwapa Town, Kilifi South, Kilifi County, Kenya</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Phone className="text-amber-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Phone Number</p>
                  <p>+254 712 345 678 / +254 722 345 678</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Mail className="text-amber-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Email Address</p>
                  <p>info@mtwapacentralsda.or.ke</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#071322] text-white p-8 rounded-3xl shadow-lg space-y-6">
            <h3 className="text-xl font-bold">Pastoral Leadership</h3>
            <div className="space-y-4 divide-y divide-slate-800">
              <div className="pt-2 flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-2xl"><User size={20} className="text-amber-400" /></div>
                <div>
                  <p className="font-bold text-white text-base">Pastor Johnstone Mwachiro</p>
                  <p className="text-xs text-slate-400">District Pastor</p>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-2xl"><User size={20} className="text-amber-400" /></div>
                <div>
                  <p className="font-bold text-white text-base">Elder James Omondi</p>
                  <p className="text-xs text-slate-400">Head Elder</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">SEND A MESSAGE</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Prayer Request & Inquiries</h3>
          </div>

          {submitted && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm flex items-center gap-3">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              <p className="font-medium">Thank you! Your message has been sent to our pastoral team.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  placeholder="Sister Mary Akinyi" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#071322]" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="0712345678" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#071322]" 
                  required 
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="mary@gmail.com" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#071322]" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Inquiry Type</label>
                <select 
                  value={formData.subject} 
                  onChange={(e) => setFormData({...formData, subject: e.target.value})} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#071322]"
                >
                  <option value="prayer">Prayer Request</option>
                  <option value="bible">Bible Study Enrollment</option>
                  <option value="membership">Church Membership Transfer</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Message</label>
              <textarea 
                rows="5" 
                placeholder="How can we pray for or assist you?" 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#071322]" 
                required
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-[#071322] hover:bg-[#002B49] text-white font-bold py-4 rounded-xl transition shadow flex items-center justify-center gap-2">
              <Send size={18} /> Send Message to Pastor
            </button>
          </form>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#071322] text-slate-300 py-12 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Mtwapa Central Seventh-day Adventist Church. All rights reserved.</p>
      </footer>

    </div>
  );
}
