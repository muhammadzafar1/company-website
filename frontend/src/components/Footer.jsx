import { ArrowRight, Github, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="light-footer mt-24 border-t border-[var(--border-light)] bg-[var(--surface-light)] text-[var(--text-on-light-body)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white/5"> <span className="text-lg font-semibold text-brand-light">A</span> </div>
              <div>
                <div className="text-xl font-semibold text-text-onDark">AZ MEER</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-text-onDarkMuted">SMC-PRIVATE LIMITED</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-text-onDarkMuted">We build secure, scalable digital products and business systems that help organizations move faster and operate smarter.</p>
            <div className="mt-6 flex gap-3">
              {[Github, Linkedin, Instagram].map((Icon, index) => (
                <a key={index} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/5 text-text-onDarkMuted transition hover:border-brand hover:text-brand-light">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-onDark">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-text-onDarkMuted">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}><Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}` } className="hover:text-brand-light">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-onDark">Services</h4>
            <ul className="mt-5 space-y-3 text-text-onDarkMuted">
              {['Web Development', 'Mobile Apps', 'UI/UX', 'E-Commerce', 'Custom Software'].map((link) => (
                <li key={link}><Link to="/services" className="hover:text-brand-light">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-onDark">Newsletter</h4>
            <div className="mt-5 flex items-center gap-2 rounded-md border border-border bg-white/5 px-3 py-2">
              <Mail className="h-4 w-4 text-text-onDarkMuted" />
              <input type="email" placeholder="Your email" className="w-full bg-transparent text-sm text-text-onDark placeholder:text-text-onDarkMuted focus:outline-none" />
              <button className="rounded-md bg-brand p-2 text-white"><ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 space-y-3 text-sm text-text-onDarkMuted">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand-light" /> +92 300 0000000</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand-light" /> Lahore, Pakistan</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-text-onDarkMuted md:flex-row md:items-center md:justify-between">
          <span>© 2026 AZ MEER (SMC-PRIVATE) LIMITED. All Rights Reserved.</span>
          <span><Link to="/privacy-policy" className="hover:text-brand-light">Privacy Policy</Link> • <Link to="/terms" className="hover:text-brand-light">Terms of Service</Link></span>
        </div>
      </div>
    </footer>
  );
}
