import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';

export default function TermsPage() {
  return (
    <>
      <PageMeta title="Terms of Service" description="Terms of service for AZ MEER website visitors and clients." path="/terms" />

      <main className="mx-auto max-w-4xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Terms of Service" title="Website terms and service expectations" subtitle="This draft is intended to be reviewed and updated by legal and company stakeholders before publication." align="left" />

        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 text-slate-300">
          <section>
            <h3 className="text-2xl font-semibold text-white">Terms of Use</h3>
            <p className="mt-3 leading-8">By using this website, you agree to use it in a lawful manner and for legitimate business or information purposes. Content on this website is provided for general informational use.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-white">Intellectual Property</h3>
            <p className="mt-3 leading-8">All materials displayed on the website remain the property of AZ MEER or their relevant owners unless otherwise stated. Reproduction or distribution without permission is prohibited.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-white">Service Agreements</h3>
            <p className="mt-3 leading-8">Any project engagement is governed by separate written agreements, scope documents, pricing arrangements, and delivery milestones established between the company and the client.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-white">Limitation of Liability</h3>
            <p className="mt-3 leading-8">The company disclaims liability for indirect, incidental, or consequential damages arising from website use or project-related decisions, except where explicitly required by law or contract.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-white">Termination</h3>
            <p className="mt-3 leading-8">The company may suspend or restrict access to services where required for integrity, compliance, contractual obligations, or operational security.</p>
          </section>
        </div>
      </main>
    </>
  );
}
