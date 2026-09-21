import { useEffect, useRef } from 'react';

const particleCount = 34;

export default function CursorFluid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const particles = Array.from({ length: particleCount }, (_, index) => ({
      x: -100,
      y: -100,
      size: 2 + (index % 5) * 0.8,
      drift: index * 0.55,
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
        particles.forEach((particle, index) => {
          const wave = index * 0.42 + time * 0.0012;
          const spread = 2 + index * 0.7;
          const targetX = pointer.x + Math.cos(wave) * spread;
          const targetY = pointer.y + Math.sin(wave * 1.15) * spread;
          const easing = reducedMotion ? 0.28 : 0.08 + (particleCount - index) * 0.001;
          particle.x += (targetX - particle.x) * easing;
          particle.y += (targetY - particle.y) * easing;
        });

        context.save();
        context.globalCompositeOperation = 'screen';
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.shadowColor = 'rgba(201, 138, 69, 0.38)';
        context.shadowBlur = 16;
        context.beginPath();
        particles.forEach((particle, index) => {
          if (index === 0) context.moveTo(particle.x, particle.y);
          else context.lineTo(particle.x, particle.y);
        });
        context.strokeStyle = 'rgba(224, 169, 109, 0.24)';
        context.lineWidth = 3.5;
        context.stroke();

        particles.forEach((particle, index) => {
          const alpha = 0.16 + (particleCount - index) / particleCount * 0.3;
          context.beginPath();
          context.fillStyle = `rgba(224, 169, 109, ${alpha})`;
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fill();
        });
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