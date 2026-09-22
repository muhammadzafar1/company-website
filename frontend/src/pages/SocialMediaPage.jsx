import { AtSign, BookOpen, Camera, ExternalLink, Facebook, Instagram, Linkedin, MapPin, Music2, Play, Rss, Youtube } from 'lucide-react';
import PageMeta from '../components/PageMeta';

const socialLinks = [
  { name: 'LinkedIn', handle: 'AZ MEER SMC (PRIVATE) LTD', description: 'Company news and professional updates.', url: 'https://www.linkedin.com/company/az-meer-smc-private-ltd/', icon: Linkedin, color: 'bg-[#0A66C2]' },
  { name: 'Facebook', handle: 'AZ MEER SMC PRIVATE LTD', description: 'Announcements, stories, and community.', url: 'https://www.facebook.com/AzMeerSmcPrivateLtd', icon: Facebook, color: 'bg-[#1877F2]' },
  { name: 'Instagram', handle: '@azmeer.smc.private.ltd', description: 'Visual moments from the team and our work.', url: 'https://www.instagram.com/azmeer.smc.private.ltd/', icon: Instagram, color: 'bg-[#C13584]' },
  { name: 'YouTube', handle: '@AzMeerSmcPrivateLtd', description: 'Product stories, demos, and technology videos.', url: 'https://www.youtube.com/@AzMeerSmcPrivateLtd', icon: Youtube, color: 'bg-[#FF0000]' },
  { name: 'Pinterest', handle: 'AZ MEER SMC PRIVATE LTD', description: 'Ideas, references, and visual inspiration.', url: 'https://www.pinterest.com/AzMeerSmcPrivateLtd/', icon: MapPin, color: 'bg-[#BD081C]' },
  { name: 'X', handle: '@AzMeerSmcPvtLtd', description: 'Quick thoughts, updates, and conversations.', url: 'https://x.com/AzMeerSmcPvtLtd', icon: AtSign, color: 'bg-[#111111]' },
  { name: 'TikTok', handle: '@azmeersmcprivateltd', description: 'Short-form ideas from our digital world.', url: 'https://www.tiktok.com/@azmeersmcprivateltd?lang=en', icon: Music2, color: 'bg-[#111111]' },
  { name: 'Medium', handle: '@AzMeerSmcPrivateLtd', description: 'Long-form thinking on products and engineering.', url: 'https://medium.com/@AzMeerSmcPrivateLtd', icon: BookOpen, color: 'bg-[#111111]' },
];

export default function SocialMediaPage() {
  return (
    <>
      <PageMeta title="Social Media" description="Follow AZ MEER across social media for company news, product updates, and technology insights." path="/social-media" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <section className="relative overflow-hidden border-y border-[var(--border-light)] py-14 md:py-20">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-[24px] border-[var(--accent)]/10" />
          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-dark)]"><Rss className="h-4 w-4" /> The AZ MEER network</div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.06em] text-[var(--text-on-light-heading)] md:text-7xl">Ideas in motion. <span className="text-[var(--brand-dark)]">Everywhere.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-on-light-body)]">Follow AZ MEER for product launches, engineering perspectives, behind-the-scenes work, and the next chapter of our technology story.</p>
            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[var(--text-on-light-muted)]"><Camera className="h-4 w-4 text-[var(--brand-dark)]" /> Eight channels, one point of view.</div>
          </div>
        </section>

        <section className="pt-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-dark)]">Find your feed</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-on-light-heading)]">Choose your platform</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-[var(--text-on-light-muted)] md:block">News, visuals, conversations, and deeper thinking from the same team.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {socialLinks.map(({ name, handle, description, url, icon: Icon, color }, index) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" className={`light-card group rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-6 ${index === 0 || index === 3 ? 'xl:col-span-2' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_rgba(43,26,16,0.14)] ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-[var(--text-on-light-muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand-dark)]" />
                </div>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-on-light-heading)]">{name}</h3>
                    <p className="mt-2 break-words text-sm font-medium text-[var(--brand-dark)]">{handle}</p>
                  </div>
                  <span className="hidden text-3xl font-semibold text-[var(--border-light)] sm:block">0{index + 1}</span>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--text-on-light-muted)]">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--link-on-light)]">Open profile <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
