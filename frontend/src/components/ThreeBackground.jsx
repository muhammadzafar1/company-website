import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const objects = [
  { geometry: () => new THREE.IcosahedronGeometry(0.68, 1), position: [-3.6, 1.5, -1], color: 0xe0a96d, speed: 0.0007 },
  { geometry: () => new THREE.TorusKnotGeometry(0.58, 0.12, 96, 16), position: [3.7, 1.1, -2], color: 0xc98a45, speed: -0.0009 },
  { geometry: () => new THREE.OctahedronGeometry(0.62, 1), position: [2.8, -2.9, -1], color: 0xb86f3d, speed: 0.001 },
  { geometry: () => new THREE.TorusGeometry(0.7, 0.045, 16, 64), position: [-3.2, -3.4, -2], color: 0xf1c58e, speed: -0.0008 },
];

const ionNodes = [
  [-2.5, 0.8, -1.2, 0.12], [-1.3, 1.8, -1.8, -0.2], [0.2, 1.1, -2.4, 0.3],
  [1.6, 1.9, -1.5, -0.16], [2.6, 0.5, -2.1, 0.24], [1.2, -0.1, -1.4, -0.28],
  [-0.3, -0.6, -2.3, 0.18], [-1.7, -1.1, -1.7, -0.22], [-2.8, -0.2, -2.5, 0.3],
  [0.3, -2, -1.6, -0.1], [1.8, -1.7, -2.2, 0.2], [3, -1.3, -1.5, -0.24],
];

const ionBonds = [
  [0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 4], [5, 6], [6, 7], [7, 8],
  [6, 9], [9, 10], [10, 11], [4, 11], [7, 9], [1, 6], [2, 6], [5, 10],
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

    const ionGroup = new THREE.Group();
    const ionGeometry = new THREE.SphereGeometry(0.12, 16, 12);
    const ionMaterial = new THREE.MeshPhysicalMaterial({ color: 0xf3bf82, emissive: 0x8a4b1f, emissiveIntensity: 0.7, roughness: 0.22, metalness: 0.35, transparent: true, opacity: 0.95 });
    const bondMaterial = new THREE.LineBasicMaterial({ color: 0xc98a45, transparent: true, opacity: 0.62 });
    const ionMeshes = ionNodes.map(() => {
      const ion = new THREE.Mesh(ionGeometry, ionMaterial);
      ionGroup.add(ion);
      return ion;
    });
    const bondLines = ionBonds.map(([start, end]) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Array(6).fill(0), 3));
      const bond = new THREE.Line(geometry, bondMaterial);
      ionGroup.add(bond);
      return { bond, start, end };
    });
    ionGroup.position.z = -0.4;
    scene.add(ionGroup);

    const moleculeGroups = [ionGroup];
    [[-3.8, 1.7, -1.6, 0.72], [3.8, -1.2, -2.2, 0.8], [3.1, 2.6, -3.2, 0.52]].forEach(([x, y, z, scale]) => {
      const molecule = ionGroup.clone();
      molecule.children.slice(ionNodes.length).forEach((bond) => {
        bond.geometry = bond.geometry.clone();
      });
      molecule.position.set(x, y, z);
      molecule.scale.setScalar(scale);
      molecule.rotation.set(0.2, -0.4, 0.3);
      scene.add(molecule);
      moleculeGroups.push(molecule);
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
      ionGroup.rotation.y = scrollProgress * Math.PI * 0.75;
      ionGroup.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.22;
      ionGroup.rotation.z = Math.sin(time * 0.00012) * 0.08;
      moleculeGroups.slice(1).forEach((molecule, index) => {
        molecule.rotation.y = scrollProgress * Math.PI * (0.34 + index * 0.08);
        molecule.rotation.x = Math.sin(time * 0.00016 + index) * 0.12;
        molecule.rotation.z += delta * (index % 2 ? 0.00008 : -0.00006);
      });
      moleculeGroups.forEach((molecule, moleculeIndex) => {
        const nodes = molecule.children.slice(0, ionNodes.length);
        const bonds = molecule.children.slice(ionNodes.length);
        ionNodes.forEach(([x, y, z, w], index) => {
          const phase = index * 0.42 + moleculeIndex * 0.8;
          const projectedW = w + Math.sin(scrollProgress * Math.PI * 2 + phase + time * 0.00012) * 0.22;
          const perspective = 1 / (1 - projectedW * 0.32);
          nodes[index].position.set(x * perspective, y * perspective, z + projectedW * 1.8);
          nodes[index].scale.setScalar(0.8 + perspective * 0.24);
        });
        bonds.forEach((bond, bondIndex) => {
          const [start, end] = ionBonds[bondIndex];
          const startPosition = nodes[start].position;
          const endPosition = nodes[end].position;
          const positions = bond.geometry.attributes.position.array;
          positions[0] = startPosition.x;
          positions[1] = startPosition.y;
          positions[2] = startPosition.z;
          positions[3] = endPosition.x;
          positions[4] = endPosition.y;
          positions[5] = endPosition.z;
          bond.geometry.attributes.position.needsUpdate = true;
        });
      });
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
      ionGeometry.dispose();
      ionMaterial.dispose();
      bondLines.forEach(({ bond }) => bond.geometry.dispose());
      moleculeGroups.slice(1).forEach((molecule) => {
        molecule.children.slice(ionNodes.length).forEach((bond) => bond.geometry.dispose());
      });
      bondMaterial.dispose();
      particleGeometry.dispose();
      particles.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="three-background" />;
}