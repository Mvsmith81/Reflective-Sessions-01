import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { PublicLayout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { LegalPage } from './pages/LegalPage';
import { SchedulePage } from './pages/SchedulePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { GroupIntakePage } from './pages/GroupIntakePage';
import { GroupDetailsPage } from './pages/GroupDetailsPage';
import { BlogPage } from './pages/BlogPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ResetPassword } from './pages/admin/ResetPassword';
import { RequireAdmin } from './components/admin/RequireAdmin';
import ScrollToTop from './components/ScrollToTop';

// Wrapper for public pages to ensure layout is applied
const PublicRoutes = () => (
  <PublicLayout>
    <Outlet />
  </PublicLayout>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/group-intake" element={<GroupIntakePage />} />
          <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Route>

        {/* Auth Routes - Explicitly Public */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Admin Routes - Uses wildcard to protect /admin and any subroutes */}
        <Route path="/admin/*" element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        } />
      </Routes>
    </Router>
  );
};

export default App;