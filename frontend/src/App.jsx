import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';
import Home from './pages/Home';
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
      <AnimatedBackground />
      <div className="relative min-h-screen bg-slate-950 text-slate-100">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/team" element={<Team />} />
          <Route path="/admin/testimonials" element={<Testimonials />} />
          <Route path="/admin/messages" element={<Messages />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
