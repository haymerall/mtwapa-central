import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, DollarSign, Smartphone, History, Shield, CheckCircle2 } from 'lucide-react';

export default function MemberPortal() {
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [fundType, setFundType] = useState('tithe');
  const [success, setSuccess] = useState(false);

  const handleGive = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Member Portal</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Mtwapa Central SDA</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/treasury" className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-500/30 transition">
              Admin Dashboard
            </Link>
            <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5">
              <ArrowLeft size={16} /> Exit
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">M-Pesa Giving</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Stewardship & Tithes</h3>
            </div>

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                <p className="font-medium">STK Push triggered successfully!</p>
              </div>
            )}

            <form onSubmit={handleGive} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Giving Category</label>
                <select value={fundType} onChange={(e) => setFundType(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#071322]">
                  <option value="tithe">Tithe (10%)</option>
                  <option value="offering">Combined Budget Offering</option>
                  <option value="building">Church Building Fund</option>
                  <option value="pathfinder">Pathfinder Youth Club</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Amount (KSh)</label>
                <input type="number" placeholder="2500" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#071322]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">M-Pesa Phone Number</label>
                <input type="tel" placeholder="0712345678" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#071322]" required />
              </div>
              <button type="submit" className="w-full bg-[#008A4B] hover:bg-[#00733E] text-white font-bold py-4 rounded-xl transition shadow flex items-center justify-center gap-2">
                <Smartphone size={18} /> Trigger M-Pesa STK Push
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Your Giving History</h3>
              <span className="text-xs font-bold text-slate-400">Verified Daraja 2.0 Logs</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { date: "Oct 26, 2026", type: "Tithe", amount: "KSh 5,000", ref: "QWE7891234", status: "Completed" },
                { date: "Oct 19, 2026", type: "Building Fund", amount: "KSh 2,500", ref: "RTY4567890", status: "Completed" },
                { date: "Oct 12, 2026", type: "Combined Offering", amount: "KSh 1,000", ref: "UIO1234567", status: "Completed" }
              ].map((tx, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 text-sm">{tx.type} · <span className="text-emerald-600 font-semibold">{tx.amount}</span></p>
                    <p className="text-xs text-slate-400">Ref: {tx.ref} · {tx.date}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">{tx.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
