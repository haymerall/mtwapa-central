import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, LayoutDashboard, Users, DollarSign, Layers, Calendar, 
  Bell, ArrowLeft, TrendingUp, CheckCircle2, ShieldCheck, 
  Download, PlusCircle, Menu, X 
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementBody, setAnnouncementBody] = useState('');

  const handleBroadcast = (e) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setAnnouncementTitle('');
      setAnnouncementBody('');
    }, 4000);
  };

  const navItems = [
    { id: 'overview', label: 'Church Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Membership Registry', icon: Users },
    { id: 'finance', label: 'Treasury & M-Pesa', icon: DollarSign },
    { id: 'departments', label: '10 Ministries', icon: Layers },
    { id: 'broadcasts', label: 'Bulletins & Alerts', icon: Bell },
  ];

  const departmentsData = [
    { name: 'Treasury & Stewardship', leader: 'Elder James Omondi', budget: 'KES 45,000', spent: 'KES 32,000', status: 'Active' },
    { name: 'Music Ministry & Choirs', leader: 'Bro. Eric Otieno', budget: 'KES 30,000', spent: 'KES 24,500', status: 'Active' },
    { name: 'Adventist Youth (AY)', leader: 'Elder Brian Kiptoo', budget: 'KES 35,000', spent: 'KES 28,000', status: 'Active' },
    { name: 'Education Department', leader: 'Elder Okoyo', budget: 'KES 20,000', spent: 'KES 15,000', status: 'Active' },
    { name: 'Personal Ministries', leader: 'Elder Peter Njuguna', budget: 'KES 50,000', spent: 'KES 41,200', status: 'Active' },
    { name: 'Women\'s Ministries', leader: 'Sr. Mary Akinyi', budget: 'KES 25,000', spent: 'KES 19,000', status: 'Active' },
    { name: 'Health Ministries', leader: 'Dr. Sarah Cherono', budget: 'KES 40,000', spent: 'KES 38,000', status: 'Active' },
    { name: 'Sabbath School', leader: 'Sr. Eunice Wanjiru', budget: 'KES 18,000', spent: 'KES 12,500', status: 'Active' },
    { name: 'Deaconry & Ushering', leader: 'Bro. Joseph Mwangi', budget: 'KES 22,000', spent: 'KES 16,000', status: 'Active' },
    { name: 'Children\'s Ministries', leader: 'Sr. Grace Mbithe', budget: 'KES 28,000', spent: 'KES 21,000', status: 'Active' },
  ];

  const attendanceBars = [
    { label: 'Oct 10', count: 265, pct: '78%' },
    { label: 'Oct 17', count: 290, pct: '85%' },
    { label: 'Oct 24', count: 278, pct: '82%' },
    { label: 'Oct 31', count: 312, pct: '92%' },
    { label: 'Nov 07', count: 325, pct: '96%' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Left Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#071322] text-white flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#1e293b] p-2.5 rounded-2xl border border-white/10 shadow">
                <Building2 className="text-amber-500" size={24} />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-white tracking-tight">Mtwapa Central</h1>
                <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">Executive Admin</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition ${
                    activeNav === item.id 
                      ? 'bg-amber-500 text-slate-950 shadow-lg' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 space-y-3">
          <Link 
            to="/portal" 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 transition"
          >
            Switch to Member Portal
          </Link>
          <Link 
            to="/" 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={14} /> Exit to Public Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700"
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 capitalize">{activeNav.replace('-', ' ')} Dashboard</h2>
              <p className="text-xs text-slate-500">Kilifi South District • Q4 2026 Administration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck size={14} /> Daraja 2.0 Sync Active
            </span>
            <div className="w-9 h-9 bg-[#071322] text-amber-400 rounded-xl flex items-center justify-center font-extrabold text-xs">
              PA
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Top KPI Cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Baptized Membership</span>
                <Users size={18} className="text-amber-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900">340</p>
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp size={14} /> +14 candidates for next Sabbath
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Tithes & Offerings</span>
                <DollarSign size={18} className="text-emerald-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900">KES 563,300</p>
              <p className="text-xs text-emerald-600 font-semibold">+18.4% vs October 2026</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Building Fund Progress</span>
                <Building2 size={18} className="text-blue-600" />
              </div>
              <p className="text-3xl font-extrabold text-amber-600">KES 850,400</p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '57%' }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sabbath Attendance</span>
                <Calendar size={18} className="text-purple-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900">325 Avg</p>
              <p className="text-xs text-slate-500">95.6% active member turnout</p>
            </div>
          </div>

          {/* Overview Tab Content */}
          {activeNav === 'overview' && (
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Sabbath Attendance Analytics Bar Chart */}
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Sabbath Divine Service Attendance</h3>
                    <p className="text-xs text-slate-500">Last 5 Sabbaths headcount across Main Sanctuary & Youth Hall</p>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">Q4 Trend</span>
                </div>

                <div className="grid grid-cols-5 gap-4 items-end h-52 pt-6 px-2 border-b border-slate-100">
                  {attendanceBars.map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-extrabold text-slate-700">{bar.count}</span>
                      <div 
                        className="w-full max-w-[48px] bg-[#071322] hover:bg-amber-500 transition-colors rounded-t-xl" 
                        style={{ height: bar.pct }}
                      />
                      <span className="text-[11px] font-bold text-slate-400 pb-2">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Bulletin Broadcast */}
              <div className="lg:col-span-5 bg-[#071322] text-white p-8 rounded-3xl shadow-xl space-y-5">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Church Communication</span>
                  <h3 className="text-xl font-extrabold mt-1">Broadcast Sabbath Notice</h3>
                </div>

                {broadcastSent && (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs flex items-center gap-2 font-semibold">
                    <CheckCircle2 size={16} /> Bulletin published to Member Portal!
                  </div>
                )}

                <form onSubmit={handleBroadcast} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Notice Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., District Camp Meeting Choir Practice" 
                      value={announcementTitle}
                      onChange={(e) => setAnnouncementTitle(e.target.value)}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Message Details</label>
                    <textarea 
                      rows="3"
                      placeholder="Enter announcement details for all baptized members..."
                      value={announcementBody}
                      onChange={(e) => setAnnouncementBody(e.target.value)}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition text-xs shadow">
                    Publish to All Members
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Departments Budget & Status Table (Visible on Overview & Departments tabs) */}
          {(activeNav === 'overview' || activeNav === 'departments') && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">10 Official Ministries — Budget & Leadership Oversight</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Real-time Q4 budget utilization and quarterly report statuses</p>
                </div>
                <button className="bg-[#071322] hover:bg-[#002B49] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition">
                  <Download size={14} /> Export District Report
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Department</th>
                      <th className="p-3.5">Department Head</th>
                      <th className="p-3.5">Q4 Budget</th>
                      <th className="p-3.5">Utilized</th>
                      <th className="p-3.5 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {departmentsData.map((d, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition">
                        <td className="p-3.5 font-bold text-slate-900">{d.name}</td>
                        <td className="p-3.5 text-slate-600">{d.leader}</td>
                        <td className="p-3.5 font-semibold">{d.budget}</td>
                        <td className="p-3.5 text-amber-700 font-semibold">{d.spent}</td>
                        <td className="p-3.5">
                          <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Membership Registry Tab */}
          {activeNav === 'members' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">Church Clerk Registry & Baptismal Roll</h3>
                <button className="bg-[#071322] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5">
                  <PlusCircle size={14} /> Add Member Record
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Member Name</th>
                      <th className="p-3.5">Sabbath School Class</th>
                      <th className="p-3.5">Standing</th>
                      <th className="p-3.5 rounded-r-xl">Joined / Transferred</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3.5 font-bold">Sammy Nyandwaro</td>
                      <td className="p-3.5">Class #4 (Adults)</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Baptized</span></td>
                      <td className="p-3.5 text-slate-500 text-xs">Jan 2024</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Sr. Grace Akinyi</td>
                      <td className="p-3.5">Class #2 (Women)</td>
                      <td className="p-3.5"><span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-bold">Transfer Pending</span></td>
                      <td className="p-3.5 text-slate-500 text-xs">Nov 2026</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Elder James Omondi</td>
                      <td className="p-3.5">Class #1 (Elders)</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Baptized</span></td>
                      <td className="p-3.5 text-slate-500 text-xs">Mar 2019</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Treasury & M-Pesa Tab */}
          {activeNav === 'finance' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Daraja 2.0 M-Pesa & Treasury Audit Ledger</h3>
                  <p className="text-xs text-slate-500">Paybill 247247 • Account 300250</p>
                </div>
                <button className="bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow">
                  <Download size={14} /> Download Audit Statement
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">M-Pesa Receipt</th>
                      <th className="p-3.5">Contributor</th>
                      <th className="p-3.5">Fund Category</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5 rounded-r-xl">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3.5 font-mono text-xs font-bold text-amber-600">QHJ892K1L9</td>
                      <td className="p-3.5">Sammy Nyandwaro</td>
                      <td className="p-3.5">Tithe (10%)</td>
                      <td className="p-3.5 font-bold">KES 5,000</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Verified</span></td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-xs font-bold text-amber-600">QHJ764M2P4</td>
                      <td className="p-3.5">Sr. Mary Akinyi</td>
                      <td className="p-3.5">Building Fund</td>
                      <td className="p-3.5 font-bold">KES 2,500</td>
                      <td className="p-3.5"><span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">Verified</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Broadcasts Tab */}
          {activeNav === 'broadcasts' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">Active Sabbath Bulletins & Notices</h3>
              <div className="space-y-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">Safety Notice</span>
                    <h4 className="font-bold text-slate-900 text-base mt-2">Upper Floor & Perimeter Construction Safety</h4>
                    <p className="text-xs text-slate-600 mt-1">All members and children are advised not to sit near the sanctuary walls or upper floor during ongoing construction works.</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">Nov 07, 2026</span>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">Choir Event</span>
                    <h4 className="font-bold text-slate-900 text-base mt-2">Chanet Were Album Launch</h4>
                    <p className="text-xs text-slate-600 mt-1">Join us this Sunday starting at 2:00 PM for the official choir album launch featuring guest choir ministrations.</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">Nov 07, 2026</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
