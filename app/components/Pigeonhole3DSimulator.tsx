"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { FaPlay, FaRedo, FaPlus, FaMinus } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

export function Pigeonhole3DSimulator({
  keysCount,
  onAddKey,
  onReset,
}: {
  keysCount: number;
  onAddKey: () => void;
  onReset: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeBucketCollisions, setActiveBucketCollisions] = useState<number[]>([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x020617 : 0xf8fafc);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 10);
    camera.lookAt(0, -0.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, isDark ? 1.8 : 2.0);
    dirLight.position.set(4, 9, 6);
    scene.add(dirLight);

    const grid = new THREE.GridHelper(
      16,
      16,
      isDark ? 0x0ea5e9 : 0x0284c7,
      isDark ? 0x1e293b : 0xe2e8f0
    );
    grid.position.y = -2;
    scene.add(grid);

    const group = new THREE.Group();
    scene.add(group);

    const bucketCount = 10;
    const spacing = 1.35;
    const bucketMeshes: THREE.Mesh[] = [];

    // Create 10 Buckets labeled 0 to 9
    for (let i = 0; i < bucketCount; i++) {
      const x = (i - bucketCount / 2 + 0.5) * spacing;

      const cylGeo = new THREE.CylinderGeometry(0.52, 0.44, 1.3, 24, 1, true);
      const cylMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.5,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });
      const bucket = new THREE.Mesh(cylGeo, cylMat);
      bucket.position.set(x, -1.25, 0);
      group.add(bucket);
      bucketMeshes.push(bucket);

      const baseGeo = new THREE.CircleGeometry(0.44, 24);
      const baseMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, side: THREE.DoubleSide });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.rotation.x = Math.PI / 2;
      base.position.set(x, -1.9, 0);
      group.add(base);
    }

    // Drop keys into buckets
    const ballGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const bucketHeights = new Array(bucketCount).fill(0);
    const collisionsDetected: number[] = [];

    for (let k = 0; k < keysCount; k++) {
      const bIdx = k % bucketCount;
      const stack = bucketHeights[bIdx];
      bucketHeights[bIdx]++;

      const x = (bIdx - bucketCount / 2 + 0.5) * spacing;
      const yTarget = -1.6 + stack * 0.44;

      const isCollision = stack >= 1; // More than 1 item in same bucket!
      if (isCollision && !collisionsDetected.includes(bIdx)) {
        collisionsDetected.push(bIdx);
      }

      const ballMat = new THREE.MeshStandardMaterial({
        color: isCollision ? 0xf43f5e : 0x06b6d4, // RED = COLLISION, CYAN = SAFE
        emissive: isCollision ? 0xbe123c : 0x0284c7,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });

      const ball = new THREE.Mesh(ballGeo, ballMat);
      ball.position.set(x, 4 + k * 0.25, 0);
      group.add(ball);

      gsap.to(ball.position, {
        y: yTarget,
        duration: 0.65,
        delay: k * 0.04,
        ease: "bounce.out",
      });

      // Highlight bucket when collision occurs
      if (isCollision) {
        gsap.to((bucketMeshes[bIdx].material as THREE.MeshStandardMaterial).color, {
          r: 0.95,
          g: 0.2,
          b: 0.35,
          duration: 0.3,
          delay: k * 0.04 + 0.3,
        });
      }
    }

    setActiveBucketCollisions(collisionsDetected);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.35) * 0.08;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = "";
      }
    };
  }, [keysCount]);

  const hasCollision = keysCount > 10;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 my-4 shadow-xl">
      {/* Visual Explanation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Pigeonhole Principle Simulator</span>
            {hasCollision ? (
              <span className="text-xs bg-rose-950 text-rose-300 border border-rose-600 px-2.5 py-0.5 rounded-full font-bold animate-pulse">
                Collision Detected!
              </span>
            ) : (
              <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-600 px-2.5 py-0.5 rounded-full font-bold">
                No Collision (Safe)
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            <strong>Rule:</strong> Agar 10 boxes me 11 ya usse zyada balls daloge, toh kam se kam ek box me 2 balls zaroor aayengi (Red color).
          </p>
        </div>

        {/* User Interactive Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onAddKey}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <FaPlus className="w-3 h-3" /> Ek Aur Ball Daalo ({keysCount})
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 3D Visual Canvas */}
      <div
        ref={mountRef}
        className="w-full h-64 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800 relative bg-slate-50 dark:bg-[#020617] shadow-inner transition-colors duration-300"
      />

      {/* Clear Bottom Explanation Box */}
      <div className="mt-3 p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs space-y-1.5 shadow-sm">
        <div className="flex items-center justify-between text-slate-800 dark:text-slate-300 font-mono">
          <span>Total Boxes = <strong>10</strong></span>
          <span>Total Balls = <strong className="text-cyan-700 dark:text-cyan-400">{keysCount}</strong></span>
          <span>Status: {hasCollision ? <strong className="text-rose-600 dark:text-rose-400">Crash / Collision</strong> : <strong className="text-emerald-700 dark:text-emerald-400">1 Ball Per Box</strong>}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block shadow-sm" /> Blue Ball: Safe (Akeli ball)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm" /> Red Ball: Collision (Ek hi box me 2 ya zyada balls)
          </span>
        </div>
      </div>
    </div>
  );
}
