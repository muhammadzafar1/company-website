import BlogPost from '../models/BlogPost.js';
import Employee from '../models/Employee.js';
import Faq from '../models/Faq.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';

const defaultServices = [
  { title: 'Mobile App Development', description: 'Cross-platform mobile experiences for Android, iOS, and Flutter-driven product teams.', price: 0 },
  { title: 'Full-Stack Web Development', description: 'Modern web applications tailored to business process automation, growth, and long-term maintenance.', price: 0 },
  { title: 'UI/UX Design', description: 'Clear, conversion-led interfaces backed by user-centered research and modern design systems.', price: 0 },
  { title: 'Software Architecture', description: 'Scalable architecture decisions that support secure, maintainable systems and future growth.', price: 0 },
  { title: 'Software Optimization', description: 'Performance tuning, bug reduction, and product stability strategies for production environments.', price: 0 },
  { title: 'Maintenance & Technical Support', description: 'Ongoing support to keep deployments secure, stable, and aligned with evolving business requirements.', price: 0 },
];

const defaultFaqs = [
  { question: 'What is AZ MEER?', answer: 'AZ MEER (SMC-PRIVATE) LIMITED is a technology company focused on software development, digital product design, and business system modernization.', category: 'General' },
  { question: 'What services do you provide?', answer: 'We provide mobile app development, full-stack web development, UI/UX design, software architecture, optimization, and maintenance support.', category: 'General' },
  { question: 'Where are you located?', answer: 'Our company is based in Lahore, Pakistan, and we work with clients across local and international markets.', category: 'General' },
  { question: 'Which platforms are supported?', answer: 'We build for web, Android, iOS, and cross-platform environments based on the product requirements.', category: 'Applications' },
  { question: 'How do I request a quote?', answer: 'Use the Services or Contact page to share your goals, timeline, and requirements with the AZ MEER team.', category: 'Client Services' },
];

const defaultBlogPosts = [
  { slug: 'building-modern-web-platforms', title: 'Building Modern Web Platforms That Scale Beyond MVP', category: 'Web Development', author: 'AZ MEER Team', readingTime: '6 min read', excerpt: 'A practical look at architecture choices that keep product teams fast without creating long-term technical debt.', content: 'A practical look at architecture choices that keep product teams fast without creating long-term technical debt.', tags: ['Architecture', 'React', 'Scalability'], published: true, featured: true, publishedAt: new Date('2026-09-12') },
  { slug: 'mobile-product-maintenance', title: 'Why Mobile Product Maintenance Matters More Than Launch Day', category: 'Mobile Development', author: 'Product Engineering', readingTime: '4 min read', excerpt: 'Launch is only the beginning; the real value comes from product iteration, bug prevention, and user trust.', content: 'Launch is only the beginning; the real value comes from product iteration, bug prevention, and user trust.', tags: ['Flutter', 'Support', 'Retention'], published: true, publishedAt: new Date('2026-09-06') },
  { slug: 'design-systems-for-growth', title: 'Design Systems That Help Teams Launch Faster and Stay Consistent', category: 'UI/UX', author: 'Design Team', readingTime: '5 min read', excerpt: 'When product teams grow, design consistency becomes a strategic advantage.', content: 'When product teams grow, design consistency becomes a strategic advantage.', tags: ['Design Systems', 'UX', 'Product'], published: true, publishedAt: new Date('2026-08-24') },
  { slug: 'api-security-basics', title: 'API Security Basics Every Growing Business Should Prioritize', category: 'APIs', author: 'Security Engineering', readingTime: '7 min read', excerpt: 'Strong API design is about trust, performance, and reliable systems.', content: 'Strong API design is about trust, performance, and reliable systems.', tags: ['Security', 'REST', 'Architecture'], published: true, publishedAt: new Date('2026-08-10') },
];

const defaultEmployees = [
  { name: 'Ayesha Khan', role: 'Full Stack Developer', email: 'ayesha@azmeer.com' },
  { name: 'Musa Ali', role: 'Frontend Developer', email: 'musa@azmeer.com' },
  { name: 'Sara Malik', role: 'Backend Developer', email: 'sara@azmeer.com' },
  { name: 'Zain Ahmed', role: 'UI/UX Designer', email: 'zain@azmeer.com' },
];

const defaultTestimonials = [
  { name: 'Emily Brooks', company: 'Northstar Labs', role: 'Founder', review: 'AZ MEER transformed our product vision into a polished experience that our customers immediately trusted.', rating: 5 },
  { name: 'Daniel Smith', company: 'Apex Studio', role: 'Director', review: 'Their team blended strategy, design, and engineering with clear communication and strong delivery discipline.', rating: 5 },
  { name: 'Sarah Ali', company: 'Luma Commerce', role: 'Product Lead', review: 'From planning to launch, the team helped us simplify decisions and ship a more confident digital experience.', rating: 5 },
];

export const seedContent = async () => {
  if (!await Service.exists()) await Service.insertMany(defaultServices);
  if (!await Faq.exists()) await Faq.insertMany(defaultFaqs);
  if (!await BlogPost.exists()) await BlogPost.insertMany(defaultBlogPosts);
  if (!await Testimonial.exists()) await Testimonial.insertMany(defaultTestimonials);

  let employees = await Employee.find().sort({ createdAt: 1 });
  if (!employees.length) employees = await Employee.insertMany(defaultEmployees);

  if (!await Project.exists()) {
    await Project.insertMany([
      { name: 'AZ MEER Business Suite', client: 'AZ MEER', status: 'ongoing', startDate: new Date('2026-01-10'), deadline: new Date('2026-12-31'), assignedEmployees: employees.slice(0, 2).map((employee) => employee._id) },
      { name: 'Field Connect', client: 'Field Services Group', status: 'completed', startDate: new Date('2025-02-01'), deadline: new Date('2025-09-30'), assignedEmployees: employees.slice(1, 3).map((employee) => employee._id) },
      { name: 'Rapid Commerce', client: 'Retail Growth Studio', status: 'upcoming', startDate: new Date('2026-10-01'), deadline: new Date('2027-03-31'), assignedEmployees: employees.slice(2, 4).map((employee) => employee._id) },
    ]);
  }

  console.log('Content seed completed');
};
