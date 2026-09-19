import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta title="Privacy Policy" description="Privacy policy for AZ MEER website visitors and service users." path="/privacy-policy" />

      <main className="mx-auto max-w-4xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Privacy Policy" title="How we handle personal information" subtitle="This content is intentionally editable for company-specific legal review." align="left" />

        <div className="space-y-6 rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-8 text-[var(--text-onDarkMuted)]">
          <section>
            <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">Data Collection</h3>
            <p className="mt-3 leading-8">We collect information that visitors provide directly through forms, communications, and business inquiries. This may include names, email addresses, phone numbers, and company information.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">Data Usage</h3>
            <p className="mt-3 leading-8">We use collected information to respond to inquiries, deliver services, manage projects, improve communications, and maintain reliable internal operations.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">Data Storage</h3>
            <p className="mt-3 leading-8">Personal information is retained only as long as needed for business, legal, or operational purposes and may be stored in secure systems approved by the company.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">Cookies and Analytics</h3>
            <p className="mt-3 leading-8">We may use cookies and analytics tools to understand site usage patterns and improve user experience. You can disable cookies in your browser settings where applicable.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">Third-party Services</h3>
            <p className="mt-3 leading-8">We may use trusted third-party services to support hosting, analytics, or operational workflows. Their own privacy practices apply to any data processed through those services.</p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">User Rights</h3>
            <p className="mt-3 leading-8">Individuals may request access, correction, or deletion of personal data where legally applicable and where the company has the necessary operational basis to process the request.</p>
          </section>
        </div>
      </main>
    </>
  );
}
