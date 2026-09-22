import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import CursorFluid from './components/CursorFluid';
import ScrollReveal from './components/ScrollReveal';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import DevelopersPage from './pages/DevelopersPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import FaqPage from './pages/FaqPage';
import StatusPage from './pages/StatusPage';
import SocialMediaPage from './pages/SocialMediaPage';
import TeamPage from './pages/TeamPage';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import DashboardPage from './admin/DashboardPage';
import Employees from './admin/Employees';
import Settings from './admin/Settings';
import AIChatbot from './components/AIChatbot';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-transparent text-[var(--text-primary)] antialiased">
        <AnimatedBackground />
        <CursorFluid />
        <ScrollReveal />
        <AIChatbot />
        <div className="relative z-10 min-h-screen bg-transparent text-[var(--text-primary)]">
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
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
