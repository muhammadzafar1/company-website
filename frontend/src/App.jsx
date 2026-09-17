import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
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
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import Projects from './admin/Projects';
import Services from './admin/Services';
import Team from './admin/Team';
import Testimonials from './admin/Testimonials';
import Messages from './admin/Messages';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="pointer-events-none fixed left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.22),_rgba(168,85,247,0.12),_rgba(14,165,233,0)_68%)] blur-3xl" />
        <div className="pointer-events-none fixed inset-x-0 top-6 z-30 flex justify-center">
          <div className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-600 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            Vite + Tailwind
          </div>
        </div>
        <AnimatedBackground />
        <div className="relative min-h-screen bg-slate-950 text-slate-100">
          <Routes>
            <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/admin/services" element={<Services />} />
            <Route path="/admin/team" element={<Team />} />
            <Route path="/admin/testimonials" element={<Testimonials />} />
            <Route path="/admin/messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
