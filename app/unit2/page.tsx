"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { UnitNavigation } from "../components/UnitNavigation";
import { Concept3DVisualizer } from "../components/Concept3DVisualizer";
import {
  FaChartLine,
  FaCalculator,
  FaCheckCircle,
  FaPlay,
  FaTerminal,
  FaLightbulb,
  FaBook,
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

interface Unit2Mission {
  id: number;
  title: string;
  topic: string;
  story: string;
  csApplication: string;
  mathFormula: string;
  instructions: string;
  hint: string;
  solution: string;
}

const UNIT2_MISSIONS: Unit2Mission[] = [
  {
    id: 1,
    title: "Mission 1: Precision Floating-Point Error Auditor",
    topic: "Types of Errors (Absolute, Relative, Percentage)",
    story: "A self-driving telemetry engine measures sensor velocity true value V = 125.000 m/s, but radar noise registers approx value V' = 124.750 m/s. Compute the absolute error, relative error, and percentage error to verify telemetry safety.",
    csApplication: "IEEE 754 Floating-Point arithmetic, catastrophic cancellation, numerical stability in GPU shaders, and sensor drift compensation.",
    mathFormula: "E_abs = |X - X'|  |  E_rel = |X - X'| / |X|  |  E_pct = E_rel × 100%",
    instructions: "Given True = 125, Approx = 124.75. Calculate: 1) Absolute Error |125 - 124.75|, 2) Relative Error (as decimal), 3) Percentage Error (%).",
    hint: "E_abs = 0.25. E_rel = 0.25 / 125 = 0.002. E_pct = 0.002 × 100 = 0.2%.",
    solution: "E_abs = 0.25, E_rel = 0.002, E_pct = 0.2%.",
  },
  {
    id: 2,
    title: "Mission 2: Transcendental Root-Finder (Bisection & Newton-Raphson)",
    topic: "Bisection, Regula-Falsi, Newton-Raphson & Secant Methods",
    story: "An autonomous drone PID controller seeks equilibrium root for f(x) = x^2 - 5 = 0 (finding √5 ≈ 2.236). Run one step of Newton-Raphson iteration from initial guess x_0 = 2.0.",
    csApplication: "Inverse kinematics in robotics, rendering ray-marching bounding volumes, financial yield solvers, and machine learning gradient descent roots.",
    mathFormula: "Newton-Raphson: x_{n+1} = x_n - f(x_n) / f'(x_n)  where f'(x) = 2x",
    instructions: "For f(x) = x^2 - 5, x_0 = 2, f(2) = -1, f'(2) = 4. What is the next approximation x_1? [2 - (-1)/4 = 2.25]. Enter x_1.",
    hint: "x_1 = 2 - (-1)/4 = 2 + 0.25 = 2.25.",
    solution: "x_1 = 2.25 (an instantaneous jump closer to 2.236067).",
  },
  {
    id: 3,
    title: "Mission 3: Linear System Matrix Inverter (Gauss Elimination & Jordan)",
    topic: "Gauss Elimination & Gauss-Jordan Method",
    story: "Solve server load balance equations: [2x + y = 8] and [x + 3y = 9] using Gaussian row reduction. Determine the exact CPU task allocations x and y.",
    csApplication: "3D Graphics pipeline transformation matrices, network flow Kirchhoff current solvers, finite element physical simulations, and deep neural network linear layers.",
    mathFormula: "Augmented Matrix: [A | B] → Row Echelon Form → Back-Substitution",
    instructions: "Solve the 2x2 system: 2x + y = 8 and x + 3y = 9. Enter values of x and y.",
    hint: "Multiply 2nd eq by 2: 2x + 6y = 18. Subtract 1st eq: 5y = 10 ⇒ y = 2. Then 2x + 2 = 8 ⇒ x = 3.",
    solution: "x = 3, y = 2.",
  },
  {
    id: 4,
    title: "Mission 4: Iterative Converger (Gauss-Seidel & Jacobi Methods)",
    topic: "Gauss-Seidel and Jacobi Iterative Methods",
    story: "Large sparse systems (like Google PageRank matrices) cannot be solved by direct elimination. Test diagonal dominance and perform 1 iteration of Jacobi method for: 4x + y = 9, x + 5y = 11 starting with (x_0, y_0) = (0, 0).",
    csApplication: "Solving massive sparse linear systems in computational fluid dynamics, PageRank web graph crawling, and GPU parallel shader solvers.",
    mathFormula: "Diagonal Dominance: |a_{ii}| > ∑_{j≠i} |a_{ij}|  |  Jacobi: x^{k+1} = (b_i - ∑ a_{ij} x_j^k) / a_{ii}",
    instructions: "With initial (x_0=0, y_0=0), compute x_1 = 9/4 and y_1 = 11/5 as decimals.",
    hint: "x_1 = 9 / 4 = 2.25. y_1 = 11 / 5 = 2.2.",
    solution: "x_1 = 2.25, y_1 = 2.20.",
  },
  {
    id: 5,
    title: "Mission 5: Frame Interpolator (Newton & Lagrange Interpolation)",
    topic: "Newton's Forward/Backward & Lagrange's Interpolation",
    story: "A video streaming player loses a packet at time t = 2. Known keyframes are at (t=1, v=10) and (t=3, v=30). Using Lagrange's linear interpolation or Newton divided difference, estimate v(2).",
    csApplication: "Game physics frame interpolation (anti-aliasing, DLSS frame generation), audio resampling, digital image upscaling (bicubic interpolation), and missing sensor telemetry reconstruction.",
    mathFormula: "Lagrange: P(x) = y_0(x - x_1)/(x_0 - x_1) + y_1(x - x_0)/(x_1 - x_0)",
    instructions: "Interpolate v(2) between (1, 10) and (3, 30). Enter estimated value.",
    hint: "Line midpoint: (10 + 30) / 2 = 20.",
    solution: "v(2) = 20.",
  },
];

export default function Unit2Page() {
  const [activeMissionId, setActiveMissionId] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Inputs for missions
  const [m1Abs, setM1Abs] = useState("");
  const [m1Rel, setM1Rel] = useState("");
  const [m1Pct, setM1Pct] = useState("");
  const [m2Root, setM2Root] = useState("");
  const [m3X, setM3X] = useState("");
  const [m3Y, setM3Y] = useState("");
  const [m4X, setM4X] = useState("");
  const [m4Y, setM4Y] = useState("");
  const [m5Val, setM5Val] = useState("");

  const [feedback, setFeedback] = useState<{ status: "idle" | "correct" | "incorrect"; msg: string }>({
    status: "idle",
    msg: "",
  });

  const activeMission = UNIT2_MISSIONS.find((m) => m.id === activeMissionId) || UNIT2_MISSIONS[0];

  const handleSuccess = (pts: number, msg: string) => {
    setFeedback({ status: "correct", msg });
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    if (!completed.includes(activeMissionId)) {
      setCompleted([...completed, activeMissionId]);
      setScore((prev) => prev + pts);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMissionId === 1) {
      if (m1Abs.trim() === "0.25" && m1Rel.trim() === "0.002" && m1Pct.trim() === "0.2") {
        handleSuccess(100, "ERRORS AUDITED! Absolute=0.25, Relative=0.002, Percentage=0.2%. Floating-point precision verified.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK FORMULAS: E_abs = |125-124.75|=0.25. E_rel = 0.25/125=0.002. E_pct = 0.2%." });
      }
    } else if (activeMissionId === 2) {
      if (m2Root.trim() === "2.25") {
        handleSuccess(100, "NEWTON-RAPHSON CONVERGED! x_1 = 2 - (-1)/4 = 2.25. Quadratic convergence rate confirmed.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK FORMULA: x_1 = 2 - (2^2 - 5)/(2×2) = 2 - (-1)/4 = 2.25." });
      }
    } else if (activeMissionId === 3) {
      if (m3X.trim() === "3" && m3Y.trim() === "2") {
        handleSuccess(100, "GAUSSIAN ELIMINATION SOLVED! Solution vector [x=3, y=2] satisfies linear load balance matrix.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK ROW REDUCTION: 2x + y = 8, 2x + 6y = 18 ⇒ 5y = 10 ⇒ y = 2, x = 3." });
      }
    } else if (activeMissionId === 4) {
      if (m4X.trim() === "2.25" && m4Y.trim() === "2.2") {
        handleSuccess(100, "JACOBI ITERATION 1 COMMITTED! x_1 = 9/4 = 2.25, y_1 = 11/5 = 2.20. Diagonally dominant convergence active.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK FORMULA: x_1 = (9 - 0)/4 = 2.25, y_1 = (11 - 0)/5 = 2.2." });
      }
    } else if (activeMissionId === 5) {
      if (m5Val.trim() === "20") {
        handleSuccess(100, "FRAME INTERPOLATION RESTORED! P(2) = 20. Keyframe signal smoothly reconstructed.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK INTERPOLATION: Linear interpolation between (1,10) and (3,30) at t=2 is 20." });
      }
    }
  };

  const emailText = `Respected Ma'am,

I am submitting my Foundation of Mathematics Innovative Assignment for Unit 2: Numerical Methods.

Assignment Details:
• Name: [Your Name]
• Enrolment Number: [Your Enrolment Number]
• Programme: BCA / B.Tech / Integrated MCA
• Semester: Semester 1 / 2
• Division: [Your Division]
• Chosen Unit: Unit 2 — Numerical Methods
• Assignment Title: Numerical Convergence & Precision Engine (Interactive Simulation)
• Working Project Link / Zip: [Attached / Hosted URL]

Assignment Objective:
To demonstrate how computational numerical algorithms (floating-point error bounds, Newton-Raphson quadratic root convergence, Gaussian elimination, Jacobi iterative solvers, and polynomial interpolation) form the backbone of graphics rendering, robotics PID controllers, machine learning optimization, and signal processing.

Summary of Unit 2 Topics Covered:
1. Types of Errors: Absolute, Relative, and Percentage error in IEEE 754 floating-point operations.
2. Root-Finding Methods: Bisection, Regula-Falsi, Newton-Raphson, and Secant methods.
3. System of Linear Equations: Gauss Elimination and Gauss-Jordan row reduction.
4. Iterative Methods: Gauss-Seidel and Jacobi iterative convergence on diagonally dominant matrices.
5. Polynomial Interpolation: Newton's Forward/Backward and Lagrange interpolation for game frame generation and audio reconstruction.

Thank you for your guidance and support.

Sincerely,
[Your Name]
[Enrolment Number]`;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-1 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <img src="/unit2-badge.svg" alt="Unit 2 Badge" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-base sm:text-lg text-white">
                  NUMERICAL CONVERGENCE LAB
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                  Unit 2 Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Foundation of Mathematics (FM) • Numerical Methods Simulation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Solver Progress</div>
                <div className="text-sm font-black text-emerald-400 font-mono">
                  {score} PTS ({completed.length}/5 Cleared)
                </div>
              </div>
              <FaTrophy className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Unit Switcher */}
        <UnitNavigation currentUnit={2} />

        {/* Hero Section */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/20 p-6 md:p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold mb-3">
            <HiSparkles className="w-4 h-4 text-emerald-400" />
            <span>Unit 2: Numerical Methods & Computational Approximation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Simulate Errors, Roots, Systems & Interpolation
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Solve root-finding, matrix inversion, and interpolation challenges that power game engines, physics engines, and GPU graphics pipelines.
          </p>
        </div>

        {/* Level Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {UNIT2_MISSIONS.map((m) => {
            const isDone = completed.includes(m.id);
            const isActive = m.id === activeMissionId;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMissionId(m.id);
                  setFeedback({ status: isDone ? "correct" : "idle", msg: isDone ? "Sector already validated!" : "" });
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500/15 border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/20"
                    : isDone
                    ? "bg-slate-900/80 border-emerald-500/40"
                    : "bg-slate-900/40 border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-400">Mission #{m.id}</span>
                  {isDone && <FaCheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-xs font-semibold text-white line-clamp-2">{m.topic}</div>
              </button>
            );
          })}
        </div>

        {/* Active Mission Interactive Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Mission #{activeMission.id} • {activeMission.topic}
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">{activeMission.title}</h2>
            </div>
            {feedback.status === "correct" && (
              <div className="flex items-center gap-2 bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-xs font-bold">
                <FaCheckCircle className="w-4 h-4" /> Sector Cleared (+100 PTS)
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-sm text-slate-300">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold block mb-1">
              /// Scenario Briefing
            </span>
            <p>{activeMission.story}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-800/40">
              <span className="font-mono text-teal-300 font-bold uppercase block mb-1">
                💻 Computing Field Application
              </span>
              <p className="text-slate-300 leading-relaxed">{activeMission.csApplication}</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40">
              <span className="font-mono text-emerald-300 font-bold uppercase block mb-1">
                📐 Mathematical Law & Formula
              </span>
              <p className="font-mono text-emerald-200 leading-relaxed">{activeMission.mathFormula}</p>
            </div>
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleVerify} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-xs font-mono text-amber-300 mb-2">⚡ OBJECTIVE: {activeMission.instructions}</p>

            {activeMission.id === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Absolute Error E_abs:</label>
                  <input
                    type="text"
                    value={m1Abs}
                    onChange={(e) => setM1Abs(e.target.value)}
                    placeholder="e.g. 0.25"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Relative Error E_rel:</label>
                  <input
                    type="text"
                    value={m1Rel}
                    onChange={(e) => setM1Rel(e.target.value)}
                    placeholder="e.g. 0.002"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Percentage Error E_pct (%):</label>
                  <input
                    type="text"
                    value={m1Pct}
                    onChange={(e) => setM1Pct(e.target.value)}
                    placeholder="e.g. 0.2"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {activeMission.id === 2 && (
              <div className="space-y-4">
                {/* Embedded 3D Newton-Raphson Curve & Tangent Solver */}
                <Concept3DVisualizer unitId={2} levelId={2} />

                <div className="max-w-md">
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Next Newton-Raphson approximation x_1:
                  </label>
                  <input
                    type="text"
                    value={m2Root}
                    onChange={(e) => setM2Root(e.target.value)}
                    placeholder="Enter x_1 (e.g. 2.25)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {activeMission.id === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Value of x:</label>
                  <input
                    type="number"
                    value={m3X}
                    onChange={(e) => setM3X(e.target.value)}
                    placeholder="x = ?"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Value of y:</label>
                  <input
                    type="number"
                    value={m3Y}
                    onChange={(e) => setM3Y(e.target.value)}
                    placeholder="y = ?"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {activeMission.id === 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">First Jacobi iterate x_1:</label>
                  <input
                    type="text"
                    value={m4X}
                    onChange={(e) => setM4X(e.target.value)}
                    placeholder="9/4 = 2.25"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">First Jacobi iterate y_1:</label>
                  <input
                    type="text"
                    value={m4Y}
                    onChange={(e) => setM4Y(e.target.value)}
                    placeholder="11/5 = 2.2"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {activeMission.id === 5 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Interpolated value v(2) at t = 2:
                </label>
                <input
                  type="number"
                  value={m5Val}
                  onChange={(e) => setM5Val(e.target.value)}
                  placeholder="Enter estimated value"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Execute Numerical Solver
            </button>
          </form>

          {/* Feedback */}
          {feedback.status !== "idle" && (
            <div
              className={`p-4 rounded-xl border text-xs font-semibold ${
                feedback.status === "correct"
                  ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-950/60 border-rose-500/40 text-rose-200"
              }`}
            >
              <p>{feedback.msg}</p>
            </div>
          )}

          <details className="text-xs font-mono text-slate-400 cursor-pointer">
            <summary className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <FaLightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Need Assistance? Click for Numerical Method Hint</span>
            </summary>
            <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <p className="text-emerald-300 font-bold mb-1">Solution Formula Guide:</p>
              <p>{activeMission.hint}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}

