import { ArrowRight, Github, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-500/10"> <span className="text-lg font-semibold text-sky-200">S</span> </div>
              <div>
                <div className="text-xl font-semibold text-white">Step by Step</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Software House</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-slate-300">We build digital products and experiences that help businesses move faster, sell smarter, and scale with confidence.</p>
            <div className="mt-6 flex gap-3">
              {[Github, Linkedin, Instagram].map((Icon, index) => (
                <a key={index} href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-sky-400/30 hover:text-sky-200">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-slate-400">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:text-white">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Services</h4>
            <ul className="mt-5 space-y-3 text-slate-400">
              {['Web Development', 'Mobile Apps', 'UI/UX', 'E-Commerce', 'Custom Software'].map((link) => (
                <li key={link}><a href="#services" className="hover:text-white">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Newsletter</h4>
            <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-2">
              <Mail className="h-4 w-4 text-slate-400" />
              <input type="email" placeholder="Your email" className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none" />
              <button className="rounded-full bg-gradient-to-r from-[#0A84FF] to-[#2563EB] p-2 text-white"><ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-sky-300" /> +92 300 1234567</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-sky-300" /> Lahore, Pakistan</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Step by Step Software House. All Rights Reserved.</span>
          <span>Privacy Policy • Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
