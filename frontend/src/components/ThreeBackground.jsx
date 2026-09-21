import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const objects = [
  { geometry: () => new THREE.IcosahedronGeometry(1.35, 1), position: [-3.6, 1.5, -1], color: 0xe0a96d, speed: 0.0007 },
  { geometry: () => new THREE.TorusKnotGeometry(1.05, 0.22, 96, 16), position: [3.7, 1.1, -2], color: 0xc98a45, speed: -0.0009 },
  { geometry: () => new THREE.OctahedronGeometry(1.15, 1), position: [2.8, -2.9, -1], color: 0xb86f3d, speed: 0.001 },
  { geometry: () => new THREE.TorusGeometry(1.25, 0.08, 16, 64), position: [-3.2, -3.4, -2], color: 0xf1c58e, speed: -0.0008 },
];

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const group = new THREE.Group();
    scene.add(group);

    const geometries = objects.map((item) => item.geometry());
    const materials = objects.map((item, index) => new THREE.MeshPhysicalMaterial({
      color: item.color,
      roughness: 0.26,
      metalness: 0.3,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.42,
      wireframe: geometries[index].type === 'TorusGeometry',
    }));

    objects.forEach((item, index) => {
      const mesh = new THREE.Mesh(geometries[index], materials[index]);
      mesh.position.set(...item.position);
      mesh.rotation.set(index * 0.4, index * 0.7, 0);
      mesh.userData.speed = item.speed;
      group.add(mesh);
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(90 * 3);
    for (let index = 0; index < particlePositions.length; index += 3) {
      particlePositions[index] = (Math.random() - 0.5) * 15;
      particlePositions[index + 1] = (Math.random() - 0.5) * 12;
      particlePositions[index + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xd8a875, size: 0.035, transparent: true, opacity: 0.5 }),
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xfff4e5, 1.8));
    const keyLight = new THREE.DirectionalLight(0xffd39b, 3.4);
    keyLight.position.set(4, 6, 8);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0xc98a45, 18, 18);
    fillLight.position.set(-5, -3, 5);
    scene.add(fillLight);

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
      scrollProgress += (targetScroll - scrollProgress) * (reducedMotion ? 0.2 : 0.065);
      group.rotation.y = scrollProgress * Math.PI * 1.2;
      group.rotation.x = scrollProgress * Math.PI * 0.24;
      group.position.y = (scrollProgress - 0.5) * -1.2;
      camera.position.y = (scrollProgress - 0.5) * 0.7;
      particles.rotation.y += delta * 0.000025;

      group.children.forEach((mesh) => {
        mesh.rotation.x += delta * mesh.userData.speed;
        mesh.rotation.z += delta * mesh.userData.speed * 0.7;
      });

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
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      particleGeometry.dispose();
      particles.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="three-background" />;
}