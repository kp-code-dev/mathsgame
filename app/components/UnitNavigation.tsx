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
      icon: <FaNetworkWired className="w-4 h-4" />,
      tag: "Cyber Heist",
      accent: "cyan",
    },
    {
      id: 2,
      href: "/unit2",
      title: "Unit 2",
      subtitle: "Numerical Methods",
      icon: <FaChartLine className="w-4 h-4" />,
      tag: "Convergence Lab",
      accent: "emerald",
    },
    {
      id: 3,
      href: "/unit3",
      title: "Unit 3",
      subtitle: "Operations Research & LP",
      icon: <FaProjectDiagram className="w-4 h-4" />,
      tag: "OptiSim Tycoon",
      accent: "amber",
    },
    {
      id: 4,
      href: "/unit4",
      title: "Unit 4",
      subtitle: "Lattices & Boolean Algebra",
      icon: <FaLayerGroup className="w-4 h-4" />,
      tag: "Logic Circuit Arena",
      accent: "purple",
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 mb-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between px-2 mb-2">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
          <FaLayerGroup className="w-3.5 h-3.5 text-cyan-400" />
          <span>Switch Assignment Unit Modules:</span>
        </span>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
          FM All Units Lab
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {units.map((u) => {
          const isActive = u.id === currentUnit;
          return (
            <Link
              key={u.id}
              href={u.href}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-slate-800 border-cyan-400 text-white shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/50"
                  : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold flex items-center gap-1.5">
                  <span className={isActive ? "text-cyan-400" : "text-slate-400"}>{u.icon}</span>
                  <span>{u.title}</span>
                </span>
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                    isActive ? "bg-cyan-500/20 text-cyan-300 font-bold" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {u.tag}
                </span>
              </div>
              <div className="text-xs font-medium text-slate-300 truncate">{u.subtitle}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

