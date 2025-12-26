import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { PublicLayout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { LegalPage } from './pages/LegalPage';
import { SchedulePage } from './pages/SchedulePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { GroupIntakePage } from './pages/GroupIntakePage';
import { GroupDetailsPage } from './pages/GroupDetailsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Wrapper for public pages to ensure layout is applied
const PublicRoutes = () => (
  <PublicLayout>
    <Outlet />
  </PublicLayout>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/group-intake" element={<GroupIntakePage />} />
          <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Route>

        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes - In a real app, this would be protected by Auth */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;