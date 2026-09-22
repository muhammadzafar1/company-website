import { useEffect } from 'react';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://azmeer.tech').replace(/\/$/, '');
const companyName = 'AZ MEER SMC-PRIVATE LIMITED';
const defaultDescription = `${companyName} builds secure web applications, mobile apps, business software, and digital products from Lahore, Pakistan.`;
const defaultKeywords = 'AZ MEER, software development company, web development, website development, mobile app development, application development, custom software, React development, Node.js development, Flutter development, UI UX design, business automation, API development, software architecture, technology company Pakistan, web development Lahore, digital transformation, SEO, technical support';

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

export default function PageMeta({ title, description, path = '', keywords = defaultKeywords, image = '/favicon.svg', type = 'website', noindex = false, structuredData }) {
  useEffect(() => {
    const finalTitle = title ? `${title} | ${companyName}` : companyName;
    const pageDescription = description || defaultDescription;
    const canonicalUrl = `${siteUrl}${path || window.location.pathname}`;
    document.title = finalTitle;

    setMeta('meta[name="description"]', { name: 'description', content: pageDescription });
    setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    setMeta('meta[name="robots"]', { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: finalTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: pageDescription });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image.startsWith('http') ? image : `${siteUrl}${image}` });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: companyName });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: finalTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: pageDescription });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image.startsWith('http') ? image : `${siteUrl}${image}` });
    setLink('canonical', canonicalUrl);

    const schemaId = 'page-structured-data';
    let schemaElement = document.getElementById(schemaId);
    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = schemaId;
      schemaElement.type = 'application/ld+json';
      document.head.appendChild(schemaElement);
    }
    schemaElement.textContent = JSON.stringify(structuredData || {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: finalTitle,
      description: pageDescription,
      url: canonicalUrl,
      isPartOf: { '@type': 'WebSite', name: companyName, url: siteUrl },
      about: { '@type': 'Organization', name: companyName, url: siteUrl },
    });
  }, [title, description, path, keywords, image, type, noindex, structuredData]);

  return null;
}
