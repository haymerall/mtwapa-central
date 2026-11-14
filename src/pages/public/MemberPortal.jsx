import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Building2, ArrowLeft, ShieldCheck, Calendar, DollarSign, BookOpen, 
  Bell, CheckCircle2, Smartphone, Users, FileText, Settings, Award, Layers, PlusCircle, Download 
} from 'lucide-react';

export default function MemberPortal() {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const roleParam = searchParams.get('role') || 'member';
  const [activeTab, setActiveTab] = useState(roleParam);
  const [givingSent, setGivingSent] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Tithe');
  const [phone, setPhone] = useState('');

  const handleMpesaGiving = (e) => {
    e.preventDefault();
    setGivingSent(true);
    setTimeout(() => {
      setGivingSent(false);
      setAmount('');
      setPhone('');
    }, 5000);
  };

  const departmentsList = [
    'Treasury & Stewardship', 'Music Ministry', 'Adventist Youth (AY)', 
    'Education', 'Personal Ministries', 'Women\'s Ministries', 
    'Health Ministries', 'Sabbath School', 'Deaconry & Ushering', 'Children\'s Ministries'
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
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Multi-Role Management Portal</p>
            </div>
          </div>
          <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </header>

      {/* Role Switcher & Header */}
      <section className="bg-[#071322] text-white py-12 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-lg">
              SN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold">Sammy Nyandwaro</h2>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={12} /> Role: {activeTab.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Mtwapa Central Church • Kilifi South District</p>
            </div>
          </div>

          <div className="flex flex-wrap bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 text-xs font-bold gap-1">
            <button 
              onClick={() => setActiveTab('member')} 
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'member' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Member
            </button>
            <button 
              onClick={() => setActiveTab('leader')} 
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'leader' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Leader
            </button>
            <button 
              onClick={() => setActiveTab('clerk')} 
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'clerk' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Church Clerk
            </button>
            <button 
              onClick={() => setActiveTab('treasurer')} 
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'treasurer' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Church Treasurer
            </button>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'admin' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Pastor / Admin
            </button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* 1. MEMBER ROLE DASHBOARD */}
        {activeTab === 'member' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sabbath Attendance</span>
                <p className="text-3xl font-extrabold text-slate-900">92%</p>
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Active member standing
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sabbath School Class</span>
                <p className="text-xl font-extrabold text-slate-900">Class #4 (Adults)</p>
                <p className="text-xs text-slate-500">Main Sanctuary Upper Hall</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Departmental Role</span>
                <p className="text-xl font-extrabold text-slate-900">Communication Tech</p>
                <p className="text-xs text-slate-500">Media & Live Streaming</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">YTD Faithful Giving</span>
                <p className="text-3xl font-extrabold text-amber-600">KES 24,500</p>
                <p className="text-xs text-slate-500">Tithes & Offerings recorded</p>
              </div>
            </div>

            {/* M-Pesa Giving Widget in Portal */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Smartphone size={16} /> Daraja 2.0 Integration
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">Fast M-Pesa Giving</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Return your tithes and offerings directly through Safaricom STK Push with instant ledger reflection.
                </p>
              </div>

              <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                {givingSent && (
                  <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>M-Pesa STK Push initiated successfully! Enter your PIN on your phone.</span>
                  </div>
                )}
                <form onSubmit={handleMpesaGiving} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Category</label>
                      <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      >
                        <option value="Tithe">Tithe (10%)</option>
                        <option value="Offering">Sabbath Offering</option>
                        <option value="Building Fund">Building Fund</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Amount (KES)</label>
                      <input 
                        type="number" 
                        placeholder="1000" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium" 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">M-Pesa Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="0712345678" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium" 
                      required 
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#071322] hover:bg-[#002B49] text-white text-xs font-bold py-3 rounded-xl transition shadow">
                    Send M-Pesa STK Push
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 2. DEPARTMENT LEADER DASHBOARD */}
        {activeTab === 'leader' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Department</span>
                <p className="text-xl font-extrabold text-slate-900">Communication & Media</p>
                <p className="text-xs text-amber-600 font-semibold">Leader: Sammy Nyandwaro</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Rosters</span>
                <p className="text-3xl font-extrabold text-slate-900">8 Members</p>
                <p className="text-xs text-slate-500">Live streaming & audio duty</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Q4 Budget Allocation</span>
                <p className="text-3xl font-extrabold text-emerald-600">KES 15,000</p>
                <p className="text-xs text-slate-500">Approved by Treasury</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">Department Roster & Duty Schedule</h3>
                <button className="bg-[#071322] text-white text-xs font-bold px-4 py-2 rounded-xl">Add Member Duty</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Member Name</th>
                      <th className="p-3.5">Assigned Duty</th>
                      <th className="p-3.5">Sabbath Date</th>
                      <th className="p-3.5 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3.5">Sammy Nyandwaro</td>
                      <td className="p-3.5">Live Streaming & Audio</td>
                      <td className="p-3.5">Nov 14, 2026</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Confirmed</span></td>
                    </tr>
                    <tr>
                      <td className="p-3.5">Bro. Eric Otieno</td>
                      <td className="p-3.5">Camera Operator</td>
                      <td className="p-3.5">Nov 14, 2026</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Confirmed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. CHURCH CLERK DASHBOARD */}
        {activeTab === 'clerk' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Baptized Members</span>
                <p className="text-3xl font-extrabold text-slate-900">340</p>
                <p className="text-xs text-emerald-600 font-semibold">+6 new transfers Q4</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Transfers</span>
                <p className="text-3xl font-extrabold text-amber-600">3 Requests</p>
                <p className="text-xs text-slate-500">From Nairobi & Mombasa</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Baptismal Class</span>
                <p className="text-3xl font-extrabold text-slate-900">14 Candidates</p>
                <p className="text-xs text-slate-500">Ready for exam</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sabbath Attendance Avg</span>
                <p className="text-3xl font-extrabold text-slate-900">285</p>
                <p className="text-xs text-slate-500">Last Sabbath Divine Hour</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">Membership Transfers & Records</h3>
                <button className="bg-[#071322] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5">
                  <PlusCircle size={14} /> Register New Member
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Member Full Name</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Origin / Destination</th>
                      <th className="p-3.5">Date Submitted</th>
                      <th className="p-3.5 rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3.5 font-bold">Sr. Grace Akinyi</td>
                      <td className="p-3.5"><span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-bold">Transfer In</span></td>
                      <td className="p-3.5">Milimani SDA, Kisumu</td>
                      <td className="p-3.5 text-xs text-slate-500">Nov 5, 2026</td>
                      <td className="p-3.5"><button className="text-xs font-bold text-emerald-600 hover:underline">Approve Certificate</button></td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Bro. Kevin Ouma</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Baptized Member</span></td>
                      <td className="p-3.5">Mtwapa Central Local</td>
                      <td className="p-3.5 text-xs text-slate-500">Aug 2026</td>
                      <td className="p-3.5"><button className="text-xs font-bold text-slate-600 hover:underline">View Record</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. CHURCH TREASURER DASHBOARD */}
        {activeTab === 'treasurer' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Tithes (Q4)</span>
                <p className="text-3xl font-extrabold text-amber-600">KES 420,500</p>
                <p className="text-xs text-emerald-600 font-semibold">Remitted to Conference</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Local Church Offerings</span>
                <p className="text-3xl font-extrabold text-slate-900">KES 142,800</p>
                <p className="text-xs text-slate-500">This Sabbath collection</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">M-Pesa STK Gateway</span>
                <p className="text-3xl font-extrabold text-emerald-600">Active (247247)</p>
                <p className="text-xs text-slate-500">Daraja 2.0 automatic sync</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Building Fund Balance</span>
                <p className="text-3xl font-extrabold text-slate-900">KES 850,400</p>
                <p className="text-xs text-slate-500">Target: KES 1.5M</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">Daraja M-Pesa Ledger & Tithe Inflows</h3>
                <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow">
                  <Download size={14} /> Export Financial Audit (PDF/CSV)
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Transaction Code</th>
                      <th className="p-3.5">Member Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3.5 font-mono text-xs font-bold text-amber-600">QHJ892K1L9</td>
                      <td className="p-3.5">Sammy Nyandwaro</td>
                      <td className="p-3.5">Tithe (10%)</td>
                      <td className="p-3.5 font-bold">KES 5,000</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Reconciled</span></td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-xs font-bold text-amber-600">QHJ764M2P4</td>
                      <td className="p-3.5">Sr. Mary Akinyi</td>
                      <td className="p-3.5">Building Fund</td>
                      <td className="p-3.5 font-bold">KES 2,500</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Reconciled</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. PASTOR / ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Registered Members</span>
                <p className="text-3xl font-extrabold text-slate-900">340 Baptized</p>
                <p className="text-xs text-emerald-600 font-semibold">Kilifi South District</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Church Departments</span>
                <p className="text-3xl font-extrabold text-slate-900">10 Ministries</p>
                <p className="text-xs text-slate-500">Fully structured & led</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Baptism</span>
                <p className="text-3xl font-extrabold text-amber-600">14 Souls</p>
                <p className="text-xs text-slate-500">Next Sabbath Service</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">Department Management & Oversight</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {departmentsList.map((dept, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{dept}</h4>
                      <p className="text-[11px] text-slate-500">Status: Active • Quarterly Report Submitted</p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">Manage</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#071322] text-slate-300 py-12 border-t border-slate-800 text-center text-sm mt-20">
        <p>&copy; {new Date().getFullYear()} Mtwapa Central Seventh-day Adventist Church. All rights reserved.</p>
      </footer>

    </div>
  );
}
