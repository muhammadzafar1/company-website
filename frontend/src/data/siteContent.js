export const companyProfile = {
  name: 'AZ MEER (SMC-PRIVATE) LIMITED',
  shortName: 'AZ MEER',
  tagline: 'Technology that moves ambition forward.',
  description:
    'AZ MEER (SMC-PRIVATE) LIMITED builds secure, scalable digital products and business systems for startups, organizations, and growing enterprises.',
  email: 'hello@azmeer.com',
  phone: '+92 300 0000000',
  location: 'Lahore, Pakistan',
  officeHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
};

export const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Developers', to: '/developers' },
  { label: 'Contact', to: '/contact' },
];

export const serviceHighlights = [
  {
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile experiences for Android, iOS, and Flutter-driven product teams.',
    icon: 'Smartphone',
    tags: ['Flutter', 'Android', 'iOS', 'API integration', 'Authentication'],
  },
  {
    title: 'Full-Stack Web Development',
    description:
      'Modern web applications tailored to business process automation, growth, and long-term maintenance.',
    icon: 'Code2',
    tags: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    title: 'UI/UX Design',
    description:
      'Clear, conversion-led interfaces backed by user-centered research and modern design systems.',
    icon: 'Paintbrush2',
    tags: ['Wireframes', 'Prototypes', 'Responsive design', 'Usability'],
  },
  {
    title: 'Software Architecture',
    description:
      'Scalable architecture decisions that support secure, maintainable systems and future growth.',
    icon: 'Layers3',
    tags: ['Scalability', 'API design', 'Security', 'Performance'],
  },
  {
    title: 'Software Optimization',
    description:
      'Performance tuning, bug reduction, and product stability strategies for production environments.',
    icon: 'Zap',
    tags: ['Performance', 'Monitoring', 'Bug fixing', 'Optimization'],
  },
  {
    title: 'Maintenance & Technical Support',
    description:
      'Ongoing support to keep deployments secure, stable, and aligned with evolving business requirements.',
    icon: 'ShieldCheck',
    tags: ['Support', 'Security updates', 'Monitoring', 'Feature updates'],
  },
];

