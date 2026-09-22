import ThreeBackground from './ThreeBackground';

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-transparent">
      <ThreeBackground />
    </div>
  );
}
