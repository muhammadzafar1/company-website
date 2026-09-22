import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import CursorFluid from './components/CursorFluid';
import ScrollReveal from './components/ScrollReveal';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const DevelopersPage = lazy(() => import('./pages/DevelopersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const StatusPage = lazy(() => import('./pages/StatusPage'));
const SocialMediaPage = lazy(() => import('./pages/SocialMediaPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const DashboardPage = lazy(() => import('./admin/DashboardPage'));
const Employees = lazy(() => import('./admin/Employees'));
const Settings = lazy(() => import('./admin/Settings'));

function DeferredChatbot() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(enable, { timeout: 2200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(enable, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return enabled ? <Suspense fallback={null}><AIChatbot /></Suspense> : null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-transparent text-[var(--text-primary)] antialiased">
        <AnimatedBackground />
        <CursorFluid />
        <ScrollReveal />
        <DeferredChatbot />
        <div className="relative z-10 min-h-screen bg-transparent text-[var(--text-primary)]">
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
              <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
               <Route path="/services" element={<><Navbar /><ServicesPage /><Footer /></>} />
              <Route path="/products" element={<><Navbar /><ProductsPage /><Footer /></>} />
              <Route path="/products/:slug" element={<><Navbar /><ProductsPage /><Footer /></>} />
              <Route path="/portfolio" element={<><Navbar /><PortfolioPage /><Footer /></>} />
              <Route path="/portfolio/:slug" element={<><Navbar /><PortfolioPage /><Footer /></>} />
              <Route path="/blog" element={<><Navbar /><BlogPage /><Footer /></>} />
              <Route path="/blog/:slug" element={<><Navbar /><BlogPage /><Footer /></>} />
              <Route path="/developers" element={<><Navbar /><DevelopersPage /><Footer /></>} />
              <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
              <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicyPage /><Footer /></>} />
              <Route path="/terms" element={<><Navbar /><TermsPage /><Footer /></>} />
              <Route path="/faq" element={<><Navbar /><FaqPage /><Footer /></>} />
              <Route path="/status" element={<><Navbar /><StatusPage /><Footer /></>} />
              <Route path="/social-media" element={<><Navbar /><SocialMediaPage /><Footer /></>} />
              <Route path="/team" element={<><Navbar /><TeamPage /><Footer /></>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminLayout title="Dashboard" subtitle="Overview" activeTab="Dashboard"><DashboardPage /></AdminLayout>} />
              <Route path="/admin/projects" element={<AdminLayout title="Projects" subtitle="Portfolio" activeTab="Projects"><DashboardPage /></AdminLayout>} />
              <Route path="/admin/employees" element={<AdminLayout title="Employees" subtitle="People" activeTab="Employees"><Employees /></AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout title="Admin Settings" subtitle="Configuration" activeTab="Admin Settings"><Settings /></AdminLayout>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
