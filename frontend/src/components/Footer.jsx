import { ArrowRight, Github, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--dark-surface)] text-[var(--text-light)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[rgba(255,255,255,0.04)]"> <span className="text-lg font-semibold text-[var(--brand-light)]">A</span> </div>
              <div>
                <div className="text-xl font-semibold text-[var(--text-light)]">AZ MEER</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-soft)]">SMC-PRIVATE LIMITED</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-[var(--text-soft)]">We build secure, scalable digital products and business systems that help organizations move faster and operate smarter.</p>
            <div className="mt-6 flex gap-3">
              {[Github, Linkedin, Instagram].map((Icon, index) => (
                <a key={index} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.04)] text-[var(--text-soft)] transition hover:border-[var(--brand)]/30 hover:text-[var(--brand-light)]">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-light)]">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-[var(--text-soft)]">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}><Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}` } className="hover:text-[var(--brand-light)]">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-light)]">Services</h4>
            <ul className="mt-5 space-y-3 text-[var(--text-soft)]">
              {['Web Development', 'Mobile Apps', 'UI/UX', 'E-Commerce', 'Custom Software'].map((link) => (
                <li key={link}><Link to="/services" className="hover:text-[var(--brand-light)]">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-light)]">Newsletter</h4>
            <div className="mt-5 flex items-center gap-2 rounded-md border border-[var(--border)] bg-[rgba(255,255,255,0.04)] px-3 py-2">
              <Mail className="h-4 w-4 text-[var(--text-soft)]" />
              <input type="email" placeholder="Your email" className="w-full bg-transparent text-sm text-[var(--text-light)] placeholder:text-[var(--text-soft)] focus:outline-none" />
              <button className="rounded-md bg-[var(--brand)] p-2 text-white"><ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 space-y-3 text-sm text-[var(--text-soft)]">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[var(--brand-light)]" /> +92 300 0000000</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[var(--brand-light)]" /> Lahore, Pakistan</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-soft)] md:flex-row md:items-center md:justify-between">
          <span>© 2026 AZ MEER (SMC-PRIVATE) LIMITED. All Rights Reserved.</span>
          <span><Link to="/privacy-policy" className="hover:text-[var(--brand-light)]">Privacy Policy</Link> • <Link to="/terms" className="hover:text-[var(--brand-light)]">Terms of Service</Link></span>
        </div>
      </div>
    </footer>
  );
}
