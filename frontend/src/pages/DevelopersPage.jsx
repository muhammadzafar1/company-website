import { CheckCircle2, Code2, Globe, LockKeyhole } from 'lucide-react';
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

        <div className="grid gap-6 lg:grid-cols-2">
          {developerSections.map((section) => (
            <div key={section.title} className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
              <p className="mt-4 text-slate-300">{section.body}</p>
            </div>
          ))}
        </div>

        <section className="mt-20 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
          <div className="mb-6 flex items-center gap-3">
            <Code2 className="h-5 w-5 text-emerald-200" />
            <h3 className="text-2xl font-semibold text-white">API endpoints</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {endpoints.map((endpoint) => (
              <div key={endpoint.name} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-slate-300">
                <div className="font-semibold text-emerald-200">{endpoint.name}</div>
                <p className="mt-2 text-sm">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
            <LockKeyhole className="h-5 w-5 text-emerald-200" />
            <h3 className="mt-4 text-xl font-semibold text-white">Authentication</h3>
            <p className="mt-3 text-slate-300">Protected routes require a valid bearer token in the Authorization header.</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
            <Globe className="h-5 w-5 text-emerald-200" />
            <h3 className="mt-4 text-xl font-semibold text-white">Base URL</h3>
            <p className="mt-3 text-slate-300">http://localhost:5000/api</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
            <CheckCircle2 className="h-5 w-5 text-emerald-200" />
            <h3 className="mt-4 text-xl font-semibold text-white">Status</h3>
            <p className="mt-3 text-slate-300">Demo-configurable status values are available for environment-based deployment checks.</p>
          </div>
        </section>
      </main>
    </>
  );
}
