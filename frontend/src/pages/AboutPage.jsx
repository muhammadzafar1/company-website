import { motion } from 'framer-motion';
import { Award, Briefcase, Building2, Clock3, Compass, Target, Users } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import { companyValues, leadership, milestones } from '../data/siteContent';

const stats = [
  { label: 'Projects', value: '50+', icon: Briefcase },
  { label: 'Applications', value: '20+', icon: Building2 },
  { label: 'Clients', value: '30+', icon: Users },
  { label: 'Technologies', value: '12+', icon: Compass },
  { label: 'Experience', value: '6+ yrs', icon: Clock3 },
];

export default function AboutPage() {
  return (
    <>
      <PageMeta title="About" description="Learn about AZ MEER, leadership, company history, values, and our technology-first approach." path="/about" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="About Us" title="A technology-driven company built for growth, reliability, and delivery" subtitle="AZ MEER SMC-PRIVATE LIMITED focuses on digital product design, software architecture, and business system modernization." align="left" />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-8 text-[var(--text-onDarkMuted)]">
            <p className="text-lg leading-8">We support organizations through product planning, engineering, UI/UX design, and operational digital transformation. Our work combines strong technical execution with practical business understanding.</p>
            <p className="mt-5 leading-8">Our approach focuses on long-term product health, security-minded development, and clear communication from discovery to deployment and ongoing support.</p>
          </div>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--brand)]/25 bg-[var(--brand)]/10 text-[var(--brand)]">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Business objectives</h3>
            <ul className="mt-5 space-y-3 text-[var(--text-primary)]">
              <li>• Build resilient digital products with clear business value</li>
              <li>• Improve operational efficiency and customer experience</li>
              <li>• Support long-term digital growth with maintainable systems</li>
            </ul>
          </div>
        </div>

        <section className="mt-20">
          <SectionTitle eyebrow="Executive Leadership" title="Leadership built around clarity, execution, and trust" subtitle="Placeholder profiles are included to support future company updates and personalization." />

          <div className="grid gap-6 lg:grid-cols-2">
            {leadership.map((person, index) => (
              <motion.div key={person.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand)]/15 text-lg font-semibold text-[var(--text-onDark)]">{person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">{person.name}</h3>
                    <p className="text-[var(--brand-light)]">{person.title}</p>
                  </div>
                </div>
                <p className="mt-5 text-[var(--text-onDarkMuted)]">{person.bio}</p>
                <div className="mt-5 grid gap-3 text-sm text-[var(--text-onDarkMuted)]">
                  <p><span className="font-semibold text-[var(--text-onDark)]">Experience:</span> {person.experience}</p>
                  <p><span className="font-semibold text-[var(--text-onDark)]">Skills:</span> {person.skills.join(', ')}</p>
                  <p><span className="font-semibold text-[var(--text-onDark)]">Leadership philosophy:</span> {person.philosophy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle eyebrow="Achievements" title="Configurable company metrics and milestones" subtitle="These counters are placeholders so the company can update them when verified numbers are available." />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--dark-surface)] p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)]/10 text-[var(--brand-light)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-3xl font-semibold text-[var(--text-onDark)]">{value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--text-onDarkMuted)]">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle eyebrow="Core Values" title="The principles that guide how we work" subtitle="A practical framework for delivery, trust, and sustainable growth." />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {companyValues.map((value) => (
              <div key={value} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--dark-surface)] p-5 text-center text-lg font-medium text-[var(--text-onDark)]">{value}</div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle eyebrow="Company History" title="Milestones and evolution" subtitle="A simple timeline for foundational progress and business growth." />

          <div className="relative">
            <div className="absolute left-[22px] top-0 hidden h-full w-px bg-gradient-to-b from-[var(--brand)] to-transparent md:block" />
            <div className="space-y-6">
              {milestones.map((item, index) => (
                <div key={item.title} className="relative grid gap-4 md:grid-cols-[80px_1fr] md:items-center">
                  <div className="z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand)]/25 bg-[var(--brand)]/10 text-sm font-semibold text-[var(--brand-light)] md:ml-0">{index + 1}</div>
                  <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--dark-surface)] p-5 text-[var(--text-onDark)]">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--brand-light)]">{item.year}</div>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--text-onDark)]">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle eyebrow="Certifications / Compliance" title="Professional standards and recognition" subtitle="Only verified certifications should be displayed. Placeholder content remains editable." />
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-8 text-[var(--text-onDarkMuted)]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)]/10 text-[var(--brand-light)]">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-onDark)]">PSEB Certification</h3>
                <p className="mt-1 text-sm text-[var(--text-onDarkMuted)]">Display only when official, verified assets are available.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
