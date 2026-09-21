import { useEffect } from 'react';

const revealSelector = 'main > section, main article, main form, .light-card, footer > div';

export default function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = reducedMotion
      ? null
      : new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    const revealElements = () => {
      document.querySelectorAll(revealSelector).forEach((element) => {
        element.classList.add('scroll-reveal');
        if (reducedMotion) element.classList.add('is-visible');
        else observer.observe(element);
      });
    };

    revealElements();
    const mutationObserver = new MutationObserver(revealElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}