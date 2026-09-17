import { useEffect } from 'react';

export default function PageMeta({ title, description, path = '' }) {
  useEffect(() => {
    const finalTitle = title ? `${title} | AZ MEER` : 'AZ MEER (SMC-PRIVATE) LIMITED';
    document.title = finalTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', description || 'AZ MEER technology company website');

    const canonical = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = `${window.location.origin}${path || window.location.pathname}`;
    if (canonical) canonical.setAttribute('href', canonicalUrl);
    else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }
  }, [title, description, path]);

  return null;
}
