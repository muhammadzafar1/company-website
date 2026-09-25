import { ArrowRight, CheckCircle2, Code2, Database, Globe, Layers3, LockKeyhole, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';

const services = [
  {
    title: 'Web application development',
    description: 'Responsive web applications with clear user journeys, reliable APIs, and maintainable frontend architecture.',
    icon: Globe,
  },
  {
    title: 'Mobile application development',
    description: 'Cross-platform mobile products for Android and iOS, including authentication, notifications, and API integrations.',
    icon: Smartphone,
  },
  {
    title: 'Custom business software',
    description: 'Internal tools, dashboards, portals, and workflow systems that help teams reduce manual work and operate with confidence.',
    icon: Layers3,
  },
  {
    title: 'Application modernization',
    description: 'Performance, security, and architecture improvements for existing applications that need a dependable next stage.',
    icon: Zap,
  },
];

const process = [
  ['Discover', 'We clarify the users, business goals, requirements, risks, and success measures before development begins.'],
  ['Design', 'We shape the information architecture, user experience, interface direction, and technical approach.'],
  ['Build', 'We develop the application in focused increments with tested APIs, responsive interfaces, and clear progress.'],
  ['Launch and improve', 'We support deployment, monitoring, optimization, maintenance, and the next useful product iteration.'],
];

const faqs = [
  ['What does an application developer do?', 'An application developer designs, builds, tests, deploys, and improves software applications for web, mobile, and business workflows.'],
  ['Can AZ MEER build a custom application?', 'Yes. AZ MEER builds custom web applications, mobile applications, dashboards, APIs, and business systems around a company\'s requirements.'],
  ['What technologies do you use?', 'Our application development work commonly uses React, JavaScript, Node.js, Express, MongoDB, REST APIs, Flutter, and cloud deployment tools.'],
  ['Do you work with companies in Lahore and Pakistan?', 'Yes. AZ MEER is based in Lahore, Pakistan, and works with local and international organizations on application development and digital product delivery.'],
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://azmeer.tech/application-developer#service',
      name: 'Application Developer Services',
      serviceType: 'Application development',
      description: 'Custom web, mobile, and business application development by AZ MEER SMC-PRIVATE LIMITED in Lahore, Pakistan.',
      provider: {
        '@type': 'Organization',
        name: 'AZ MEER SMC-PRIVATE LIMITED',
        url: 'https://azmeer.tech/',
      },
      areaServed: ['Lahore', 'Pakistan', 'Worldwide'],
      url: 'https://azmeer.tech/application-developer',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://azmeer.tech/application-developer#faq',
      mainEntity: faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
};

export default function ApplicationDeveloperPage() {
  return (
    <>
      <PageMeta
        title="Application Developer in Lahore"
        description="AZ MEER is an application developer in Lahore, Pakistan, building custom web applications, mobile apps, APIs, dashboards, and business software."
        keywords="application developer, application developer Lahore, application development company Pakistan, web application developer, mobile application developer, custom software developer, business software development"
        path="/application-developer"
        structuredData={structuredData}
      />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <section className="grid gap-10 pb-20 pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-dark)]">Application development in Lahore</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-[var(--text-on-light-heading)] md:text-7xl">Application developer for useful, reliable digital products.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-on-light-body)]">AZ MEER SMC-PRIVATE LIMITED designs, builds, tests, and maintains web applications, mobile apps, APIs, dashboards, and custom business software for organizations in Lahore, Pakistan, and beyond.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact"><Button>Discuss an application <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link to="/portfolio"><Button variant="secondary">View application work</Button></Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-7 shadow-[var(--shadow-card)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--brand-dark)]"><Code2 className="h-6 w-6" /></div>
            <h2 className="mt-6 text-2xl font-semibold text-[var(--text-on-light-heading)]">From application idea to dependable software</h2>
            <p className="mt-4 leading-7 text-[var(--text-on-light-body)]">Good application development connects user needs, business outcomes, thoughtful design, secure engineering, and long-term support. That is the work we bring together in one delivery partner.</p>
          </div>
        </section>

        <section className="border-y border-[var(--border-light)] py-20">
          <SectionTitle eyebrow="Application developer services" title="Build the right application for the job" subtitle="A focused development partner for products that need clarity, speed, and room to grow." />
          <div className="grid gap-6 md:grid-cols-2">
            {services.map(({ title, description, icon: Icon }) => (
              <article key={title} className="light-card rounded-[1.75rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--brand-dark)]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-2xl font-semibold text-[var(--text-on-light-heading)]">{title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-on-light-body)]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-dark)]">How we work</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--text-on-light-heading)]">A practical application development process</h2>
            <p className="mt-5 leading-7 text-[var(--text-on-light-body)]">Whether you need a first version, a customer-facing platform, or improvements to an existing system, the process stays transparent and outcome-focused.</p>
          </div>
          <div className="space-y-4">
            {process.map(([title, description], index) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light)] p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--on-accent)]">{index + 1}</span>
                <div><h3 className="text-xl font-semibold text-[var(--text-on-light-heading)]">{title}</h3><p className="mt-2 leading-7 text-[var(--text-on-light-body)]">{description}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--border-light)] py-20">
          <SectionTitle eyebrow="Technology and quality" title="Application development with a stable technical foundation" subtitle="We choose tools that help teams ship confidently and maintain software after launch." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [Database, 'Data and APIs', 'Node.js, Express, MongoDB, REST APIs, authentication, and integrations.'],
              [LockKeyhole, 'Security-minded delivery', 'Protected routes, careful data handling, validation, and maintainable access control.'],
              [CheckCircle2, 'Testable outcomes', 'Responsive interfaces, error handling, deployment checks, and ongoing technical support.'],
            ].map(([Icon, title, description]) => (
              <div key={title} className="rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-6 text-center">
                <Icon className="mx-auto h-6 w-6 text-[var(--brand-dark)]" />
                <h3 className="mt-4 text-xl font-semibold text-[var(--text-on-light-heading)]">{title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-on-light-body)]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <SectionTitle eyebrow="Questions" title="Application developer FAQs" subtitle="Clear answers before you begin a software project." />
          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light)] p-6">
                <h3 className="text-xl font-semibold text-[var(--text-on-light-heading)]">{question}</h3>
                <p className="mt-3 leading-7 text-[var(--text-on-light-body)]">{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[var(--surface-dark)] p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">Start with a useful conversation</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold text-[var(--text-on-dark-heading)] md:text-5xl">Looking for an application developer?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[var(--text-on-dark-body)]">Share your goals, target users, preferred platform, and timeline. We will help you shape a practical next step.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center rounded-md bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--on-accent)]">Contact AZ MEER <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </section>
      </main>
    </>
  );
}
