import { useEffect, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, Github, Linkedin, Mail, MapPin, Phone, Sparkles, Twitter } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import api, { unwrapApiData } from '../api/api';

const fallbackTeamMembers = [
  {
    name: 'Ayesha Khan',
    role: 'Full Stack Developer',
    label: 'Engineering',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85',
    shortBio: 'Builds reliable product experiences from the first interface to the final API.',
    about: 'Ayesha turns complex product requirements into clear, dependable digital experiences. She works across frontend architecture, backend services, and the small details that make software feel calm to use.',
    location: 'Lahore, Pakistan',
    email: 'ayesha@azmeer.com',
    phone: '+92 3328657885',
    experience: '6+ years',
    availability: 'Available for product engineering projects',
    skills: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'System Design'],
    focus: ['Product architecture', 'API design', 'Performance', 'Technical mentoring'],
    portfolio: ['AZ MEER Business Suite', 'Field Connect', 'Rapid Commerce'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Musa Ali',
    role: 'Frontend Developer',
    label: 'Engineering',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
    shortBio: 'Creates fast, expressive interfaces that stay accessible and easy to maintain.',
    about: 'Musa specializes in turning product direction into polished interfaces. His work balances motion, responsiveness, accessibility, and a practical component system that teams can grow with.',
    location: 'Islamabad, Pakistan',
    email: 'musa@azmeer.com',
    phone: '+92 3328657885',
    experience: '5+ years',
    availability: 'Available for frontend and design-system work',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Accessibility'],
    focus: ['Interaction design', 'Design systems', 'Responsive UI', 'Frontend quality'],
    portfolio: ['Mezzy Mobile App', 'Luma Retail Journey', 'AZ MEER Web Platform'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Sara Malik',
    role: 'Backend Developer',
    label: 'Engineering',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85',
    shortBio: 'Designs secure services and data flows that keep growing products dependable.',
    about: 'Sara works behind the interface on APIs, data models, authentication, and service reliability. She brings a security-minded approach to systems that need to remain understandable under pressure.',
    location: 'Lahore, Pakistan',
    email: 'sara@azmeer.com',
    phone: '+92 3328657885',
    experience: '5+ years',
    availability: 'Available for backend and platform projects',
    skills: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Security'],
    focus: ['API architecture', 'Data modeling', 'Authentication', 'Observability'],
    portfolio: ['Operations Dashboard', 'Secure Client Portal', 'Field Connect API'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Zain Ahmed',
    role: 'UI/UX Designer',
    label: 'Design',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85',
    shortBio: 'Shapes clear product journeys through research, systems, and thoughtful visual direction.',
    about: 'Zain helps teams find the simplest useful path through a product. He connects user research, content hierarchy, visual design, and prototyping to create interfaces with a clear reason behind every decision.',
    location: 'Karachi, Pakistan',
    email: 'zain@azmeer.com',
    phone: '+92 3328657885',
    experience: '7+ years',
    availability: 'Available for discovery and product design engagements',
    skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems', 'Product Strategy'],
    focus: ['User journeys', 'Wireframes', 'Visual systems', 'Usability testing'],
    portfolio: ['NextWave Health', 'Mezzy Mobile App', 'Luma Retail Journey'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Nadia Hassan',
    role: 'Project Manager',
    label: 'Delivery',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    shortBio: 'Keeps ambitious digital work focused, transparent, and moving toward a useful launch.',
    about: 'Nadia connects client goals with the daily rhythm of delivery. She makes scope visible, keeps decisions moving, and helps multidisciplinary teams turn uncertainty into an actionable plan.',
    location: 'Lahore, Pakistan',
    email: 'nadia@azmeer.com',
    phone: '+92 3328657885',
    experience: '8+ years',
    availability: 'Available for product planning and delivery leadership',
    skills: ['Roadmaps', 'Agile Delivery', 'Client Success', 'Planning', 'Quality Assurance'],
    focus: ['Discovery workshops', 'Delivery planning', 'Stakeholder alignment', 'Team operations'],
    portfolio: ['UrbanOps', 'AZ MEER Business Suite', 'NextWave Health'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
];

const socialItems = [
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'github', label: 'GitHub', icon: Github },
  { key: 'twitter', label: 'X / Twitter', icon: Twitter },
];

const normalizeMember = (member, index) => {
  const fallback = fallbackTeamMembers[index % fallbackTeamMembers.length];
  return {
    ...fallback,
    ...member,
    role: member.position || member.role || fallback.role,
    label: member.label || fallback.label,
    shortBio: member.shortBio || fallback.shortBio,
    about: member.about || fallback.about,
    location: member.location || fallback.location,
    email: member.email || fallback.email,
    phone: member.phone || fallback.phone,
    experience: member.experience || fallback.experience,
    availability: member.availability || fallback.availability,
    skills: Array.isArray(member.skills) && member.skills.length ? member.skills : fallback.skills,
    focus: Array.isArray(member.focus) && member.focus.length ? member.focus : fallback.focus,
    portfolio: Array.isArray(member.portfolio) && member.portfolio.length ? member.portfolio : fallback.portfolio,
    socials: { ...fallback.socials, ...(member.socialLinks || {}), ...(member.socials || {}) },
  };
};

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(fallbackTeamMembers);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedMember = teamMembers[selectedIndex];

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await api.get('/team');
        const members = unwrapApiData(response, 'team');
        if (Array.isArray(members) && members.length) {
          setTeamMembers(members.slice(0, 5).map(normalizeMember));
        }
      } catch (error) {
        console.error('Unable to load public team profiles', error);
      }
    };

    loadTeam();
  }, []);

  return (
    <>
      <PageMeta title="Team" description="Meet the people behind AZ MEER, including our engineering, design, and delivery specialists." path="/team" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <section className="border-b border-[var(--border-light)] pb-14 pt-4 md:pb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-dark)]">The people behind the work</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-[var(--text-on-light-heading)] md:text-7xl">Small team. Serious craft. <span className="text-[var(--brand-dark)]">Useful outcomes.</span></h1>
            <p className="max-w-md text-lg leading-8 text-[var(--text-on-light-body)]">Meet the engineers, designer, and delivery lead who turn ambitious ideas into products people can rely on.</p>
          </div>
        </section>

        <section className="grid gap-8 pt-14 lg:grid-cols-[0.85fr_1.4fr] lg:items-start">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-dark)]">Our team</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-on-light-heading)]">Select a profile</h2>
              </div>
              <span className="text-sm text-[var(--text-on-light-muted)]">0{teamMembers.length} members</span>
            </div>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <button type="button" key={member.name} onClick={() => setSelectedIndex(index)} className={`group flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition ${selectedIndex === index ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-[var(--shadow-card)]' : 'border-[var(--border-light)] bg-[var(--surface-light)] hover:border-[var(--accent)]/70'}`}>
                  <img src={member.image} alt={`${member.name} portrait`} width="64" height="64" loading="lazy" decoding="async" className="h-16 w-16 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-lg font-semibold text-[var(--text-on-light-heading)]">{member.name}</span>
                    <span className="mt-1 block text-sm text-[var(--text-on-light-muted)]">{member.role}</span>
                  </span>
                  <ArrowUpRight className={`h-4 w-4 text-[var(--text-on-light-muted)] transition ${selectedIndex === index ? 'translate-x-0.5 text-[var(--brand-dark)]' : 'group-hover:translate-x-0.5'}`} />
                </button>
              ))}
            </div>
          </div>

          <article className="light-card overflow-hidden rounded-[2rem] border border-[var(--border-light)] bg-[var(--surface-light)]">
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="relative min-h-[340px] md:min-h-full">
                <img src={selectedMember.image} alt={selectedMember.name} width="720" height="720" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(43,26,16,0.72)] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{selectedMember.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{selectedMember.name}</p>
                </div>
              </div>
              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-dark)]">{selectedMember.role}</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-on-light-heading)]">Profile</h2>
                  </div>
                  <div className="flex gap-2">
                    {socialItems.map(({ key, label, icon: Icon }) => (
                      <a key={key} href={selectedMember.socials[key]} aria-label={`${selectedMember.name} on ${label}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-light)] text-[var(--text-on-light-muted)] transition hover:border-[var(--accent)] hover:text-[var(--brand-dark)]"><Icon className="h-4 w-4" /></a>
                    ))}
                  </div>
                </div>

                <p className="mt-6 text-base leading-7 text-[var(--text-on-light-body)]">{selectedMember.about}</p>

                <div className="mt-7 grid gap-4 border-y border-[var(--border-light)] py-5 sm:grid-cols-2">
                  <div className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-dark)]" /><span className="text-sm text-[var(--text-on-light-body)]">{selectedMember.location}</span></div>
                  <div className="flex gap-3"><BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-dark)]" /><span className="text-sm text-[var(--text-on-light-body)]">{selectedMember.experience} experience</span></div>
                  <a href={`mailto:${selectedMember.email}`} className="flex gap-3 text-sm text-[var(--link-on-light)] hover:text-[var(--link-on-light-hover)]"><Mail className="mt-0.5 h-4 w-4 shrink-0" />{selectedMember.email}</a>
                  <a href={`tel:${selectedMember.phone.replaceAll(' ', '')}`} className="flex gap-3 text-sm text-[var(--link-on-light)] hover:text-[var(--link-on-light-hover)]"><Phone className="mt-0.5 h-4 w-4 shrink-0" />{selectedMember.phone}</a>
                </div>

                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  <div><h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-on-light-heading)]">Specialties</h3><div className="mt-3 flex flex-wrap gap-2">{selectedMember.skills.map((skill) => <span key={skill} className="rounded-full border border-[var(--border-light)] bg-[var(--bg-page)] px-3 py-1.5 text-xs text-[var(--text-on-light-body)]">{skill}</span>)}</div></div>
                  <div><h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-on-light-heading)]">Current focus</h3><ul className="mt-3 space-y-2 text-sm text-[var(--text-on-light-body)]">{selectedMember.focus.map((item) => <li key={item} className="flex gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand-dark)]" />{item}</li>)}</ul></div>
                </div>

                <div className="mt-7 rounded-2xl bg-[var(--bg-page)] p-5"><h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-on-light-heading)]">Selected portfolio</h3><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">{selectedMember.portfolio.map((project) => <span key={project} className="inline-flex items-center gap-1.5 text-sm text-[var(--link-on-light)]"><ArrowUpRight className="h-3.5 w-3.5" />{project}</span>)}</div><p className="mt-4 text-xs text-[var(--text-on-light-muted)]">{selectedMember.availability}</p></div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
