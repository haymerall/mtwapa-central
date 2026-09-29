import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';

// Public site
import PublicLayout from '@/components/public/PublicLayout';
import Home from '@/pages/public/Home';
import About from '@/pages/public/About';
import Ministries from '@/pages/public/Ministries';
import MinistryDetail from '@/pages/public/MinistryDetail';
import Events from '@/pages/public/Events';
import Sermons from '@/pages/public/Sermons';
import Contact from '@/pages/public/Contact';

// Auth
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

// Admin
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Members from '@/pages/admin/Members';
import MemberProfile from '@/pages/admin/MemberProfile';
import MinistriesAdmin from '@/pages/admin/Ministries';
import MinistryWorkspace from '@/pages/admin/MinistryWorkspace';
import Attendance from '@/pages/admin/Attendance';
import EventsAdmin from '@/pages/admin/Events';
import Communication from '@/pages/admin/Communication';
import Finance from '@/pages/admin/Finance';
import Facilities from '@/pages/admin/Facilities';
import Documents from '@/pages/admin/Documents';
import Reports from '@/pages/admin/Reports';
import AuditLog from '@/pages/admin/AuditLog';
import Settings from '@/pages/admin/Settings';

// Member portal
import MemberPortal from '@/pages/member/MemberPortal';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public website */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/ministries/:slug" element={<MinistryDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/sermons" element={<Sermons />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Member portal */}
            <Route path="/portal" element={<MemberPortal />} />

            {/* Admin (role-gated via demo session) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="members" element={<Members />} />
              <Route path="members/:id" element={<MemberProfile />} />
              <Route path="ministries" element={<MinistriesAdmin />} />
              <Route path="ministries/:id" element={<MinistryWorkspace />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="events" element={<EventsAdmin />} />
              <Route path="communication" element={<Communication />} />
              <Route path="finance" element={<Finance />} />
              <Route path="facilities" element={<Facilities />} />
              <Route path="documents" element={<Documents />} />
              <Route path="reports" element={<Reports />} />
              <Route path="audit" element={<AuditLog />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App