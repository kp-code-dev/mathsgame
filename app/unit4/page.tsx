"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { UnitNavigation } from "../components/UnitNavigation";
import { Concept3DVisualizer } from "../components/Concept3DVisualizer";
import {
  FaLayerGroup,
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

interface Unit4Mission {
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

const UNIT4_MISSIONS: Unit4Mission[] = [
  {
    id: 1,
    title: "Mission 1: Role-Based Access Control (RBAC) POSET",
    topic: "Relations and Ordering, Partially Ordered Sets (POSETs)",
    story: "An enterprise access security system uses a partially ordered set (POSET) on roles: {Guest ≤ User ≤ Admin ≤ SuperAdmin}. Check whether the relation is Reflexive, Antisymmetric, and Transitive.",
    csApplication: "Linux file permissions (chmod), AWS IAM security policy graphs, and object-oriented inheritance class hierarchies.",
    mathFormula: "POSET (P, ≤) requires: 1) Reflexivity: a ≤ a; 2) Antisymmetry: a ≤ b & b ≤ a ⇒ a = b; 3) Transitivity: a ≤ b & b ≤ c ⇒ a ≤ c.",
    instructions: "How many properties define a Partially Ordered Set (POSET)? Enter number (e.g. 3).",
    hint: "POSET has exactly 3 properties: Reflexive, Antisymmetric, Transitive.",
    solution: "3 properties.",
  },
  {
    id: 2,
    title: "Mission 2: Hasse Diagram Lattice Bounds Auditor",
    topic: "Lattices as POSETs (Join ∨, Meet ∧, GLB, LUB)",
    story: "Given the divisor lattice D_12 = {1, 2, 3, 4, 6, 12} ordered by divisibility. For elements a = 4 and b = 6: find their Meet (Greatest Lower Bound = GCD) and Join (Least Upper Bound = LCM).",
    csApplication: "Static code analysis (Abstract Interpretation, Data-Flow Lattice), type inference engines (TypeScript / Rust type bounds), and version control Git merge common ancestors.",
    mathFormula: "Meet (a ∧ b) = GLB = gcd(a, b)  |  Join (a ∨ b) = LUB = lcm(a, b)",
    instructions: "For numbers 4 and 6 in lattice D_12: 1) What is their Meet (GCD)? 2) What is their Join (LCM)?",
    hint: "gcd(4, 6) = 2. lcm(4, 6) = 12.",
    solution: "Meet = 2, Join = 12.",
  },
  {
    id: 3,
    title: "Mission 3: Distributive & Complemented Lattice Validator",
    topic: "Complete, Distributive, and Complemented Lattices",
    story: "In a Boolean Lattice B_n, every element x has a unique complement x' such that x ∨ x' = 1 and x ∧ x' = 0. In the power set lattice P({A, B}) with universal set {A, B}, what is the complement of subset {A}?",
    csApplication: "Circuit gate minimization, boolean sat solvers (Z3 theorem prover), SQL search filter indexing, and cryptographic bitmasking.",
    mathFormula: "x ∨ x' = 1 (Top)  and  x ∧ x' = 0 (Bottom)",
    instructions: "In P({A, B}), if x = {A}, what is its complement? Enter 'B' (representing subset {B}).",
    hint: "The complement of {A} in {A, B} is {B}.",
    solution: "Subset {B}.",
  },
  {
    id: 4,
    title: "Mission 4: Atoms & Anti-Atoms Quantum Register Map",
    topic: "Sub-Boolean Algebra, Atoms, Anti-Atoms, Join/Meet Irreducibles",
    story: "In a finite Boolean algebra with n=3 binary generators (power set of 3 elements), how many Atoms (minimal non-zero elements covering bottom element 0) exist?",
    csApplication: "Binary Decision Diagrams (BDD), memory address bit-line decoding, and quantum qubit basis state enumeration.",
    mathFormula: "In Boolean algebra B with 2^n elements, number of atoms = n. In P({1, 2, 3}), atoms are {1}, {2}, {3}.",
    instructions: "For 2^3 = 8 element Boolean algebra, how many atoms exist? Enter number.",
    hint: "There are 3 atoms: {1}, {2}, and {3}.",
    solution: "3 atoms.",
  },
  {
    id: 5,
    title: "Mission 5: Stone's Representation Theorem Decoder",
    topic: "Stone's Representation Theorem (Lattices isomorphic to Set Algebras)",
    story: "Stone's Representation Theorem states that every Boolean algebra is isomorphic to a field of sets (specifically, subsets of its Stone space of ultrafilters). If a finite Boolean algebra has 2^4 = 16 elements, what is the size of the set of its atoms that generates it?",
    csApplication: "Translating abstract hardware microcode instructions into physical set-theoretic transistor networks, formal logic verification.",
    mathFormula: "Every finite Boolean algebra B with 2^k elements is isomorphic to the power set P(Atoms(B)) where |Atoms| = k.",
    instructions: "If |B| = 16 = 2^4, what is the number of generating atoms k? Enter number.",
    hint: "Since 16 = 2^4, k = 4.",
    solution: "4 atoms.",
  },
];

export default function Unit4Page() {
  const [activeMissionId, setActiveMissionId] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Inputs
  const [m1Ans, setM1Ans] = useState("");
  const [m2Meet, setM2Meet] = useState("");
  const [m2Join, setM2Join] = useState("");
  const [m3Ans, setM3Ans] = useState("");
  const [m4Ans, setM4Ans] = useState("");
  const [m5Ans, setM5Ans] = useState("");

  const [feedback, setFeedback] = useState<{ status: "idle" | "correct" | "incorrect"; msg: string }>({
    status: "idle",
    msg: "",
  });

  const activeMission = UNIT4_MISSIONS.find((m) => m.id === activeMissionId) || UNIT4_MISSIONS[0];

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
      if (m1Ans.trim() === "3") {
        handleSuccess(100, "POSET AXIOMS CONFIRMED! Reflexive, Antisymmetric, Transitive ordering verified for RBAC role security.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK PROPERTIES: A POSET is defined by 3 properties." });
      }
    } else if (activeMissionId === 2) {
      if (m2Meet.trim() === "2" && m2Join.trim() === "12") {
        handleSuccess(100, "LATTICE BOUNDS CALCULATED! Meet (GCD) = 2, Join (LCM) = 12 in D_12 divisor lattice.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK GCD & LCM: Meet of 4 and 6 is gcd(4,6)=2; Join is lcm(4,6)=12." });
      }
    } else if (activeMissionId === 3) {
      if (m3Ans.trim().toUpperCase() === "B") {
        handleSuccess(100, "BOOLEAN COMPLEMENT FOUND! In P({A, B}), complement of {A} is {B} satisfying x ∨ x' = 1 and x ∧ x' = 0.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK COMPLEMENT: The complement of {A} in {A, B} is {B}. Enter 'B'." });
      }
    } else if (activeMissionId === 4) {
      if (m4Ans.trim() === "3") {
        handleSuccess(100, "BOOLEAN ATOMS MAPPED! 3 atoms {1}, {2}, {3} form the minimal non-zero basis covering bottom element 0.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK ATOMS: A 2^3 = 8 element Boolean algebra has 3 atoms." });
      }
    } else if (activeMissionId === 5) {
      if (m5Ans.trim() === "4") {
        handleSuccess(100, "STONE'S THEOREM VERIFIED! 16-element Boolean algebra is isomorphic to P(4), generated by 4 atoms.");
      } else {
        setFeedback({ status: "incorrect", msg: "CHECK EXPONENT: 16 = 2^4, so k = 4 generating atoms." });
      }
    }
  };

  const emailText = `Respected Ma'am,

I am submitting my Foundation of Mathematics Innovative Assignment for Unit 4: Lattices and Boolean Algebra.

Assignment Details:
• Name: [Your Name]
• Enrolment Number: [Your Enrolment Number]
• Programme: BCA / B.Tech / Integrated MCA
• Semester: Semester 1 / 2
• Division: [Your Division]
• Chosen Unit: Unit 4 — Lattices and Boolean Algebra
• Assignment Title: Logic Circuit Arena: Lattices & Boolean Algebra Simulator
• Working Project Link / Zip: [Attached / Hosted URL]

Assignment Objective:
To demonstrate how abstract order theory (Partially Ordered Sets, Lattices, Meet & Join operations, Complements, Atoms, and Stone's Representation Theorem) forms the absolute foundation of digital hardware logic gates, compiler data-flow lattices, static type checkers, and Role-Based Access Control (RBAC).

Summary of Unit 4 Topics Covered:
1. POSETs and Ordering: Reflexive, Antisymmetric, and Transitive security hierarchies in Linux permissions and AWS IAM.
2. Lattices as POSETs: Meet (GLB / GCD) and Join (LUB / LCM) bounds in static analysis data-flow lattices.
3. Distributive & Complemented Lattices: Complement laws (x ∨ x' = 1, x ∧ x' = 0) in digital Boolean circuit minimization.
4. Atoms and Anti-Atoms: Minimal non-zero basis generation in Binary Decision Diagrams (BDD).
5. Stone's Representation Theorem: Proving finite Boolean algebras of size 2^k are isomorphic to power set field of sets P(k).

Thank you for your guidance and support.

Sincerely,
[Your Name]
[Enrolment Number]`;

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-black">
      <header className="sticky top-0 z-40 bg-[#07172c]/85 backdrop-blur-md border-b border-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/30 p-1 flex items-center justify-center shadow-lg shadow-purple-500/10">
              <img src="/unit4-badge.svg" alt="Unit 4 Badge" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-base sm:text-lg text-white">
                  LOGIC CIRCUIT ARENA
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold">
                  Unit 4 Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Lattices & Boolean Algebra Hardware Simulation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Logic Clearance</div>
                <div className="text-sm font-black text-purple-400 font-mono">
                  {score} PTS ({completed.length}/5 Cleared)
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 p-1 flex items-center justify-center">
                <img src="/trophy-badge.svg" alt="Trophy" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <UnitNavigation currentUnit={4} />

        <div className="rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/20 p-6 md:p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold mb-3">
            <HiSparkles className="w-4 h-4 text-purple-400" />
            <span>Unit 4: Lattices, POSETs & Boolean Algebra</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Order Theory, Logic Gate Minimization & Stone&apos;s Theorem
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Discover how POSETs power role-based access control, lattices govern compiler data-flow optimization, and Boolean algebra creates physical computing circuits.
          </p>
        </div>

        {/* Level Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {UNIT4_MISSIONS.map((m) => {
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
                    ? "bg-purple-500/15 border-purple-400 ring-2 ring-purple-400/50 shadow-lg shadow-purple-500/20"
                    : isDone
                    ? "bg-slate-900/80 border-emerald-500/40"
                    : "bg-slate-900/40 border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-purple-400">Mission #{m.id}</span>
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
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                Mission #{activeMission.id} • {activeMission.topic}
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">{activeMission.title}</h2>
            </div>
            {feedback.status === "correct" && (
              <div className="flex items-center gap-2 bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-xs font-bold">
                <FaCheckCircle className="w-4 h-4" /> Logic Validated (+100 PTS)
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-sm text-slate-300">
            <span className="text-xs font-mono text-purple-400 uppercase font-bold block mb-1">
              /// Scenario Briefing
            </span>
            <p>{activeMission.story}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40">
              <span className="font-mono text-indigo-300 font-bold uppercase block mb-1">
                💻 Computing Field Application
              </span>
              <p className="text-slate-300 leading-relaxed">{activeMission.csApplication}</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40">
              <span className="font-mono text-purple-300 font-bold uppercase block mb-1">
                📐 Mathematical Law & Formula
              </span>
              <p className="font-mono text-purple-200 leading-relaxed">{activeMission.mathFormula}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-xs font-mono text-amber-300 mb-2">⚡ OBJECTIVE: {activeMission.instructions}</p>

            {activeMission.id === 1 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Number of POSET defining axioms:</label>
                <input
                  type="number"
                  value={m1Ans}
                  onChange={(e) => setM1Ans(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {activeMission.id === 2 && (
              <div className="space-y-4">
                {/* Embedded 3D Hasse Diagram Lattice GCD & LCM Visualizer */}
                <Concept3DVisualizer unitId={4} levelId={2} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Meet = GCD(4, 6):</label>
                    <input
                      type="number"
                      value={m2Meet}
                      onChange={(e) => setM2Meet(e.target.value)}
                      placeholder="GCD"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Join = LCM(4, 6):</label>
                    <input
                      type="number"
                      value={m2Join}
                      onChange={(e) => setM2Join(e.target.value)}
                      placeholder="LCM"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {activeMission.id === 3 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Complement of {`{A}`} in {`{A, B}`}:</label>
                <input
                  type="text"
                  value={m3Ans}
                  onChange={(e) => setM3Ans(e.target.value)}
                  placeholder="Enter 'B'"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {activeMission.id === 4 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Number of atoms in 2^3 Boolean algebra:</label>
                <input
                  type="number"
                  value={m4Ans}
                  onChange={(e) => setM4Ans(e.target.value)}
                  placeholder="Enter number of atoms"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {activeMission.id === 5 && (
              <div className="max-w-md">
                <label className="block text-xs font-mono text-slate-400 mb-1">Generating atoms k where 16 = 2^k:</label>
                <input
                  type="number"
                  value={m5Ans}
                  onChange={(e) => setM5Ans(e.target.value)}
                  placeholder="Enter k"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Execute Lattice Verification
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
            <summary className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
              <FaLightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Need Assistance? Click for Lattice & Boolean Hint</span>
            </summary>
            <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <p className="text-purple-300 font-bold mb-1">Axiom Guide:</p>
              <p>{activeMission.hint}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}

