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
    const pointer = { x: -100, y: -100, previousX: -100, previousY: -100, speed: 0, active: false, pulse: 0, pulseX: 0, pulseY: 0 };
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
      pointer.speed = Math.min(Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y), 80);
      pointer.previousX = pointer.x;
      pointer.previousY = pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const clickPointer = () => {
      pointer.pulse = 1;
      pointer.pulseX = pointer.x;
      pointer.pulseY = pointer.y;
    };

    const leaveWindow = () => {
      pointer.active = false;
    };

    const render = (time) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (pointer.active) {
        pointer.speed *= 0.86;
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

        const orbitRadius = 13 + pointer.speed * 0.14;
        context.beginPath();
        for (let index = 0; index < 3; index += 1) {
          const angle = time * 0.004 + index * (Math.PI * 2 / 3);
          const orbitX = pointer.x + Math.cos(angle) * orbitRadius;
          const orbitY = pointer.y + Math.sin(angle) * orbitRadius;
          context.moveTo(orbitX + 2.5, orbitY);
          context.arc(orbitX, orbitY, 2.5, 0, Math.PI * 2);
        }
        context.fillStyle = 'rgba(138, 75, 31, 0.62)';
        context.fill();

        if (pointer.pulse > 0) {
          context.beginPath();
          context.arc(pointer.pulseX, pointer.pulseY, 12 + (1 - pointer.pulse) * 54, 0, Math.PI * 2);
          context.strokeStyle = `rgba(224, 169, 109, ${pointer.pulse * 0.55})`;
          context.lineWidth = 1.5;
          context.stroke();
          pointer.pulse *= 0.9;
        }
        context.restore();
      }

      if (!reducedMotion || pointer.active) frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', movePointer, { passive: true });
    window.addEventListener('click', clickPointer, { passive: true });
    window.addEventListener('pointerleave', leaveWindow);
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('click', clickPointer);
      window.removeEventListener('pointerleave', leaveWindow);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="cursor-fluid" />;
}