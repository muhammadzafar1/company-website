import { lazy, Suspense, useEffect, useState } from 'react';

const ThreeBackground = lazy(() => import('./ThreeBackground'));

export default function AnimatedBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(enable, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(enable, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-transparent">
      {enabled && <Suspense fallback={null}><ThreeBackground /></Suspense>}
    </div>
  );
}
