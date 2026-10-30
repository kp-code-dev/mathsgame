"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { FaPlay, FaRedo } from "react-icons/fa";

interface VisualizerProps {
  unitId: 2 | 3 | 4;
  levelId: number;
}

export function Concept3DVisualizer({ unitId, levelId }: VisualizerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 6);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    const grid = new THREE.GridHelper(16, 16, 0x38bdf8, 0x1e293b);
    grid.position.y = -2;
    scene.add(grid);

    // ==========================================================
    // UNIT 2: NEWTON-RAPHSON ROOT FINDER
    // ==========================================================
    if (unitId === 2) {
      camera.position.set(1.5, 2, 8);
      camera.lookAt(1.5, 0, 0);

      // 1. Draw Function Curve f(x) = x^2 - 5 in Green
      const points: THREE.Vector3[] = [];
      for (let x = 0; x <= 3.5; x += 0.05) {
        const y = (x * x - 5) * 0.55;
        points.push(new THREE.Vector3(x * 1.8 - 2, y, 0));
      }
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 3 });
      const curve = new THREE.Line(curveGeo, curveMat);
      group.add(curve);

      // 2. White Horizontal X-Axis Line (f(x) = 0)
      const axisGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3.5, 0, 0),
        new THREE.Vector3(5.5, 0, 0),
      ]);
      const axisMat = new THREE.LineBasicMaterial({ color: 0xe2e8f0 });
      const axis = new THREE.Line(axisGeo, axisMat);
      group.add(axis);

      // 3. True Root Marker (√5 ≈ 2.236)
      const rootX = Math.sqrt(5) * 1.8 - 2;
      const rootGeo = new THREE.SphereGeometry(0.25, 24, 24);
      const rootMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.8,
      });
      const rootMesh = new THREE.Mesh(rootGeo, rootMat);
      rootMesh.position.set(rootX, 0, 0);
      group.add(rootMesh);

      // 4. Starting Guess x_0 = 2.0 (Blue Ball on Curve)
      const x0 = 2.0;
      const x0Screen = x0 * 1.8 - 2;
      const y0 = (x0 * x0 - 5) * 0.55; // -0.55

      const guessGeo = new THREE.SphereGeometry(0.22, 20, 20);
      const guessMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
      });
      const guessMesh = new THREE.Mesh(guessGeo, guessMat);
      guessMesh.position.set(x0Screen, y0, 0);
      group.add(guessMesh);

      // 5. Tangent Line from (x_0, y_0) down to x_1 = 2.25 on the X-axis
      const x1 = 2.25;
      const x1Screen = x1 * 1.8 - 2;

      const tangentGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x0Screen - 0.7, y0 - 0.7 * (2 * x0 * 0.55), 0),
        new THREE.Vector3(x1Screen, 0, 0),
        new THREE.Vector3(x0Screen + 0.6, y0 + 0.6 * (2 * x0 * 0.55), 0),
      ]);
      const tangentMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
      const tangent = new THREE.Line(tangentGeo, tangentMat);
      group.add(tangent);

      // 6. Next Step x_1 Marker (Yellow Ball on X-Axis)
      const nextGeo = new THREE.SphereGeometry(0.22, 20, 20);
      const nextMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xd97706,
        emissiveIntensity: 0.9,
      });
      const nextMesh = new THREE.Mesh(nextGeo, nextMat);
      nextMesh.position.set(x1Screen, 0, 0);
      group.add(nextMesh);

      // Tangent sliding animation
      gsap.from(tangent.scale, { x: 0, duration: 1.2, ease: "power2.out" });
      gsap.to(nextMesh.scale, { x: 1.3, y: 1.3, z: 1.3, yoyo: true, repeat: -1, duration: 0.6 });
    }

    // ==========================================================
    // UNIT 3: LINEAR PROGRAMMING FEASIBLE POLYGON
    // ==========================================================
    else if (unitId === 3) {
      camera.position.set(2, 3, 7.5);
      camera.lookAt(1.2, 0.8, 0);

      // Polygon points: (0,0) -> (5,0) -> (4,2) -> (0,4)
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(3.2, 0);     // (5, 0) scaled
      shape.lineTo(2.6, 1.4);   // (4, 2) scaled (OPTIMAL CORNER)
      shape.lineTo(0, 2.7);     // (0, 4) scaled
      shape.closePath();

      const geom = new THREE.ExtrudeGeometry(shape, { depth: 0.4, bevelEnabled: false });
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.2,
        metalness: 0.3,
        transparent: true,
        opacity: 0.7,
      });
      const polyMesh = new THREE.Mesh(geom, mat);
      polyMesh.position.set(-1.2, -0.6, -0.2);
      group.add(polyMesh);

      // Highlight the 4 corner points with spheres
      const corners = [
        { name: "(0,0) [Profit = 0]", x: -1.2, y: -0.6, isBest: false },
        { name: "(5,0) [Profit = 15]", x: 2.0, y: -0.6, isBest: false },
        { name: "(0,4) [Profit = 16]", x: -1.2, y: 2.1, isBest: false },
        { name: "(4,2) [MAX PROFIT = 20]", x: 1.4, y: 0.8, isBest: true },
      ];

      corners.forEach((c) => {
        const cGeo = new THREE.SphereGeometry(c.isBest ? 0.28 : 0.16, 20, 20);
        const cMat = new THREE.MeshStandardMaterial({
          color: c.isBest ? 0xfbbf24 : 0x94a3b8,
          emissive: c.isBest ? 0xd97706 : 0x334155,
          emissiveIntensity: c.isBest ? 0.9 : 0.3,
        });
        const cMesh = new THREE.Mesh(cGeo, cMat);
        cMesh.position.set(c.x, c.y, 0.25);
        group.add(cMesh);

        if (c.isBest) {
          gsap.to(cMesh.scale, { x: 1.35, y: 1.35, z: 1.35, yoyo: true, repeat: -1, duration: 0.7 });
        }
      });
    }

    // ==========================================================
    // UNIT 4: HASSE DIAGRAM DIVISOR LATTICE D_12
    // ==========================================================
    else if (unitId === 4) {
      camera.position.set(0, 1.8, 7);
      camera.lookAt(0, 1.4, 0);

      // Divisor lattice nodes of 12: {1, 2, 3, 4, 6, 12}
      const latticeNodes = [
        { val: 1, x: 0, y: -0.7, color: 0x64748b, desc: "Bottom (1)" },
        { val: 2, x: -1.3, y: 0.6, color: 0x10b981, desc: "MEET / GCD(4,6) = 2" },
        { val: 3, x: 1.3, y: 0.6, color: 0x64748b, desc: "3" },
        { val: 4, x: -1.3, y: 2.2, color: 0x38bdf8, desc: "Element 4" },
        { val: 6, x: 1.3, y: 2.2, color: 0x38bdf8, desc: "Element 6" },
        { val: 12, x: 0, y: 3.5, color: 0xa855f7, desc: "JOIN / LCM(4,6) = 12" },
      ];

      const edges = [
        [1, 2], [1, 3],
        [2, 4], [2, 6],
        [3, 6],
        [4, 12], [6, 12],
      ];

      // Draw connecting lines
      edges.forEach(([fromVal, toVal]) => {
        const from = latticeNodes.find((n) => n.val === fromVal)!;
        const to = latticeNodes.find((n) => n.val === toVal)!;

        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(from.x, from.y, 0),
          new THREE.Vector3(to.x, to.y, 0),
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      });

      // Draw Spheres
      latticeNodes.forEach((n) => {
        const isTarget = n.val === 2 || n.val === 12 || n.val === 4 || n.val === 6;
        const sGeo = new THREE.SphereGeometry(isTarget ? 0.3 : 0.22, 20, 20);
        const sMat = new THREE.MeshStandardMaterial({
          color: n.color,
          emissive: n.color,
          emissiveIntensity: isTarget ? 0.8 : 0.2,
        });
        const mesh = new THREE.Mesh(sGeo, sMat);
        mesh.position.set(n.x, n.y, 0);
        group.add(mesh);
      });
    }

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.3) * 0.08;
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
  }, [unitId, levelId]);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 my-4 shadow-xl">
      {/* Clear Topic Title */}
      <div className="border-b border-slate-800 pb-3 mb-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          {unitId === 2 && "Newton-Raphson Method: Tangent Line Visualizer"}
          {unitId === 3 && "Linear Programming: 3D Feasible Polygon & Best Corner Point"}
          {unitId === 4 && "Hasse Diagram Lattice D_12: Meet (GCD) & Join (LCM)"}
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          {unitId === 2 && "Dekho: Blue guess point (x₀=2) par tangent line banti hai aur seedhe x-axis par agle point x₁=2.25 par jump karti hai jo exact root (Green √5) ke sabse paas hai."}
          {unitId === 3 && "Dekho: Saare rules se bana blue polygon (Feasible Region). Maximum profit hamesha kone par milta hai: Golden point (4, 2) par profit = 20."}
          {unitId === 4 && "Dekho: 4 aur 6 (Blue) ka sabse pehla common niche ka node GCD (Meet = 2 Green) hai, aur sabse pehla upar ka common node LCM (Join = 12 Purple) hai."}
        </p>
      </div>

      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-64 rounded-xl overflow-hidden border border-slate-800 bg-[#020617]"
      />

      {/* Meaningful Visual Legend */}
      <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        {unitId === 2 && (
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              Green Curve: f(x) = x² - 5
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
              Blue Point: Initial Guess x₀ = 2.0
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              Yellow Point: Next Guess x₁ = 2.25
            </span>
          </div>
        )}

        {unitId === 3 && (
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-sky-500 inline-block" />
              Blue Area: Valid Feasible Region
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
              Golden Vertex: (4, 2) Max Profit = 20
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              Other points: (5,0)=15, (0,4)=16
            </span>
          </div>
        )}

        {unitId === 4 && (
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
              Blue Balls: Elements 4 and 6
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              Green Ball: Meet = GCD(4, 6) = 2
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
              Purple Ball: Join = LCM(4, 6) = 12
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
