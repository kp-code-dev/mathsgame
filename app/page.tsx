"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { LEVELS } from "./data/levels";
import { MissionInteractive } from "./components/MissionInteractive";
import { CombinatoricsSandbox } from "./components/CombinatoricsSandbox";
import { UnitNavigation } from "./components/UnitNavigation";
import {
  FaShieldAlt,
  FaTrophy,
  FaLock,
  FaUnlock,
  FaCheckCircle,
  FaBook,
  FaTerminal,
  FaChevronRight,
  FaGamepad,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

export default function Home() {
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  const activeLevel = LEVELS.find((l) => l.id === activeLevelId) || LEVELS[0];

  const handleLevelSuccess = (earnedPoints: number) => {
    if (!completedLevels.includes(activeLevelId)) {
      const nextCompleted = [...completedLevels, activeLevelId];
      setCompletedLevels(nextCompleted);
      setScore((prev) => prev + earnedPoints);

      if (nextCompleted.length === 11) {
        // Grand finale celebration
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.5 },
          colors: ["#06b6d4", "#3b82f6", "#10b981", "#f59e0b", "#ec4899"],
        });
      }
    }
  };

  const handleNextMission = () => {
    if (activeLevelId < 11) {
      setActiveLevelId(activeLevelId + 1);
    }
  };

  const isLevelUnlocked = (id: number) => {
    if (id === 1) return true;
    return completedLevels.includes(id - 1);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Cyber Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <img src="/unit1-badge.svg" alt="Unit 1 Badge" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-base sm:text-lg text-white">
                  COMBINATORICS QUEST
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                  Cyber Heist
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Foundation of Mathematics (FM) • Unit 1 Interactive Game
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Score & Progress Badge */}
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Mainframe Status
                </div>
                <div className="text-sm font-black text-cyan-400 font-mono">
                  {score} PTS ({completedLevels.length}/11 Cleared)
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FaTrophy className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Unit Switcher */}
        <UnitNavigation currentUnit={1} />

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/20 p-6 md:p-8 shadow-2xl">
          <div className="max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-3">
              <HiSparkles className="w-4 h-4 text-cyan-400" />
              <span>Unit 1: Introduction to Combinatorics and Its Applications</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Breach the Mainframe Using Discrete Mathematics
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Dr. CyberNull has protected the mainframe across 11 layered cryptographic vaults. Each sector requires you to apply combinatorial principles to resolve real-world computer science problems: firewall routing, password entropy, distributed quorums, hash collisions, subnet filtering, zero-leak key rotations, CPU cgroup allocation, MTU packet fragmentation, algorithm complexity runtimes, and power series generating functions.
            </p>
          </div>
        </div>

        {/* Mission Control Strip */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
              <FaGamepad className="w-4 h-4 text-cyan-400" />
              <span>Select Security Mission (1 through 11):</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              {completedLevels.length === 11
                ? "🏆 ALL MISSIONS BREACHED!"
                : `PROGRESS: ${Math.round((completedLevels.length / 11) * 100)}%`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
            {LEVELS.map((lvl) => {
              const isUnlocked = isLevelUnlocked(lvl.id);
              const isDone = completedLevels.includes(lvl.id);
              const isActive = lvl.id === activeLevelId;

              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevelId(lvl.id)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer relative ${
                    isActive
                      ? "bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20 scale-[1.02]"
                      : isDone
                      ? "bg-slate-900/80 border-emerald-500/40 hover:border-emerald-400 hover:bg-slate-900"
                      : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-black text-cyan-400">
                      #{lvl.id}
                    </span>
                    {isDone ? (
                      <FaCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isUnlocked ? (
                      <FaUnlock className="w-3 h-3 text-slate-400" />
                    ) : (
                      <FaLock className="w-3 h-3 text-slate-600" />
                    )}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-200 line-clamp-2 leading-tight">
                    {lvl.topic}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Mission Interactive Terminal */}
        <MissionInteractive
          key={activeLevel.id}
          level={activeLevel}
          onSuccess={handleLevelSuccess}
          isUnlocked={isLevelUnlocked(activeLevel.id)}
          isCompleted={completedLevels.includes(activeLevel.id)}
          onNextMission={handleNextMission}
        />

        {/* Live Combinatorics Lab & Growth Sandbox */}
        <CombinatoricsSandbox />

        {/* Educational Takeaway Panel */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <FaTerminal className="w-4 h-4 text-cyan-400" />
            <span>Why Combinatorics is Essential for Modern Computing</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Combinatorics provides the mathematical bounds for software engineering and computer science: from assessing brute-force password resistance, hash collision probabilities, and consensus quorum sets to evaluating recursive algorithm complexity ($O(n \log n)$) and continuous packet buffer fragmentation.
          </p>
        </div>
      </main>

      {/* Cyber Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-[#030712] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Foundation of Mathematics (FM) — Unit 1 Assignment:{" "}
            <strong className="text-slate-300">Combinatorics Quest</strong>
          </p>
          <p className="font-mono text-cyan-400/80">
            Silver Oak University • Faculty: Meghana Trivedi & Keyuri Shah
          </p>
        </div>
      </footer>
    </div>
  );
}
