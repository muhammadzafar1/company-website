import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const primaryNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Portfolio', href: '/portfolio' },
];

const moreNavItems = [
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Developers', href: '/developers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Social Media', href: '/social-media' },
  { label: 'System Status', href: '/status' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-[var(--border)] bg-[rgba(255,253,249,0.9)] backdrop-blur-sm' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 text-[var(--text-primary)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-[var(--panel)]">
            <span role="img" aria-label="AZ MEER logo" className="h-full w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${logo})` }} />
          </div>
          <div className="min-w-0">
            <div className="max-w-[210px] truncate text-sm font-semibold text-[var(--text-primary)] sm:max-w-none sm:text-base">AZ MEER SMC-PRIVATE LIMITED</div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Software House</div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {primaryNavItems.map((item) => (
            <Link key={item.label} to={item.href} className="text-sm text-[var(--text-primary)] transition hover:text-[var(--brand)]">
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button type="button" onClick={() => setMoreOpen((open) => !open)} className="inline-flex items-center gap-1 text-sm text-[var(--text-primary)] transition hover:text-[var(--brand)]" aria-expanded={moreOpen}>
              More <ChevronDown className={`h-4 w-4 transition ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-8 w-48 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light)] p-2 shadow-[var(--shadow-hover)]">
                {moreNavItems.map((item) => (
                  <Link key={item.label} to={item.href} onClick={() => setMoreOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--brand-dark)]">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/admin/login" className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]">Admin Login</Link>
          <Link to="/services" className="rounded-md border border-[var(--brand)] bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--on-accent)] transition hover:bg-[var(--brand-dark)]">Get a Quote</Link>
        </div>

        <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--panel)] text-[var(--text-primary)] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
          <div className="max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain border-t border-[var(--border)] bg-[var(--panel)] lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5">
              {primaryNavItems.map((item) => (
                <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--brand)]">
                  {item.label}
                </Link>
              ))}
              <button type="button" onClick={() => setMoreOpen((open) => !open)} className="flex items-center justify-between rounded-md px-3 py-2 text-left text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--brand)]" aria-expanded={moreOpen}>
                More <ChevronDown className={`h-4 w-4 transition ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && moreNavItems.map((item) => (
                <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="rounded-md px-6 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--brand)]">
                  {item.label}
                </Link>
              ))}
              <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text-primary)] hover:border-[var(--brand)] hover:text-[var(--brand)]">Admin Login</Link>
              <Link to="/services" onClick={() => setMobileOpen(false)} className="mt-2 rounded-md bg-[var(--brand)] px-4 py-3 text-center font-medium text-white">Get a Quote</Link>
            </div>
          </div>
      )}
    </header>
  );
}
