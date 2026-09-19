import { LayoutDashboard, FolderKanban, Users, Settings2, LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { label: 'Employees', to: '/admin/employees', icon: Users },
  { label: 'Admin Settings', to: '/admin/settings', icon: Settings2 },
];

export default function AdminLayout({ title, subtitle, children, activeTab }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login', { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login', { replace: true });
  };

  const adminName = JSON.parse(localStorage.getItem('admin') || '{}')?.name || 'Admin';

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-on-light-heading)]">
      <div className="flex min-h-screen">
        <aside className="fixed left-0 top-0 flex h-screen w-[250px] flex-col bg-[var(--surface-dark)] px-5 py-6 shadow-[var(--shadow-hover)] text-[var(--text-on-dark-body)]">
          <div className="mb-8 flex items-center gap-3 border-b border-[var(--border-light)]/20 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-base font-bold text-[var(--on-accent)] shadow-lg shadow-[var(--accent-hover)]/30">
              SH
            </div>
            <div>
              <div className="text-base font-semibold text-[var(--text-on-dark-heading)]">Software House</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">Admin Panel</div>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => {
              const isActive = activeTab === label || location.pathname === to;

              return (
                <Link
                  key={label}
                  to={to}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--accent)] text-[var(--on-accent)] shadow-lg shadow-[var(--accent-hover)]/30 ring-1 ring-[var(--border-light)]/25'
                      : 'text-[var(--text-on-dark-body)] hover:bg-white/10 hover:text-[var(--text-on-dark-heading)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 rounded-2xl border border-[var(--border-light)]/20 bg-white/10 p-3">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--text-on-dark-muted)]">Logged in as</div>
            <div className="mt-2 text-sm font-semibold text-[var(--text-on-dark-heading)]">{adminName}</div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[var(--border-light)]/20 bg-white/10 px-3 py-2.5 text-sm font-medium text-[var(--text-on-dark-body)] transition hover:bg-white/15 hover:text-[var(--text-on-dark-heading)]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        <main className="ml-[250px] flex-1 p-6 md:p-8">
          <header className="mb-8 flex items-center justify-between gap-4 rounded-3xl border border-[var(--border-light)] bg-[var(--surface-light)] p-5 shadow-sm backdrop-blur-sm">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">{subtitle}</div>
              <h1 className="mt-2 text-3xl font-bold text-[var(--text-on-light-heading)]">{title}</h1>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-[var(--border-light)] bg-[var(--surface-light-hover)] px-3 py-2 text-sm font-medium text-[var(--text-on-light-heading)] md:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              Online
            </div>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
