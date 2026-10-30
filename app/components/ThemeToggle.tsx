"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-sm ${
        theme === "dark"
          ? "bg-slate-900/90 hover:bg-slate-800 text-amber-300 border-slate-700 hover:border-amber-400/50 shadow-amber-500/10"
          : "bg-white/95 hover:bg-slate-100 text-slate-800 border-slate-300 hover:border-cyan-500 shadow-slate-300/30"
      } ${className}`}
    >
      {theme === "dark" ? (
        <>
          <FaSun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <FaMoon className="w-3.5 h-3.5 text-cyan-600" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </button>
  );
}

