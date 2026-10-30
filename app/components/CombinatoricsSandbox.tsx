"use client";

import React, { useState } from "react";
import {
  FaSlidersH,
  FaCalculator,
  FaInfoCircle,
  FaHashtag,
  FaSortNumericDown,
  FaRandom,
  FaCubes,
} from "react-icons/fa";

export function CombinatoricsSandbox() {
  const [nVal, setNVal] = useState<number>(6);
  const [rVal, setRVal] = useState<number>(2);

  const factorial = (n: number): number => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const perm = (n: number, r: number) => {
    if (r > n || r < 0) return 0;
    return factorial(n) / factorial(n - r);
  };

  const comb = (n: number, r: number) => {
    if (r > n || r < 0) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const derange = (n: number): number => {
    if (n === 0) return 1;
    if (n === 1) return 0;
    let a = 1, b = 0;
    for (let i = 2; i <= n; i++) {
      const cur = (i - 1) * (a + b);
      a = b;
      b = cur;
    }
    return b;
  };

  const multiset = (n: number, k: number) => {
    if (k <= 0) return 0;
    return comb(n + k - 1, k - 1);
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
              Interactive Computing Lab
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <FaCalculator className="w-5 h-5 text-cyan-400" />
            <span>Combinatorics Value Lab & Growth Explorer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamically adjust input parameters (n, r) to observe factorial and combinatorial growth rates in real time.
          </p>
        </div>
      </div>

      {/* Sliders Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2">
            <span className="flex items-center gap-2">
              <FaSlidersH className="w-3.5 h-3.5" /> Parameter n (Total Elements):
            </span>
            <span className="font-bold text-white text-sm bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
              {nVal}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            value={nVal}
            onChange={(e) => setNVal(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2">
            <span className="flex items-center gap-2">
              <FaSlidersH className="w-3.5 h-3.5" /> Parameter r / k (Subset Size / Bins):
            </span>
            <span className="font-bold text-white text-sm bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
              {Math.min(rVal, nVal)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={nVal}
            value={Math.min(rVal, nVal)}
            onChange={(e) => setRVal(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 text-center hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <FaHashtag className="w-3 h-3 text-cyan-400" />
            <span>Factorial n!</span>
          </div>
          <p className="text-xl md:text-2xl font-black text-cyan-400 mt-1">{factorial(nVal).toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-1">Brute-force states</p>
        </div>

        <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 text-center hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <FaSortNumericDown className="w-3 h-3 text-emerald-400" />
            <span>P({nVal}, {Math.min(rVal, nVal)})</span>
          </div>
          <p className="text-xl md:text-2xl font-black text-emerald-400 mt-1">{perm(nVal, Math.min(rVal, nVal)).toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-1">Ordered sequences</p>
        </div>

        <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 text-center hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <FaCubes className="w-3 h-3 text-indigo-400" />
            <span>C({nVal}, {Math.min(rVal, nVal)})</span>
          </div>
          <p className="text-xl md:text-2xl font-black text-indigo-400 mt-1">{comb(nVal, Math.min(rVal, nVal)).toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-1">Unordered subsets</p>
        </div>

        <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 text-center hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <FaRandom className="w-3 h-3 text-amber-400" />
            <span>Derangements !{nVal}</span>
          </div>
          <p className="text-xl md:text-2xl font-black text-amber-400 mt-1">{derange(nVal).toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-1">Zero fixed points</p>
        </div>

        <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 text-center hover:border-pink-500/40 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <FaSlidersH className="w-3 h-3 text-pink-400" />
            <span>Multiset Stars & Bars</span>
          </div>
          <p className="text-xl md:text-2xl font-black text-pink-400 mt-1">
            {rVal > 0 ? multiset(nVal, Math.min(rVal, nVal)).toLocaleString() : "N/A"}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Resource bins</p>
        </div>
      </div>
    </div>
  );
}
