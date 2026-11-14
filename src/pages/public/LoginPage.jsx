import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, Lock, Mail, LogIn, ShieldCheck, UserCheck, DollarSign, Crown, FileText, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('sammy@mtwapacentralsda.or.ke');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/portal?role=${selectedRole}`);
    }, 1000);
  };

  const roles = [
    { id: 'member', name: 'Church Member', icon: UserCheck, desc: 'View attendance, Sabbath school class, and personal giving history.' },
    { id: 'leader', name: 'Department Leader', icon: ShieldCheck, desc: 'Manage department rosters, budgets, and departmental event reports.' },
    { id: 'clerk', name: 'Church Clerk', icon: FileText, desc: 'Manage baptismal registers, membership transfers, and Sabbath bulletins.' },
    { id: 'treasurer', name: 'Church Treasurer', icon: DollarSign, desc: 'Manage financial ledgers, M-Pesa inflows, tithes, and audits.' },
    { id: 'admin', name: 'Pastor / Admin', icon: Crown, desc: 'Full church oversight, user management, and broadcast announcements.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* Header Navigation */}
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2.5 rounded-2xl border border-white/10 shadow">
              <Building2 className="text-amber-500" size={24} />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-white tracking-tight">Mtwapa Central SDA</h1>
              <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">Role-Based Sign In</p>
            </div>
          </div>
          <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </header>

      {/* Main Login Area */}
      <main className="max-w-5xl w-full mx-auto px-6 py-12 grid md:grid-cols-12 gap-8 items-center">
        
        {/* Role Selector Description */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Access Control
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Select Your Portal Role</h2>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Log in to access your designated member dashboard, clerk records, treasury ledgers, or administrative reporting suites.
            </p>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <div 
                  key={r.id} 
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center gap-4 ${
                    selectedRole === r.id 
                      ? 'bg-[#071322] text-white border-[#071322] shadow-md' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${selectedRole === r.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{r.name}</h4>
                    <p className={`text-xs mt-0.5 ${selectedRole === r.id ? 'text-slate-300' : 'text-slate-500'}`}>{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Login Form Card */}
        <div className="md:col-span-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200 space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Sign In as {roles.find(r => r.id === selectedRole)?.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Enter your church credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#071322] text-sm" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#071322] text-sm" 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#071322] hover:bg-[#002B49] text-white font-bold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 text-sm"
            >
              {loading ? 'Authenticating...' : <><LogIn size={18} /> Launch {roles.find(r => r.id === selectedRole)?.name} Dashboard</>}
            </button>
          </form>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#071322] text-slate-300 py-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Mtwapa Central Seventh-day Adventist Church. All rights reserved.</p>
      </footer>

    </div>
  );
}
