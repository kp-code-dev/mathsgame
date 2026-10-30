"use client";

import React, { useState } from "react";
import { LEVELS } from "../data/levels";
import {
  FaTimes,
  FaBook,
  FaEnvelope,
  FaGraduationCap,
  FaCheckDouble,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export function AssignmentOverviewModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const emailText = `Respected Ma'am,

I am submitting my Foundation of Mathematics Innovative Assignment for Unit 1: Introduction to Combinatorics and Its Applications.

Assignment Details:
• Name: [Your Name]
• Enrolment Number: [Your Enrolment Number]
• Programme: BCA / B.Tech / Integrated MCA
• Semester: Semester 1 / 2
• Division: [Your Division]
• Chosen Unit: Unit 1 — Introduction to Combinatorics and Its Applications
• Assignment Title: Combinatorics Quest: Cyber Heist (Interactive CS Combinatorics Game)
• Working Project Link / Zip: [Attached / Hosted URL]

Assignment Objective:
To move beyond dry theoretical memorization and demonstrate how pure combinatorial theorems (Pigeonhole collisions, recursive runtimes, multiset resource allocations, derangements, generating functions) serve as the vital mathematical foundation for cybersecurity, cryptanalysis, distributed consensus, and algorithmic complexity.

Summary of 11 Unit Topics Covered:
1. Addition & Multiplication Rules (Firewall Routing & Proxy Chains)
2. Permutations with/without Repetition (PIN Keyspace Entropy & Anagram Hashing)
3. Combinations & Identities (Kubernetes Quorum Consensus & Pascal's Symmetry)
4. Binomial Theorem & Pascal's Triangle (Quantum Bit-flip Corruptions & Hamming Bounds)
5. Pigeonhole Principle (Hash Table Collisions & Complexity DoS Attacks)
6. Principle of Inclusion-Exclusion (SQL UNION Queries & Botnet Subnet Disinfection)
7. Derangements & Applications (Zero-Leakage Cryptographic Key Rotations)
8. Multisets & Stars and Bars (Kubernetes cgroups vCPU Allocation)
9. Integer Partitions & Compositions (Router MTU Packet Fragmentation)
10. Recurrence Relations & Solutions (Recursive Algorithm Time Complexity Analysis)
11. Generating Functions & Applications (Algebraic Power Series Polynomial Convolution)

Thank you for your guidance and support.

Sincerely,
[Your Name]
[Enrolment Number]`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-8 text-slate-200 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 pb-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider font-mono text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60 flex items-center gap-1.5">
              <FaGraduationCap className="w-3.5 h-3.5" />
              <span>Foundation of Mathematics — Innovative Assignment</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Unit 1: Combinatorics & Computing Applications
          </h2>
          <p className="text-sm text-cyan-300 mt-1 flex items-center gap-2">
            <span>Project:</span>
            <strong className="text-white">Combinatorics Quest: Cyber Heist</strong>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Interactive Game & Simulation Engine</span>
          </p>
        </div>

        {/* Ready to Send Email Section */}
        <div className="p-5 bg-gradient-to-br from-cyan-950/40 to-slate-950/80 border border-cyan-700/50 rounded-2xl mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase">
              <FaEnvelope className="w-3.5 h-3.5" />
              <span>Ready-to-Send Faculty Submission Draft</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
              <span>{copied ? "Copied!" : "Copy Email Draft"}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono text-slate-300 mb-3">
            <div><span className="text-slate-500">To Faculty:</span> Meghana Trivedi & Keyuri Shah</div>
            <div><span className="text-slate-500">Emails:</span> meghanatrivedi.ca@silveroakuni.ac.in, keyurishah.ca@silveroakuni.ac.in</div>
            <div><span className="text-slate-500">Unit:</span> Unit 1: Introduction to Combinatorics and Its Applications</div>
            <div><span className="text-slate-500">Format:</span> Interactive Educational Web Game (No written report required)</div>
          </div>
          <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
            {emailText}
          </pre>
        </div>

        {/* 100% Comprehensive Coverage Matrix */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <FaCheckDouble className="w-4 h-4 text-emerald-400" />
            <span>Complete Unit 1 Topics Matrix (All 11 Topics Recovered)</span>
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-cyan-400 font-mono">
                <tr>
                  <th className="p-3 border-b border-slate-800">Mission</th>
                  <th className="p-3 border-b border-slate-800">Syllabus Topic</th>
                  <th className="p-3 border-b border-slate-800">Governing Mathematical Law</th>
                  <th className="p-3 border-b border-slate-800">Practical Computer Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/60 font-sans">
                {LEVELS.map((lvl) => (
                  <tr key={lvl.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-mono text-cyan-300 font-bold whitespace-nowrap">M#{lvl.id}</td>
                    <td className="p-3 font-semibold text-white whitespace-nowrap">{lvl.topic}</td>
                    <td className="p-3 font-mono text-emerald-300 text-[11px]">{lvl.mathFormula}</td>
                    <td className="p-3 text-slate-300 text-[11px] leading-relaxed">{lvl.csApplication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Learning Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-amber-300 uppercase tracking-wide mb-2 flex items-center gap-1.5 font-mono">
              <HiSparkles className="w-3.5 h-3.5" />
              <span>Project Objective</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              To present mathematics not as abstract formula memorization, but as the governing logic of computer science—demonstrating how counting principles, derangements, partitions, and generating functions enable secure encryption, distributed consensus, and optimal algorithm design.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-emerald-300 uppercase tracking-wide mb-2 flex items-center gap-1.5 font-mono">
              <FaCheckDouble className="w-3.5 h-3.5" />
              <span>Key Learnings</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              We proved that algorithm lower bounds (like hash collisions via the Pigeonhole Principle or packet routing complexity via Sum/Product rules) are fundamental mathematical theorems rather than mere hardware constraints.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
          >
            Close Overview & Return to Game
          </button>
        </div>
      </div>
    </div>
  );
}