export const productCatalog = [
  {
    slug: 'mezzy-mobile-app',
    name: 'Mezzy Mobile App',
    category: 'Mobile App',
    platform: 'Android / iOS / Web',
    description:
      'A customer-focused mobile application with booking, push notifications, and secure user authentication.',
    features: ['Smart onboarding', 'Booking flow', 'Notifications', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    playStore: '#',
    liveDemo: '#',
    rating: 4.8,
    tags: ['Flutter', 'Firebase', 'APIs'],
  },
  {
    slug: 'azmeer-business-suite',
    name: 'AZ MEER Business Suite',
    category: 'SaaS',
    platform: 'Web',
    description:
      'A scalable dashboard for operational workflows, reporting, client communication, and business automation.',
    features: ['Role-based dashboards', 'Reports', 'Automation', 'Client portal'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    playStore: '#',
    liveDemo: '#',
    rating: 4.9,
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    slug: 'rapid-commerce',
    name: 'Rapid Commerce',
    category: 'E-commerce',
    platform: 'Web / Mobile',
    description:
      'A modern commerce experience built for product discovery, checkout optimization, and order tracking.',
    features: ['Catalog', 'Checkout', 'Analytics', 'Inventory'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    playStore: '#',
    liveDemo: '#',
    rating: 4.7,
    tags: ['Shopify', 'Stripe', 'SEO'],
  },
  {
    slug: 'field-connect',
    name: 'Field Connect',
    category: 'Enterprise',
    platform: 'Web / Android',
    description:
      'Field operations platform designed to manage teams, service requests, reporting, and operations visibility.',
    features: ['Task tracking', 'GPS', 'Service scheduling', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    playStore: '#',
    liveDemo: '#',
    rating: 4.6,
    tags: ['Maps', 'REST APIs', 'Admin panel'],
  },
];

export const portfolioCases = [
  {
    slug: 'luma-retail-journey',
    title: 'Luma Retail Journey',
    category: 'E-commerce',
    client: 'Retail Growth Studio',
    description: 'Conversion-driven commerce platform upgrade for a growing retail brand.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    challenge: 'The client needed a cleaner storefront, faster product discovery, and stronger order conversion.',
    solution: 'We rebuilt the customer journey around product findability, simplified checkout, and a flexible CMS.',
    result: 'The new experience improved product engagement and simplified business operations.',
  },
  {
    slug: 'urban-ops',
    title: 'UrbanOps',
    category: 'Operations',
    client: 'Field Services Group',
    description: 'Operations dashboard designed to centralize service tracking across teams and locations.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Express', 'PostgreSQL', 'Maps'],
    challenge: 'The business had fragmented service records and limited operational visibility.',
    solution: 'We introduced a unified dashboard with tracking, status updates, and service reporting.',
    result: 'The client gained cleaner monitoring and more predictable daily operations.',
  },
  {
    slug: 'nextwave-health',
    title: 'NextWave Health',
    category: 'Mobile',
    client: 'Digital Care Network',
    description: 'Patient-first mobile experience with appointment scheduling and secure account access.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Flutter', 'REST APIs', 'MySQL', 'Push Notifications'],
    challenge: 'The team needed a patient-friendly mobile portal that worked well and felt trustworthy.',
    solution: 'We built a responsive, content-rich mobile experience with care journey workflows and secure login.',
    result: 'The product delivered a more stable and reassuring digital experience for users.',
  },
];

export const blogPosts = [
  {
    slug: 'building-modern-web-platforms',
    title: 'Building Modern Web Platforms That Scale Beyond MVP',
    category: 'Web Development',
    author: 'AZ MEER Team',
    readingTime: '6 min read',
    publishedAt: '2026-09-12',
    excerpt: 'A practical look at architecture choices that keep product teams fast without creating long-term technical debt.',
    tags: ['Architecture', 'React', 'Scalability'],
  },
  {
    slug: 'mobile-product-maintenance',
    title: 'Why Mobile Product Maintenance Matters More Than Launch Day',
    category: 'Mobile Development',
    author: 'Product Engineering',
    readingTime: '4 min read',
    publishedAt: '2026-09-06',
    excerpt: 'Launch is only the beginning; the real value comes from product iteration, bug prevention, and user trust.',
    tags: ['Flutter', 'Support', 'Retention'],
  },
  {
    slug: 'design-systems-for-growth',
    title: 'Design Systems That Help Teams Launch Faster and Stay Consistent',
    category: 'UI/UX',
    author: 'Design Team',
    readingTime: '5 min read',
    publishedAt: '2026-08-24',
    excerpt: 'When product teams grow, design consistency becomes a strategic advantage. Here is how to build for it.',
    tags: ['Design Systems', 'UX', 'Product'],
  },
  {
    slug: 'api-security-basics',
    title: 'API Security Basics Every Growing Business Should Prioritize',
    category: 'APIs',
    author: 'Security Engineering',
    readingTime: '7 min read',
    publishedAt: '2026-08-10',
    excerpt: 'Strong API design is about trust, performance, and making sure the systems behind your product remain reliable.',
    tags: ['Security', 'REST', 'Architecture'],
  },
];

export const testimonials = [
  {
    name: 'Emily Brooks',
    company: 'Northstar Labs',
    review: 'AZ MEER transformed our product vision into a polished experience that our customers immediately trusted.',
    rating: 5,
  },
  {
    name: 'Daniel Smith',
    company: 'Apex Studio',
    review: 'Their team blended strategy, design, and engineering with clear communication and strong delivery discipline.',
    rating: 5,
  },
  {
    name: 'Sarah Ali',
    company: 'Luma Commerce',
    review: 'From planning to launch, the team helped us simplify decisions and ship a more confident digital business experience.',
    rating: 5,
  },
];

export const faqCategories = ['General', 'Applications', 'Client Services'];

export const faqItems = [
  {
    question: 'What is AZ MEER?',
    answer:
      'AZ MEER (SMC-PRIVATE) LIMITED is a technology company focused on software development, digital product design, and business system modernization.',
    category: 'General',
  },
  {
    question: 'What services do you provide?',
    answer:
      'We provide mobile app development, full-stack web development, UI/UX design, software architecture, optimization, and maintenance support.',
    category: 'General',
  },
  {
    question: 'Where are you located?',
    answer:
      'Our company is based in Lahore, Pakistan, and we work with clients across local and international markets.',
    category: 'General',
  },
  {
    question: 'Where can applications be downloaded?',
    answer:
      'Applications can be shared through app stores, private distribution channels, and client-approved deployment environments depending on the product.',
    category: 'Applications',
  },
  {
    question: 'Which platforms are supported?',
    answer:
      'We support Android, iOS, web, cross-platform mobile, and enterprise system integrations based on product needs.',
    category: 'Applications',
  },
  {
    question: 'How can I report an issue?',
    answer:
      'You can contact us through the support or contact form, share the details, and we will review and respond with a solution path.',
    category: 'Client Services',
  },
  {
    question: 'How can I request a quote?',
    answer:
      'Use the quote form on our services page or reach out through the contact page with your project scope, timeline, and budget.',
    category: 'Client Services',
  },
  {
    question: 'What information is required?',
    answer:
      'We typically need your goals, scope, target platform, timeline, and any existing materials or references for the project.',
    category: 'Client Services',
  },
  {
    question: 'How does development work?',
    answer:
      'We begin with discovery and planning, followed by design, architecture, development, testing, deployment, and support.',
    category: 'Client Services',
  },
  {
    question: 'How long does development take?',
    answer:
      'Project timelines depend on scope, complexity, and required integrations, but we provide a clear delivery plan during discovery.',
    category: 'Client Services',
  },
];

export const leadership = [
  {
    name: 'Placeholder CEO',
    title: 'CEO & Founder',
    bio: 'An executive partner focused on technology strategy, growth planning, and sustainable product delivery.',
    experience: '10+ years in digital product leadership',
    skills: ['Technology Strategy', 'Product Leadership', 'Business Growth'],
    philosophy: 'Build with purpose, communicate clearly, and deliver value consistently.',
  },
  {
    name: 'Placeholder CTO',
    title: 'Chief Technology Officer',
    bio: 'Leads architecture planning, engineering standards, and scalable digital delivery for complex product work.',
    experience: '8+ years in software architecture and platform delivery',
    skills: ['Architecture', 'Systems Design', 'Engineering Leadership'],
    philosophy: 'Strong systems produce confident teams and reliable products.',
  },
];

export const companyValues = [
  'Innovation',
  'Integrity',
  'Quality',
  'Customer Focus',
  'Transparency',
  'Continuous Improvement',
  'Teamwork',
  'Reliability',
];

export const techStack = [
  { group: 'Frontend', items: ['React', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { group: 'Mobile', items: ['Flutter', 'Native Development'] },
  { group: 'Database', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { group: 'Other', items: ['Git', 'GitHub', 'Docker', 'Cloud', 'API integrations'] },
];

export const milestones = [
  { year: '2020', title: 'Company Founded' },
  { year: '2021', title: 'First Product' },
  { year: '2022', title: 'Major Client Relationship' },
  { year: '2023', title: 'Mobile Applications Expansion' },
  { year: '2024', title: 'Technology Expansion' },
  { year: '2025', title: 'Current Operations' },
];

export const statusCards = [
  { label: 'Website', value: 'Operational', tone: 'good' },
  { label: 'API', value: 'Available', tone: 'good' },
  { label: 'Database', value: 'Configured', tone: 'good' },
  { label: 'Authentication', value: 'Enabled', tone: 'good' },
  { label: 'Overall', value: 'Demo Ready', tone: 'good' },
];

export const contactDetails = {
  email: 'hello@azmeer.com',
  phone: '+92 300 0000000',
  location: 'Lahore, Pakistan',
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
};

export const developerSections = [
  {
    title: 'API Introduction',
    body: 'AZ MEER exposes a clean REST API for public features and administrative operations. Use secure authentication for protected routes and validate payloads before production rollout.',
  },
  {
    title: 'Authentication',
    body: 'Protected endpoints expect a bearer token in the Authorization header. Use the admin login endpoint to receive a JWT token and include it in each request.',
  },
  {
    title: 'Error Handling',
    body: 'The API returns success and error objects with predictable structure so integrations can be built with minimal uncertainty.',
  },
  {
    title: 'Code Examples',
    body: 'Examples are provided for JavaScript, React, Node.js, Flutter, and cURL so teams can integrate quickly and confidently.',
  },
];
