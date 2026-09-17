import { ArrowRight, Github, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-100 bg-white"> <span className="text-lg font-semibold text-[#0A84FF]">A</span> </div>
              <div>
                <div className="text-xl font-semibold text-slate-900">AZ MEER</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">SMC-PRIVATE LIMITED</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-slate-600">We build secure, scalable digital products and business systems that help organizations move faster and operate smarter.</p>
            <div className="mt-6 flex gap-3">
              {[Github, Linkedin, Instagram].map((Icon, index) => (
                <a key={index} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-white text-slate-600 transition hover:border-[#0A84FF]/30 hover:text-[#0A84FF]">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-slate-600">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}><Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}` } className="hover:text-[#0A84FF]">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Services</h4>
            <ul className="mt-5 space-y-3 text-slate-600">
              {['Web Development', 'Mobile Apps', 'UI/UX', 'E-Commerce', 'Custom Software'].map((link) => (
                <li key={link}><Link to="/services" className="hover:text-[#0A84FF]">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Newsletter</h4>
            <div className="mt-5 flex items-center gap-2 rounded-md border border-gray-100 bg-white px-3 py-2">
              <Mail className="h-4 w-4 text-slate-400" />
              <input type="email" placeholder="Your email" className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none" />
              <button className="rounded-md bg-[#0A84FF] p-2 text-white"><ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#0A84FF]" /> +92 300 0000000</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#0A84FF]" /> Lahore, Pakistan</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-100 pt-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>© 2026 AZ MEER (SMC-PRIVATE) LIMITED. All Rights Reserved.</span>
          <span><Link to="/privacy-policy" className="hover:text-[#0A84FF]">Privacy Policy</Link> • <Link to="/terms" className="hover:text-[#0A84FF]">Terms of Service</Link></span>
        </div>
      </div>
    </footer>
  );
}
