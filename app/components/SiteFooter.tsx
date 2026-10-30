"use client";

import React from "react";
import Link from "next/link";
import { FaHeart, FaGithub, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export function SiteFooter() {
  return (
    <footer className="glass-panel border-t border-slate-300 dark:border-slate-800/80 py-8 px-4 text-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-3.5">
        {/* Core title badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-mono text-[11px] font-bold">
          <HiSparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span>Foundation of Mathematics (FM) • Interactive Gamified Learning</span>
        </div>

        {/* Centered main text */}
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl text-xs sm:text-sm font-medium leading-relaxed">
          An interactive, hands-on computer science mathematics experience covering{" "}
          <span className="font-semibold text-slate-900 dark:text-white">Combinatorics</span>,{" "}
          <span className="font-semibold text-slate-900 dark:text-white">Numerical Methods</span>,{" "}
          <span className="font-semibold text-slate-900 dark:text-white">Operations Research</span>, and{" "}
          <span className="font-semibold text-slate-900 dark:text-white">Boolean Lattices</span>.
        </p>

        {/* Quick Module Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
          <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Unit 1: Combinatorics Quest
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <Link href="/unit2" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Unit 2: Numerical Convergence Lab
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <Link href="/unit3" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Unit 3: OptiSim Tycoon
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <Link href="/unit4" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Unit 4: Logic Circuit Arena
          </Link>
        </div>

        {/* Copyright / signature */}
        <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 font-sans">
          <span>Crafted with</span>
          <FaHeart className="w-3 h-3 text-rose-500 animate-pulse" />
          <span>for discrete & continuous mathematics education</span>
          <span className="mx-1.5 text-slate-300 dark:text-slate-700">•</span>
          <span className="font-mono text-cyan-600 dark:text-cyan-400">mathsgame</span>
        </div>
      </div>
    </footer>
  );
}

