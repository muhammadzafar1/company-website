import { useEffect, useRef } from 'react';

const particleCount = 16;

export default function CursorFluid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const particles = Array.from({ length: particleCount }, (_, index) => ({
      x: -100,
      y: -100,
      size: 1.5 + (index % 4) * 0.6,
    }));
    const pointer = { x: -100, y: -100, active: false };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const movePointer = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const leaveWindow = () => {
      pointer.active = false;
    };

    const render = (time) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (pointer.active) {
        particles[0].x = pointer.x;
        particles[0].y = pointer.y;
        particles.slice(1).forEach((particle, index) => {
          const previous = particles[index];
          const easing = reducedMotion ? 0.6 : 0.3;
          particle.x += (previous.x - particle.x) * easing;
          particle.y += (previous.y - particle.y) * easing;
        });

        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';

        const spotlight = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 90);
        spotlight.addColorStop(0, 'rgba(224, 169, 109, 0.18)');
        spotlight.addColorStop(0.45, 'rgba(224, 169, 109, 0.06)');
        spotlight.addColorStop(1, 'rgba(224, 169, 109, 0)');
        context.fillStyle = spotlight;
        context.beginPath();
        context.arc(pointer.x, pointer.y, 90, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        particles.forEach((particle, index) => {
          if (index === 0) context.moveTo(particle.x, particle.y);
          else context.lineTo(particle.x, particle.y);
        });
        context.strokeStyle = 'rgba(201, 138, 69, 0.3)';
        context.lineWidth = 2;
        context.stroke();

        particles.forEach((particle, index) => {
          const alpha = 0.08 + (particleCount - index) / particleCount * 0.28;
          context.beginPath();
          context.fillStyle = `rgba(224, 169, 109, ${alpha})`;
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fill();
        });
        context.beginPath();
        context.strokeStyle = 'rgba(138, 75, 31, 0.45)';
        context.lineWidth = 1;
        context.arc(pointer.x, pointer.y, 10 + Math.sin(time * 0.006) * 2, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      }

      if (!reducedMotion || pointer.active) frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', movePointer, { passive: true });
    window.addEventListener('pointerleave', leaveWindow);
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('pointerleave', leaveWindow);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="cursor-fluid" />;
}