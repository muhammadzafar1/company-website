import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const galaxyColors = [0xe0a96d, 0xf1c58e, 0xc98a45, 0xffe0ae];

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const galaxy = new THREE.Group();
    scene.add(galaxy);

    const starCount = window.innerWidth < 768 ? 260 : 520;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let index = 0; index < starCount; index += 1) {
      const arm = index % 4;
      const radius = Math.pow(Math.random(), 0.62) * 5.2;
      const angle = radius * 1.25 + arm * (Math.PI / 2) + (Math.random() - 0.5) * 0.7;
      const spread = (Math.random() - 0.5) * (0.25 + radius * 0.08);
      const x = Math.cos(angle) * radius + Math.cos(angle + Math.PI / 2) * spread;
      const y = (Math.random() - 0.5) * (0.35 + radius * 0.08);
      const z = Math.sin(angle) * radius + Math.sin(angle + Math.PI / 2) * spread;
      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z - 2;

      const color = new THREE.Color(galaxyColors[index % galaxyColors.length]);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
      sizes[index] = 0.025 + Math.random() * 0.055;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.46,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(geometry, material);
    galaxy.add(stars);

    const coreGeometry = new THREE.SphereGeometry(0.32, 16, 12);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xe0a96d, transparent: true, opacity: 0.16 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.z = -2;
    galaxy.add(core);

    let scrollProgress = 0;
    let targetScroll = 0;
    let frameId;
    let lastTime = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    };

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };

    const render = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      scrollProgress += (targetScroll - scrollProgress) * (reducedMotion ? 0.2 : 0.08);
      galaxy.rotation.y = scrollProgress * Math.PI * 1.8;
      galaxy.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.16;
      galaxy.rotation.z += delta * (reducedMotion ? 0.00001 : 0.000025);
      galaxy.position.y = (scrollProgress - 0.5) * -0.35;
      core.scale.setScalar(1 + Math.sin(time * 0.0012) * 0.08);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    updateScroll();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScroll, { passive: true });
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScroll);
      geometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="three-background" />;
}
