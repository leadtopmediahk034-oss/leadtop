"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SolarScene({ compact = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const coreGeometry = new THREE.SphereGeometry(compact ? 0.62 : 0.86, 64, 64);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xf39b25,
      transparent: true,
      opacity: compact ? 0.42 : 0.58,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    root.add(core);

    const glowGeometry = new THREE.SphereGeometry(compact ? 0.92 : 1.25, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb544,
      transparent: true,
      opacity: compact ? 0.08 : 0.11,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    root.add(glow);

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xf0a03a,
      transparent: true,
      opacity: compact ? 0.18 : 0.24,
    });

    const rings = [];
    [1.25, 1.75, 2.32, 3.05].forEach((radius, index) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * (compact ? 0.62 : 0.74), 0, Math.PI * 2);
      const points = curve.getPoints(160).map((point) => new THREE.Vector3(point.x, point.y, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const ring = new THREE.LineLoop(geometry, ringMaterial.clone());
      ring.rotation.z = index * 0.18;
      ring.rotation.x = compact ? 0.55 : 0.7;
      rings.push(ring);
      root.add(ring);
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = compact ? 48 : 72;
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const angle = (index / particleCount) * Math.PI * 2;
      const radius = 1.4 + (index % 4) * 0.48;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle) * radius * 0.7;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 0.12;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xf39b25,
        size: compact ? 0.035 : 0.045,
        transparent: true,
        opacity: 0.46,
      }),
    );
    root.add(particles);

    let raf = 0;

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      const time = performance.now() * 0.001;
      root.rotation.z = time * 0.035;
      core.scale.setScalar(1 + Math.sin(time * 1.2) * 0.035);
      glow.scale.setScalar(1 + Math.sin(time * 0.8) * 0.045);
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0008 + index * 0.0002;
      });
      particles.rotation.z = -time * 0.025;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
      renderer.dispose();
      coreGeometry.dispose();
      glowGeometry.dispose();
      particleGeometry.dispose();
      rings.forEach((ring) => ring.geometry.dispose());
      mount.removeChild(renderer.domElement);
    };
  }, [compact]);

  return <div ref={mountRef} className="solar-scene" aria-hidden="true" />;
}
