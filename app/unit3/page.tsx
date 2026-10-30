"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { UnitNavigation } from "../components/UnitNavigation";
import { Concept3DVisualizer } from "../components/Concept3DVisualizer";
import {
  FaProjectDiagram,
  FaCheckCircle,
  FaPlay,
  FaLightbulb,
  FaBook,
  FaCopy,
  FaCheck,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

interface Unit3Mission {
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

const UNIT3_MISSIONS: Unit3Mission[] = [
  {
    id: 1,
    title: "Mission 1: Cloud Server LPP Resource Optimizer",
    topic: "Graphical Solution for 2-Variable LPP (Feasible Region & Corner Points)",
    story: "A cloud datacenter can deploy two types of server instances: x (Standard: 2 cores, $1 profit) and y (High-Mem: 1 core, $2 profit). Constraints: Total cores: 2x + y ≤ 10; RAM constraint: x + 2y ≤ 8; Non-negativity x, y ≥ 0. Maximize profit Z = 3x + 4y.",
    csApplication: "AWS/GCP autoscaling cost optimization, packet bandwidth scheduling, and database replica memory footprint tuning.",
    mathFormula: "Maximize Z = c_1 x_1 + c_2 x_2 subject to A x ≤ b. Corner Points evaluate optimal vertex.",
    instructions: "Evaluate the corner points: (0,0), (5,0), (0,4), and the intersection of (2x+y=10, x+2y=8) at (4,2). What is the maximum profit Z = 3(4) + 4(2)?",
    hint: "At (4, 2): Z = 3(4) + 4(2) = 12 + 8 = 20. Other points: (5,0) ⇒ 15; (0,4) ⇒ 16.",
    solution: "Maximum Profit Z = 20 at point (x=4, y=2).",
  },
  {
    id: 2,
    title: "Mission 2: Simplex Tableau Optimizer & Slack Variables",
    topic: "Standard Form of LPP & Simplex Tableau Method",
    story: "Convert inequality constraints x_1 + 2 x_2 ≤ 14 into standard equality form by adding slack variable s_1. Find how many basic variables are needed for an m=2 constraint system.",
    csApplication: "Solving production supply-chain optimization, compiler register allocation, and route optimization with thousands of constraints.",
    mathFormula: "Standard Form: Maximize c^T x s.t. A x + I s = b, x ≥ 0, s ≥ 0.",
    instructions: "If a problem has n=2 decision variables and m=2 inequality constraints, how many total variables exist in standard form (decision + slack)?",
    hint: "Total variables = n + m = 2 + 2 = 4.",
    solution: "Total variables = 4 (x_1, x_2, s_1, s_2).",
  },
  {
    id: 3,
    title: "Mission 3: Duality Theorem & Shadow Price Auditor",
    topic: "Concept of Duality & Formulation of Dual Problem",
    story: "Every primal maximization problem has an equivalent dual minimization problem. If Primal has m=3 constraints and n=4 variables, how many variables does the Dual have?",
    csApplication: "Shadow pricing in distributed systems, marginal resource costs in cloud infrastructure, and game-theoretic minimax duality.",
    mathFormula: "Primal: Max c^T x s.t. Ax ≤ b  ⇔  Dual: Min b^T y s.t. A^T y ≥ c",
    instructions: "How many dual variables correspond to a primal with 3 constraints? Enter number.",
    hint: "Each primal constraint generates exactly one dual variable (y_1, y_2, y_3).",
    solution: "3 dual variables.",
  },
  {
    id: 4,
    title: "Mission 4: Network Routing Transportation Solver",
    topic: "Transportation Problem (North-West Corner & Least Cost Method)",
    story: "A content delivery network (CDN) routes data from 2 data hubs to 2 user regions. Total supply = 50 + 50 = 100 packets, total demand = 60 + 40 = 100. Using North-West Corner rule, how many units are allocated to the first cell (1, 1)?",
    csApplication: "Content Delivery Network (CDN) traffic redirection (Akamai/Cloudflare edge servers), P2P file chunk routing, and logistics supply chain.",
    mathFormula: "x_{11} = min(Supply_1, Demand_1) = min(50, 60)",
    instructions: "Supply_1 = 50, Demand_1 = 60. What is min(50, 60)?",
    hint: "min(50, 60) = 50.",
    solution: "50 units allocated to Cell(1,1).",
  },
  {
    id: 5,
    title: "Mission 5: Hungarian Worker-to-Task Matcher",
    topic: "Assignment Problem (Hungarian Method)",
    story: "Assign 3 software engineers to 3 pull request review queues to minimize total review hours using the Hungarian Algorithm. If costs in reduced matrix row are [0, 4, 2], which worker index (1, 2, or 3) has zero additional cost penalty?",
    csApplication: "Thread-to-core binding (affinity scheduling in OS kernels), GPU task graph mapping, and pairing ride-share drivers with requests.",
    mathFormula: "Hungarian: Row Reduction → Column Reduction → Minimal Line Covering → Optimal Assignment",
    instructions: "Enter the index (1, 2, or 3) of the element with cost 0 in [0, 4, 2].",
    hint: "The first element is at index 1.",
    solution: "Worker Index 1.",
  },
  {
    id: 6,
    title: "Mission 6: Cybersecurity Game Theory (Minimax & Saddle Point)",
    topic: "Two-Person Zero-Sum Games & Saddle Point Analysis",
    story: "A security defender faces an attacker. The payoff matrix for Defender strategies (Rows) vs Attacker strategies (Cols) is: Row 1: [3, 2]; Row 2: [1, 4]. Row 1 minimum is 2 (Maximin = 2). Col maximums are [3, 4] (Minimax = 3). Does a pure saddle point exist?",
    csApplication: "Automated honeypot intrusion detection defense, adversarial machine learning (GANs: generator vs discriminator), and competitive multi-agent AI.",
    mathFormula: "Saddle Point exists iff Maximin = Minimax. If not, use mixed strategies.",
    instructions: "Since Maximin (2) ≠ Minimax (3), does a pure saddle point exist? Enter 'NO' or 'YES'.",
    hint: "Since 2 ≠ 3, answer is NO.",
    solution: "NO (Mixed strategy required via graphical method).",
  },
];

export default function Unit3Page() {
  const [activeMissionId, setActiveMissionId] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Inputs
  const [m1Ans, setM1Ans] = useState("");
  const [m2Ans, setM2Ans] = useState("");
  const [m3Ans, setM3Ans] = useState("");
  const [m4Ans, setM4Ans] = useState("");
  const [m5Ans, setM5Ans] = useState("");
  const [m6Ans, setM6Ans] = useState("");

  const [feedback, setFeedback] = useState<{ status: "idle" | "correct" | "incorrect"; msg: string }>({
    status: "idle",
    msg: "",
  });

  const activeMission = UNIT3_MISSIONS.find((m) => m.id === activeMissionId) || UNIT3_MISSIONS[0];

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
      if (m1Ans.trim() === "20") {
        handleSuccess(100, "OPTIMAL CORNER POINT IDENTIFIED! Max Profit Z = 20 at vertex (4, 2). Cloud resource cost minimized.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK CORNER POINTS: At (4, 2): 3(4) + 4(2) = 12 + 8 = 20." });
      }
    } else if (activeMissionId === 2) {
      if (m2Ans.trim() === "4") {
        handleSuccess(100, "SLACK VARIABLES GENERATED! Total 4 variables [x_1, x_2, s_1, s_2] setup for Simplex tableau.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK VARIABLES: 2 decision + 2 slack = 4 total variables." });
      }
    } else if (activeMissionId === 3) {
      if (m3Ans.trim() === "3") {
        handleSuccess(100, "DUAL PROBLEM FORMULATED! 3 primal constraints yield exactly 3 dual shadow price variables.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK DUALITY: Number of dual variables equals number of primal constraints (3)." });
      }
    } else if (activeMissionId === 4) {
      if (m4Ans.trim() === "50") {
        handleSuccess(100, "NORTH-WEST ALLOCATION COMPLETE! 50 units dispatched to edge server (1, 1).");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK NW CORNER: Cell(1,1) = min(Supply_1, Demand_1) = min(50, 60) = 50." });
      }
    } else if (activeMissionId === 5) {
      if (m5Ans.trim() === "1") {
        handleSuccess(100, "HUNGARIAN ASSIGNMENT SECURED! Index 1 has zero penalty for optimal task matching.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK INDEX: The zero cost entry is at position index 1." });
      }
    } else if (activeMissionId === 6) {
      if (m6Ans.trim().toUpperCase() === "NO") {
        handleSuccess(100, "GAME THEORETIC DEFENSE SOLVED! Maximin (2) ≠ Minimax (3) proves no pure saddle point exists.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK SADDLE CRITERIA: A pure saddle point exists only if Maximin = Minimax. Since 2 ≠ 3, answer is NO." });
      }
    }
  };

  const emailText = `Respected Ma'am,

I am submitting my Foundation of Mathematics Innovative Assignment for Unit 3: Operations Research and Linear Programming.

Assignment Details:
• Name: [Your Name]
• Enrolment Number: [Your Enrolment Number]
• Programme: BCA / B.Tech / Integrated MCA
• Semester: Semester 1 / 2
• Division: [Your Division]
• Chosen Unit: Unit 3 — Operations Research and Linear Programming
• Assignment Title: OptiSim Tycoon: Operations Research & Linear Programming Simulator
• Working Project Link / Zip: [Attached / Hosted URL]

Assignment Objective:
To demonstrate how linear programming and operations research (graphical corner-point optimization, Simplex slacks, Duality shadow pricing, Transportation routing, Hungarian task assignment, and Game Theory minimax defenses) solve core computational infrastructure challenges in cloud scaling, CDN traffic routing, OS thread scheduling, and cybersecurity defense.

Summary of Unit 3 Topics Covered:
1. Graphical Linear Programming: Feasible region corner-point analysis for multi-resource cloud scaling.
2. Simplex Algorithm: Slack variable transformation into standard tableau form.
3. Duality Concept: Formulation of dual problem and shadow pricing in distributed clusters.
4. Transportation Problem: Initial Basic Feasible Solution (IBFS) via North-West Corner Rule for CDN traffic.
5. Assignment Problem: Hungarian Method for optimal thread-to-core review queue matching.
6. Game Theory: Two-person zero-sum games, Maximin vs Minimax saddle point criteria in cybersecurity honeypots.

Thank you for your guidance and support.

Sincerely,
[Your Name]
[Enrolment Number]`;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <FaProjectDiagram className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-base sm:text-lg text-white">
                  OPTISIM TYCOON
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                  Unit 3 Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Operations Research & Linear Programming Simulation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Optimization Score</div>
                <div className="text-sm font-black text-amber-400 font-mono">
                  {score} PTS ({completed.length}/6 Cleared)
                </div>
              </div>
              <FaTrophy className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <UnitNavigation currentUnit={3} />

        <div className="rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/40 border border-amber-500/20 p-6 md:p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
            <HiSparkles className="w-4 h-4 text-amber-400" />
            <span>Unit 3: Operations Research & Linear Programming</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Optimize Cloud Scale, Network Flow & Game Minimax
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Solve real-world computing problems: server allocation via LPP, CDN packet transportation, Hungarian task assignment, and cybersecurity minimax game theory.
          </p>
        </div>

        {/* Level Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {UNIT3_MISSIONS.map((m) => {
            const isDone = completed.includes(m.id);
            const isActive = m.id === activeMissionId;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMissionId(m.id);
                  setFeedback({ status: isDone ? "correct" : "idle", msg: isDone ? "Sector already solved!" : "" });
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/20"
                    : isDone
                    ? "bg-slate-900/80 border-emerald-500/40"
                    : "bg-slate-900/40 border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-amber-400">Mission #{m.id}</span>
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
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Mission #{activeMission.id} • {activeMission.topic}
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">{activeMission.title}</h2>
            </div>
            {feedback.status === "correct" && (
              <div className="flex items-center gap-2 bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-xs font-bold">
                <FaCheckCircle className="w-4 h-4" /> Optimization Found (+100 PTS)
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-sm text-slate-300">
            <span className="text-xs font-mono text-amber-400 uppercase font-bold block mb-1">
              /// Scenario Briefing
            </span>
            <p>{activeMission.story}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-orange-950/30 border border-orange-800/40">
              <span className="font-mono text-orange-300 font-bold uppercase block mb-1">
                💻 Computing Field Application
              </span>
              <p className="text-slate-300 leading-relaxed">{activeMission.csApplication}</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40">
              <span className="font-mono text-amber-300 font-bold uppercase block mb-1">
                📐 Mathematical Law & Formula
              </span>
              <p className="font-mono text-amber-200 leading-relaxed">{activeMission.mathFormula}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-xs font-mono text-amber-300 mb-2">⚡ OBJECTIVE: {activeMission.instructions}</p>

            {activeMission.id === 1 && (
              <div className="space-y-4">
                {/* Embedded 3D Feasible Convex Hull & Optimal Vertex Visualizer */}
                <Concept3DVisualizer unitId={3} levelId={1} />

                <div className="max-w-md">
                  <label className="block text-xs font-mono text-slate-400 mb-1">Maximum Profit Z value:</label>
                  <input
                    type="number"
                    value={m1Ans}
                    onChange={(e) => setM1Ans(e.target.value)}
                    placeholder="Enter max profit Z"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {activeMission.id === 2 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Total Variables in Standard Form:</label>
                <input
                  type="number"
                  value={m2Ans}
                  onChange={(e) => setM2Ans(e.target.value)}
                  placeholder="Decision + Slack"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {activeMission.id === 3 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Number of Dual Variables:</label>
                <input
                  type="number"
                  value={m3Ans}
                  onChange={(e) => setM3Ans(e.target.value)}
                  placeholder="Dual variables count"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {activeMission.id === 4 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Units allocated to Cell(1, 1):</label>
                <input
                  type="number"
                  value={m4Ans}
                  onChange={(e) => setM4Ans(e.target.value)}
                  placeholder="min(50, 60)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {activeMission.id === 5 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Optimal Worker Index (1, 2, or 3):</label>
                <input
                  type="number"
                  value={m5Ans}
                  onChange={(e) => setM5Ans(e.target.value)}
                  placeholder="Index with 0 extra cost"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {activeMission.id === 6 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Does pure saddle point exist? (YES / NO):</label>
                <input
                  type="text"
                  value={m6Ans}
                  onChange={(e) => setM6Ans(e.target.value)}
                  placeholder="YES or NO"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Commit Optimization Plan
            </button>
          </form>

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
            <summary className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <FaLightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Need Assistance? Click for OR Hint</span>
            </summary>
            <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <p className="text-amber-300 font-bold mb-1">Mathematical Guide:</p>
              <p>{activeMission.hint}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}

