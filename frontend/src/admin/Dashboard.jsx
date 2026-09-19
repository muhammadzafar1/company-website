import { useEffect, useState } from 'react';
import { BarChart3, FileText, ImageIcon, LogOut, MessageSquareText, Settings, Users } from 'lucide-react';
import api, { unwrapApiData } from '../api/api';

const navItems = [
  { label: 'Dashboard', icon: BarChart3 },
  { label: 'Projects', icon: FileText },
  { label: 'Services', icon: ImageIcon },
  { label: 'Team', icon: Users },
  { label: 'Testimonials', icon: BarChart3 },
  { label: 'Messages', icon: MessageSquareText },
  { label: 'Settings', icon: Settings },
  { label: 'Logout', icon: LogOut },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, services: 0, team: 0, messages: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    const fetchStats = async () => {
      console.log('Dashboard fetchStats started');

      try {
        const [projects, services, team, contacts] = await Promise.all([
          api.get('/projects'),
          api.get('/services'),
          api.get('/team'),
          api.get('/contact'),
        ]);

        console.log('Dashboard stats response received', { projects, services, team, contacts });

        setStats({
          projects: unwrapApiData(projects, 'projects').length,
          services: unwrapApiData(services, 'services').length,
          team: unwrapApiData(team, 'team').length,
          messages: unwrapApiData(contacts, 'contacts').length,
        });
      } catch (error) {
        console.error('Dashboard fetchStats failed:', error.response?.data || error.message || error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-8 px-4 py-8 md:px-6">
      <aside className="hidden w-72 rounded-[1.5rem] border border-border bg-dark p-5 lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-semibold text-white">S</div>
          <div>
            <div className="text-lg font-semibold text-text-onDark">Step by Step</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-text-onDarkMuted">Admin</div>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className="flex w-full items-center gap-3 rounded-2xl border border-transparent bg-dark-card/60 px-3 py-3 text-left text-text-onDarkMuted transition hover:bg-brand hover:text-white">
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.22em] text-brand-light">Overview</div>
            <h1 className="mt-2 text-3xl font-semibold text-text-primary">Dashboard</h1>
          </div>
          <button type="button" onClick={() => { console.log('Logout button clicked'); localStorage.removeItem('token'); window.location.href = '/admin/login'; }} className="rounded-full border border-border bg-white px-4 py-2 text-sm text-text-primary">Logout</button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Projects', value: stats.projects },
            { label: 'Services', value: stats.services },
            { label: 'Team', value: stats.team },
            { label: 'Messages', value: stats.messages },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-border bg-white p-6 shadow-sm">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted">{item.label}</div>
              <div className="mt-4 text-3xl font-semibold text-text-primary">{item.value}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
