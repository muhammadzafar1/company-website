import { useEffect, useRef } from 'react';

export default function CursorFluid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return undefined;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const pointer = { x: -100, y: -100, targetX: -100, targetY: -100, active: false, pulse: 0 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const movePointer = (event) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = true;
    };

    const clickPointer = () => { pointer.pulse = 1; };
    const leaveWindow = () => { pointer.active = false; };

    const render = (time) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (pointer.active) {
        const easing = reducedMotion ? 1 : 0.2;
        pointer.x += (pointer.targetX - pointer.x) * easing;
        pointer.y += (pointer.targetY - pointer.y) * easing;
        const pulseRadius = pointer.pulse > 0 ? 18 + (1 - pointer.pulse) * 24 : 0;

        context.save();
        context.translate(pointer.x, pointer.y);
        context.strokeStyle = 'rgba(138, 75, 31, 0.72)';
        context.lineWidth = 1.2;
        context.beginPath();
        context.arc(0, 0, 12 + Math.sin(time * 0.004) * 1.5, 0, Math.PI * 2);
        context.stroke();

        context.strokeStyle = 'rgba(224, 169, 109, 0.8)';
        context.beginPath();
        context.moveTo(-20, 0);
        context.lineTo(-7, 0);
        context.moveTo(7, 0);
        context.lineTo(20, 0);
        context.moveTo(0, -20);
        context.lineTo(0, -7);
        context.moveTo(0, 7);
        context.lineTo(0, 20);
        context.stroke();

        context.fillStyle = 'rgba(138, 75, 31, 0.9)';
        context.beginPath();
        context.arc(0, 0, 2.5, 0, Math.PI * 2);
        context.fill();

        for (let index = 0; index < 4; index += 1) {
          const angle = time * 0.0015 + index * (Math.PI / 2);
          context.beginPath();
          context.arc(Math.cos(angle) * 16, Math.sin(angle) * 16, 1.8, 0, Math.PI * 2);
          context.fillStyle = 'rgba(201, 138, 69, 0.75)';
          context.fill();
        }

        if (pulseRadius) {
          context.strokeStyle = `rgba(224, 169, 109, ${pointer.pulse * 0.55})`;
          context.beginPath();
          context.arc(0, 0, pulseRadius, 0, Math.PI * 2);
          context.stroke();
          pointer.pulse *= 0.9;
        }
        context.restore();
      }

      if (!reducedMotion || pointer.active || pointer.pulse > 0) frameId = window.requestAnimationFrame(render);
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
