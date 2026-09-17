import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Developers', href: '/developers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 border-b' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 text-[#0f172a]">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white">
            <Code2 className="h-5 w-5 text-[#0A84FF]" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-[-0.04em]">Step by Step</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Software House</div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="text-sm text-slate-700 transition hover:text-[#0A84FF]">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/admin/login" className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-gray-50">Login</Link>
          <Link to="/services" className="rounded-md border border-[#0A84FF] bg-[#0A84FF] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95">Get a Quote</Link>
        </div>

        <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[#0f172a] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="border-t border-gray-100 bg-white lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5">
              {navItems.map((item) => (
                <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-slate-700 hover:bg-gray-50 hover:text-[#0A84FF]">
                  {item.label}
                </Link>
              ))}
              <Link to="/services" onClick={() => setMobileOpen(false)} className="mt-2 rounded-md bg-[#0A84FF] px-4 py-3 text-center font-medium text-white">Get a Quote</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
