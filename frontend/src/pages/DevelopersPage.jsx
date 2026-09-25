import { CheckCircle2, Code2, Globe, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import { developerSections } from '../data/siteContent';

const endpoints = [
  { name: 'GET /api/health', description: 'Application and database readiness check.' },
  { name: 'POST /api/admin/login', description: 'Authenticate admin users and receive a JWT token.' },
  { name: 'GET /api/projects', description: 'Retrieve public project listings.' },
  { name: 'GET /api/services', description: 'Retrieve service offerings.' },
  { name: 'POST /api/contact', description: 'Submit inquiry or contact form message.' },
];

export default function DevelopersPage() {
  return (
    <>
      <PageMeta title="Developers" description="Developer resources, API docs, and integration guidance for AZ MEER systems." path="/developers" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Developer / API Portal" title="Developer documentation for integration and product growth" subtitle="A clean starting point for API consumers, internal teams, and technical partners." align="left" />

        <div className="mb-10 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light)] p-5 text-[var(--text-on-light-body)]">
          Building a web or mobile product? Explore our <Link to="/application-developer" className="font-semibold text-[var(--link-on-light)] underline">application developer services</Link> for custom applications, APIs, dashboards, and business software.
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {developerSections.map((section) => (
            <div key={section.title} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--dark-surface)] p-6">
              <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">{section.title}</h3>
              <p className="mt-4 text-[var(--text-onDarkMuted)]">{section.body}</p>
            </div>
          ))}
        </div>

        <section className="mt-20 rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-8">
          <div className="mb-6 flex items-center gap-3">
            <Code2 className="h-5 w-5 text-[var(--brand-light)]" />
            <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">API endpoints</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {endpoints.map((endpoint) => {
              const [method, ...pathParts] = endpoint.name.split(' ');
              const path = pathParts.join(' ');
              const isPost = method === 'POST';

              return (
                <div
                  key={endpoint.name}
                  className="rounded-2xl border border-[#E8D5BF] bg-[#FFF8F0] p-4 text-[#4A2E1D] shadow-[0_8px_18px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-[3px] hover:border-[#E0A96D]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-1 text-[11px] uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: isPost ? '#FBDDB5' : '#D4EDD6',
                        color: isPost ? '#7A3A00' : '#14501F',
                        fontWeight: 600,
                      }}
                    >
                      {method}
                    </span>
                    <span
                      className="block"
                      style={{
                        color: '#1F110A',
                        fontWeight: 600,
                        fontSize: '15px',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
                      }}
                    >
                      {path}
                    </span>
                  </div>
                  <p
                    className="mt-2"
                    style={{
                      color: '#4A2E1D',
                      opacity: 1,
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.55,
                    }}
                  >
                    {endpoint.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--dark-surface)] p-6">
            <LockKeyhole className="h-5 w-5 text-[var(--brand-light)]" />
            <h3 className="mt-4 text-xl font-semibold text-[var(--text-onDark)]">Authentication</h3>
            <p className="mt-3 text-[var(--text-onDarkMuted)]">Protected routes require a valid bearer token in the Authorization header.</p>
          </div>
          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--dark-surface)] p-6">
            <Globe className="h-5 w-5 text-[var(--brand-light)]" />
            <h3 className="mt-4 text-xl font-semibold text-[var(--text-onDark)]">Base URL</h3>
            <p className="mt-3 text-[var(--text-onDarkMuted)]">http://localhost:5000/api</p>
          </div>
          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--dark-surface)] p-6">
            <CheckCircle2 className="h-5 w-5 text-[var(--brand-light)]" />
            <h3 className="mt-4 text-xl font-semibold text-[var(--text-onDark)]">Status</h3>
            <p className="mt-3 text-[var(--text-onDarkMuted)]">Demo-configurable status values are available for environment-based deployment checks.</p>
          </div>
        </section>
      </main>
    </>
  );
}
