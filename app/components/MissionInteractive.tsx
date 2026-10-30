"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { LevelData } from "../data/levels";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
  FaTerminal,
  FaLaptopCode,
  FaSquareRootAlt,
  FaPlay,
  FaRedo,
  FaLock,
  FaUnlock,
  FaNetworkWired,
  FaKey,
  FaServer,
  FaMicrochip,
  FaDatabase,
  FaCube,
  FaProjectDiagram,
  FaChartLine,
  FaAtom,
} from "react-icons/fa";
import { BiNetworkChart, BiChip } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import { Pigeonhole3DSimulator } from "./Pigeonhole3DSimulator";

interface MissionProps {
  level: LevelData;
  onSuccess: (score: number) => void;
  isUnlocked: boolean;
  isCompleted: boolean;
  onNextMission?: () => void;
}

export function MissionInteractive({
  level,
  onSuccess,
  isCompleted,
  onNextMission,
}: MissionProps) {
  const [feedback, setFeedback] = useState<{
    status: "idle" | "correct" | "incorrect";
    msg: string;
  }>({
    status: isCompleted ? "correct" : "idle",
    msg: isCompleted ? "Mission cleared! Mainframe security sector decrypted." : "",
  });

  const triggerWin = (msg: string) => {
    setFeedback({ status: "correct", msg });
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#06b6d4", "#3b82f6", "#10b981", "#f59e0b"],
    });
    onSuccess(100);
  };

  // State for Level 1: Addition & Multiplication
  const [sumAns, setSumAns] = useState("");
  const [prodAns, setProdAns] = useState("");
  const [totalAns, setTotalAns] = useState("");

  // State for Level 2: Permutations
  const [permAnsA, setPermAnsA] = useState("");
  const [permAnsB, setPermAnsB] = useState("");

  // State for Level 3: Combinations
  const [combSelected, setCombSelected] = useState<number[]>([1, 2, 4]);
  const [combFormulaAns, setCombFormulaAns] = useState("");

  // State for Level 4: Binomial Theorem
  const [binomCoeff, setBinomCoeff] = useState("");
  const [rowSum, setRowSum] = useState("");

  // State for Level 5: Pigeonhole Principle
  const [phpBasic, setPhpBasic] = useState("");
  const [phpGen, setPhpGen] = useState("");
  const [phpSimKeys, setPhpSimKeys] = useState<number>(11);

  // State for Level 6: Principle of Inclusion-Exclusion
  const [pieAns, setPieAns] = useState("");

  // State for Level 7: Derangements
  const [d4Ans, setD4Ans] = useState("");
  const [d5Ans, setD5Ans] = useState("");

  // State for Level 8: Multisets & Stars and Bars
  const [starsBarsAns, setStarsBarsAns] = useState("");

  // State for Level 9: Partitions & Compositions
  const [compTotal, setCompTotal] = useState("");
  const [compParts, setCompParts] = useState("");
  const [partAns, setPartAns] = useState("");

  // State for Level 10: Recurrences
  const [root1, setRoot1] = useState("");
  const [root2, setRoot2] = useState("");
  const [termA3, setTermA3] = useState("");

  // State for Level 11: Generating Functions
  const [gfCoeff, setGfCoeff] = useState("");

  // Handler for Level 1
  const handleLevel1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (sumAns.trim() === "5" && prodAns.trim() === "20" && totalAns.trim() === "25") {
      triggerWin("ACCESS GRANTED! Stage 1 (3+2=5) + Stage 2 (4×5=20) = 25 total firewall bypass routes validated.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "ACCESS DENIED: Stage 1 is mutually exclusive paths (3 + 2 = 5). Stage 2 is sequential (4 × 5 = 20). Total = 5 + 20 = 25.",
      });
    }
  };

  // Handler for Level 2
  const handleLevel2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (permAnsA.trim() === "360" && permAnsB.trim() === "180") {
      triggerWin("QUANTUM KEY DECRYPTED! P(6,4) = 360 and 'ACCESS' anagrams = 6!/(2!·2!) = 180 unique permutations.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "CHECKSUM MISMATCH: P(6,4) = 6×5×4×3 = 360. For 'ACCESS' (6 letters with two C's and two S's), 720 / 4 = 180.",
      });
    }
  };

  // Handler for Level 3
  const handleLevel3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (combFormulaAns.trim() === "56") {
      triggerWin("KUBERNETES QUORUM ESTABLISHED! C(8,5) = C(8,3) = 56 topologies. Distributed consensus validated.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "QUORUM FAILED: C(8,5) = (8×7×6)/(3×2×1) = 56 combinations.",
      });
    }
  };

  // Handler for Level 4
  const handleLevel4 = (e: React.FormEvent) => {
    e.preventDefault();
    if (binomCoeff.trim() === "15" && rowSum.trim() === "64") {
      triggerWin("NEURAL BIT-FLIP MATRIX DECODED! Coefficient C(6,2) = 15, and row sum = 2^6 = 64 quantum states.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "INCORRECT EXPANSION: In (x+y)^6, term x^4 y^2 has coefficient C(6,2) = 15. Total bit states = 2^6 = 64.",
      });
    }
  };

  // Handler for Level 5
  const handleLevel5 = (e: React.FormEvent) => {
    e.preventDefault();
    if (phpBasic.trim() === "11" && phpGen.trim() === "31") {
      triggerWin("PIGEONHOLE OVERFLOW VERIFIED! 11 keys guarantee ≥2 in a bucket. 31 keys guarantee ≥4 in a bucket.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "COLLISION CALCULATION ERROR: Basic: 10 + 1 = 11 keys. Generalized: 10 × (4 - 1) + 1 = 31 keys.",
      });
    }
  };

  // Handler for Level 6
  const handleLevel6 = (e: React.FormEvent) => {
    e.preventDefault();
    if (pieAns.trim() === "88") {
      triggerWin("SUBNET DISINFECTED! |A ∪ B ∪ C| = 120 - 37 + 5 = 88 unique infected hosts successfully isolated.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "FILTER ERROR: (50+40+30) - (15+10+12) + 5 = 120 - 37 + 5 = 88.",
      });
    }
  };

  // Handler for Level 7
  const handleLevel7 = (e: React.FormEvent) => {
    e.preventDefault();
    if (d4Ans.trim() === "9" && d5Ans.trim() === "44") {
      triggerWin("ZERO-LEAK KEY ROTATION ACTIVE! !4 = 9 and !5 = 44 derangements. Cryptographic entropy maximized.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "KEY COLLISION DETECTED: !4 = 9, and !5 = 4 × (!4 + !3) = 4 × (9 + 2) = 44.",
      });
    }
  };

  // Handler for Level 8
  const handleLevel8 = (e: React.FormEvent) => {
    e.preventDefault();
    if (starsBarsAns.trim() === "286") {
      triggerWin("VIRTUAL CPU PROVISIONED! C(10 + 4 - 1, 4 - 1) = C(13, 3) = 286 multiset allocations mapped.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "CGROUP ALLOCATION FAILED: Stars = 10, Bars = 3. C(13, 3) = (13×12×11)/6 = 286.",
      });
    }
  };

  // Handler for Level 9
  const handleLevel9 = (e: React.FormEvent) => {
    e.preventDefault();
    if (compTotal.trim() === "16" && compParts.trim() === "6" && partAns.trim() === "7") {
      triggerWin("ROUTER MTU OPTIMIZED! 2^(5-1)=16 compositions, C(4,2)=6 into 3 parts, and p(5)=7 unordered partitions.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "FRAGMENTATION FAULT: Compositions = 2^(5-1) = 16. In 3 parts = C(4,2) = 6. Unordered partitions p(5) = 7.",
      });
    }
  };

  // Handler for Level 10
  const handleLevel10 = (e: React.FormEvent) => {
    e.preventDefault();
    const rMatch =
      (root1.trim() === "2" && root2.trim() === "3") ||
      (root1.trim() === "3" && root2.trim() === "2");
    if (rMatch && termA3.trim() === "46") {
      triggerWin("RECURSIVE RUNTIME RESOLVED! Characteristic roots {2, 3}, a_n = 2(3^n) - 2^n, so a_3 = 46 ops.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "COMPLEXITY MISMATCH: Characteristic eq: r^2 - 5r + 6 = 0 ⇒ roots 2 and 3. a_n = 2(3^n) - 2^n. For n=3, 2(27) - 8 = 46.",
      });
    }
  };

  // Handler for Level 11
  const handleLevel11 = (e: React.FormEvent) => {
    e.preventDefault();
    if (gfCoeff.trim() === "28") {
      triggerWin("GENERATING FUNCTION CONVOLUTION CRACKED! [x^6] 1/(1-x)^3 = C(6+3-1, 6) = C(8,2) = 28 combinations.");
    } else {
      setFeedback({
        status: "incorrect",
        msg: "SERIES ERROR: By negative binomial expansion, coefficient is C(8, 6) = C(8, 2) = (8×7)/2 = 28.",
      });
    }
  };

  // Dynamic icon selector based on level topic
  const getTopicIcon = () => {
    switch (level.id) {
      case 1: return <FaNetworkWired className="w-6 h-6 text-cyan-400" />;
      case 2: return <FaKey className="w-6 h-6 text-amber-400" />;
      case 3: return <BiNetworkChart className="w-6 h-6 text-indigo-400" />;
      case 4: return <FaAtom className="w-6 h-6 text-emerald-400" />;
      case 5: return <FaDatabase className="w-6 h-6 text-rose-400" />;
      case 6: return <FaProjectDiagram className="w-6 h-6 text-teal-400" />;
      case 7: return <FaLock className="w-6 h-6 text-pink-400" />;
      case 8: return <FaServer className="w-6 h-6 text-violet-400" />;
      case 9: return <FaCube className="w-6 h-6 text-orange-400" />;
      case 10: return <FaChartLine className="w-6 h-6 text-yellow-400" />;
      case 11: return <BiChip className="w-6 h-6 text-cyan-400" />;
      default: return <FaMicrochip className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -right-24 -top-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
            {getTopicIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
                Mission #{level.id} / 11
              </span>
              <span className="text-xs font-mono text-slate-400">Unit 1: Combinatorics</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {level.title}
            </h2>
            <div className="mt-1 text-sm text-cyan-300 font-medium">
              Topic: <span className="text-white font-semibold">{level.topic}</span>
            </div>
          </div>
        </div>

        {feedback.status === "correct" && (
          <div className="flex items-center gap-2.5 bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold shadow-lg shadow-emerald-900/20 animate-bounce">
            <FaCheckCircle className="w-4 h-4 shrink-0" />
            <span>Sector Breached (+100 PTS)</span>
          </div>
        )}
      </div>

      {/* Cyber Operational Briefing */}
      <div className="mb-6 p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 text-sm leading-relaxed text-slate-300 relative z-10">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <FaTerminal className="w-3.5 h-3.5" />
          <span>Operational Threat Scenario</span>
        </div>
        <p className="font-sans text-slate-200">{level.missionStory}</p>
      </div>

      {/* Double Insight Cards: CS Application & Mathematical Formula */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 hover:border-indigo-600/50 transition-all">
          <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase tracking-wide mb-1.5">
            <FaLaptopCode className="w-4 h-4" />
            <span>Practical Computer Science Application</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{level.csApplication}</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 hover:border-emerald-600/50 transition-all">
          <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wide mb-1.5">
            <FaSquareRootAlt className="w-4 h-4" />
            <span>Governing Mathematical Law & Formula</span>
          </div>
          <p className="text-xs font-mono text-emerald-200 leading-relaxed">{level.mathFormula}</p>
        </div>
      </div>

      {/* Interactive Cyber Terminal Form */}
      <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-6 mb-6 shadow-inner relative z-10">
        <div className="text-amber-300 font-mono text-xs mb-4 flex items-center gap-2">
          <HiSparkles className="w-4 h-4 text-amber-400" />
          <span className="font-bold uppercase tracking-wide">Tactical Objective:</span>
          <span className="text-slate-300">{level.instructions}</span>
        </div>

        {/* Level 1: Rule of Sum & Product */}
        {level.interactiveType === "rule-of-sum-prod" && (
          <form onSubmit={handleLevel1} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Stage 1: 3 Fiber OR 2 Satellite:
                </label>
                <input
                  type="number"
                  value={sumAns}
                  onChange={(e) => setSumAns(e.target.value)}
                  placeholder="Sum Rule: 3 + 2"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Stage 2: 4 Microservices × 5 Proxies:
                </label>
                <input
                  type="number"
                  value={prodAns}
                  onChange={(e) => setProdAns(e.target.value)}
                  placeholder="Product Rule: 4 × 5"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Overall Bypass Routes (Stage 1 OR Stage 2):
                </label>
                <input
                  type="number"
                  value={totalAns}
                  onChange={(e) => setTotalAns(e.target.value)}
                  placeholder="Total: 5 + 20"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Validate Security Matrix
            </button>
          </form>
        )}

        {/* Level 2: Permutations */}
        {level.interactiveType === "permutations" && (
          <form onSubmit={handleLevel2} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  4-digit PIN from 6 unique glyphs: P(6, 4)
                </label>
                <input
                  type="number"
                  value={permAnsA}
                  onChange={(e) => setPermAnsA(e.target.value)}
                  placeholder="6! / (6 - 4)!"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Unique anagrams of string &quot;ACCESS&quot; (6 letters, 2 &apos;C&apos;s, 2 &apos;S&apos;s):
                </label>
                <input
                  type="number"
                  value={permAnsB}
                  onChange={(e) => setPermAnsB(e.target.value)}
                  placeholder="6! / (2! · 2!)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Test Keyspace Entropy
            </button>
          </form>
        )}

        {/* Level 3: Combinations */}
        {level.interactiveType === "combinations" && (
          <form onSubmit={handleLevel3} className="space-y-5">
            <div>
              <p className="text-xs text-slate-400 mb-2 font-mono">
                Interactive Kubernetes Cluster Node Selector (Pick any 5 nodes to test quorum formation):
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((node) => {
                  const isSelected = combSelected.includes(node);
                  return (
                    <button
                      key={node}
                      type="button"
                      onClick={() => {
                        if (isSelected) setCombSelected(combSelected.filter((n) => n !== node));
                        else if (combSelected.length < 5) setCombSelected([...combSelected, node]);
                      }}
                      className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 scale-105"
                          : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                      }`}
                    >
                      <FaServer className="w-3 h-3" /> Node-{node} {isSelected && "✓"}
                    </button>
                  );
                })}
                <span className="text-xs font-mono text-slate-400 flex items-center ml-2">
                  Selected: {combSelected.length} / 5
                </span>
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 max-w-md">
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Total distinct 5-node cluster configurations: C(8, 5) = 8! / (5! · 3!)
              </label>
              <input
                type="number"
                value={combFormulaAns}
                onChange={(e) => setCombFormulaAns(e.target.value)}
                placeholder="Enter C(8, 5)"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Commit Quorum Topology
            </button>
          </form>
        )}

        {/* Level 4: Binomial Theorem */}
        {level.interactiveType === "binomial" && (
          <form onSubmit={handleLevel4} className="space-y-5">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono text-xs text-cyan-300 space-y-1">
              <div className="text-slate-500">Row 0: [ 1 ]</div>
              <div className="text-slate-500">Row 1: [ 1, 1 ]</div>
              <div className="text-slate-500">Row 2: [ 1, 2, 1 ]</div>
              <div className="text-slate-500">Row 3: [ 1, 3, 3, 1 ]</div>
              <div className="text-slate-400">Row 4: [ 1, 4, 6, 4, 1 ]</div>
              <div className="text-slate-400">Row 5: [ 1, 5, 10, 10, 5, 1 ]</div>
              <div className="text-amber-400 font-bold text-sm bg-amber-500/10 py-1 rounded">
                Row 6 (Quantum Reg): [ 1, 6, 15, 20, 15, 6, 1 ]
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Coefficient of x^4 y^2 in (x + y)^6 [C(6, 2)]:
                </label>
                <input
                  type="number"
                  value={binomCoeff}
                  onChange={(e) => setBinomCoeff(e.target.value)}
                  placeholder="Enter C(6, 2)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Total sum of all row coefficients [2^6]:
                </label>
                <input
                  type="number"
                  value={rowSum}
                  onChange={(e) => setRowSum(e.target.value)}
                  placeholder="Sum = 2^6"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Evaluate Error Probability
            </button>
          </form>
        )}

        {/* Level 5: Pigeonhole Principle */}
        {level.interactiveType === "pigeonhole" && (
          <form onSubmit={handleLevel5} className="space-y-5">
            {/* Embedded 3D Pigeonhole & Hash Collision Simulator */}
            <Pigeonhole3DSimulator
              keysCount={phpSimKeys}
              onAddKey={() => setPhpSimKeys((prev) => prev + 1)}
              onReset={() => setPhpSimKeys(0)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  1) Min keys to guarantee at least one bucket contains ≥ 2 keys:
                </label>
                <input
                  type="number"
                  value={phpBasic}
                  onChange={(e) => setPhpBasic(e.target.value)}
                  placeholder="Basic PHP (10 + 1)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  2) Min keys to guarantee at least one bucket contains ≥ 4 keys:
                </label>
                <input
                  type="number"
                  value={phpGen}
                  onChange={(e) => setPhpGen(e.target.value)}
                  placeholder="Generalized: 10 × 3 + 1"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Verify Inevitable Hash Collision
            </button>
          </form>
        )}

        {/* Level 6: Principle of Inclusion-Exclusion */}
        {level.interactiveType === "pie" && (
          <form onSubmit={handleLevel6} className="space-y-5">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1.5">
              <div>• Individual infected botnets: |A| = 50, |B| = 40, |C| = 30</div>
              <div>• Pairwise intersections: |A ∩ B| = 15, |B ∩ C| = 10, |A ∩ C| = 12</div>
              <div>• Triple intersection: |A ∩ B ∩ C| = 5</div>
              <div className="text-cyan-400 font-bold pt-1">
                Formula: |A ∪ B ∪ C| = (∑ Single) - (∑ Pairwise) + (Triple)
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 max-w-md">
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Total Unique Compromised Hosts |A ∪ B ∪ C|:
              </label>
              <input
                type="number"
                value={pieAns}
                onChange={(e) => setPieAns(e.target.value)}
                placeholder="Enter union size"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Disinfect Enterprise Subnet
            </button>
          </form>
        )}

        {/* Level 7: Derangements */}
        {level.interactiveType === "derangements" && (
          <form onSubmit={handleLevel7} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Derangements for n = 4 keys: !4
                </label>
                <input
                  type="number"
                  value={d4Ans}
                  onChange={(e) => setD4Ans(e.target.value)}
                  placeholder="!4 = 9"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Derangements for n = 5 keys: !5
                </label>
                <input
                  type="number"
                  value={d5Ans}
                  onChange={(e) => setD5Ans(e.target.value)}
                  placeholder="!5 = (5-1)(!4 + !3)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Rotate Keys With Zero Fixed-Points
            </button>
          </form>
        )}

        {/* Level 8: Multisets */}
        {level.interactiveType === "multisets" && (
          <form onSubmit={handleLevel8} className="space-y-5">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <p>Visualizing Stars & Bars for n = 10 CPU credits into k = 4 worker pods:</p>
              <p className="text-amber-400 mt-1 font-bold">
                ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐ (10 Stars, 3 Bars = 13 slots)
              </p>
              <p className="text-cyan-300 mt-1">Formula: C(n + k - 1, k - 1) = C(10 + 3, 3) = C(13, 3)</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 max-w-md">
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Total Valid Resource Allocations: C(13, 3)
              </label>
              <input
                type="number"
                value={starsBarsAns}
                onChange={(e) => setStarsBarsAns(e.target.value)}
                placeholder="Enter C(13, 3)"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Commit Container Allocations
            </button>
          </form>
        )}

        {/* Level 9: Partitions & Compositions */}
        {level.interactiveType === "partitions" && (
          <form onSubmit={handleLevel9} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  1) Ordered Compositions of 5 [2^(5-1)]:
                </label>
                <input
                  type="number"
                  value={compTotal}
                  onChange={(e) => setCompTotal(e.target.value)}
                  placeholder="2^4"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  2) Compositions into 3 parts [C(4, 2)]:
                </label>
                <input
                  type="number"
                  value={compParts}
                  onChange={(e) => setCompParts(e.target.value)}
                  placeholder="C(4, 2)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  3) Unordered Partitions p(5):
                </label>
                <input
                  type="number"
                  value={partAns}
                  onChange={(e) => setPartAns(e.target.value)}
                  placeholder="p(5) count"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Optimize MTU Fragmentation
            </button>
          </form>
        )}

        {/* Level 10: Recurrences */}
        {level.interactiveType === "recurrence" && (
          <form onSubmit={handleLevel10} className="space-y-5">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <p>Second-order linear recurrence: a_n = 5 a_(n-1) - 6 a_(n-2)</p>
              <p>Characteristic eq: r^2 - 5r + 6 = 0 with a_0 = 1, a_1 = 4</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">Characteristic Root r_1:</label>
                <input
                  type="number"
                  value={root1}
                  onChange={(e) => setRoot1(e.target.value)}
                  placeholder="Root 1"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">Characteristic Root r_2:</label>
                <input
                  type="number"
                  value={root2}
                  onChange={(e) => setRoot2(e.target.value)}
                  placeholder="Root 2"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">Value of Term a_3:</label>
                <input
                  type="number"
                  value={termA3}
                  onChange={(e) => setTermA3(e.target.value)}
                  placeholder="a_3"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Compute Algorithmic Bounds
            </button>
          </form>
        )}

        {/* Level 11: Generating Functions */}
        {level.interactiveType === "generating-functions" && (
          <form onSubmit={handleLevel11} className="space-y-5">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <p>Generating function: G(x) = 1 / (1 - x)^3 = ∑ [n=0 to ∞] C(n + 2, n) x^n</p>
              <p className="text-cyan-400 mt-1">Target: Extract coefficient of x^6: C(6 + 3 - 1, 6) = C(8, 2)</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 max-w-md">
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Value of Coefficient [x^6] G(x):
              </label>
              <input
                type="number"
                value={gfCoeff}
                onChange={(e) => setGfCoeff(e.target.value)}
                placeholder="C(8, 2)"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="w-3 h-3" /> Query Power Series Oracle
            </button>
          </form>
        )}
      </div>

      {/* Visual Feedback Banner */}
      {feedback.status !== "idle" && (
        <div
          className={`p-5 rounded-2xl border text-sm flex items-start gap-3.5 transition-all relative z-10 ${
            feedback.status === "correct"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/60 border-rose-500/40 text-rose-200"
          }`}
        >
          {feedback.status === "correct" ? (
            <FaCheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <FaTimesCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-bold">{feedback.msg}</p>
            {feedback.status === "correct" && (
              <div className="mt-2 text-xs text-slate-300">
                <p>{level.solutionExplanation}</p>
                {onNextMission && level.id < 11 && (
                  <button
                    onClick={onNextMission}
                    className="mt-3 px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs font-mono flex items-center gap-2 hover:bg-emerald-400 transition-all cursor-pointer"
                  >
                    <span>Proceed to Mission #{level.id + 1}</span>
                    <FaPlay className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tactical Hint Dropdown */}
      <details className="mt-5 text-xs font-mono text-slate-400 cursor-pointer relative z-10">
        <summary className="hover:text-cyan-400 transition-colors flex items-center gap-2">
          <FaLightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Click to access mathematical cipher hint</span>
        </summary>
        <div className="mt-2.5 p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
          <p className="text-cyan-300 font-semibold mb-1">Mathematical Formula Hint:</p>
          <p>{level.hint}</p>
        </div>
      </details>
    </div>
  );
}
