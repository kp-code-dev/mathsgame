"use client";

import Link from "next/link";
import { FaLayerGroup, FaArrowRight, FaCalculator, FaChartLine, FaProjectDiagram, FaNetworkWired } from "react-icons/fa";

interface UnitNavProps {
  currentUnit: 1 | 2 | 3 | 4;
}

export function UnitNavigation({ currentUnit }: UnitNavProps) {
  const units = [
    {
      id: 1,
      href: "/",
      title: "Unit 1",
      subtitle: "Combinatorics & Counting",
      badgeSvg: "/unit1-badge.svg",
      tag: "Cyber Heist",
      accent: "cyan",
    },
    {
      id: 2,
      href: "/unit2",
      title: "Unit 2",
      subtitle: "Numerical Methods",
      badgeSvg: "/unit2-badge.svg",
      tag: "Convergence Lab",
      accent: "emerald",
    },
    {
      id: 3,
      href: "/unit3",
      title: "Unit 3",
      subtitle: "Operations Research & LP",
      badgeSvg: "/unit3-badge.svg",
      tag: "OptiSim Tycoon",
      accent: "amber",
    },
    {
      id: 4,
      href: "/unit4",
      title: "Unit 4",
      subtitle: "Lattices & Boolean Algebra",
      badgeSvg: "/unit4-badge.svg",
      tag: "Logic Circuit Arena",
      accent: "purple",
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-3 sm:p-4 mb-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-1 mb-2.5">
        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
          <FaLayerGroup className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Switch Assignment Unit Modules:</span>
        </span>
        <span className="self-start sm:self-auto text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-300 dark:border-cyan-800/60 font-semibold shadow-sm">
          FM All Units Lab
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {units.map((u) => {
          const isActive = u.id === currentUnit;
          return (
            <Link
              key={u.id}
              href={u.href}
              className={`p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? "bg-cyan-500/15 border-cyan-500 dark:border-cyan-400 text-slate-900 dark:text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-500/50"
                  : "bg-white/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-900/60 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <span className="text-xs font-mono font-bold flex items-center gap-2 truncate">
                  <div className="w-5 h-5 flex-shrink-0 rounded-md p-0.5 bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 flex items-center justify-center overflow-hidden">
                    <img src={u.badgeSvg} alt={u.title} className="w-full h-full object-contain" />
                  </div>
                  <span className="truncate text-slate-900 dark:text-white">{u.title}</span>
                </span>
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded flex-shrink-0 font-medium ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {u.tag}
                </span>
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">{u.subtitle}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

