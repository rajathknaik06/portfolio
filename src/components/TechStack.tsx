"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Network,
  Cloud,
  Database,
  Cpu,
  Terminal,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Network,
    title: "Socket & Distributed Systems",
    desc: "Designing concurrent TCP/IP socket architectures, event-driven multi-client broadcasting servers, and multithreaded desktop interfaces in Python.",
    tags: ["Python Sockets", "Multithreading", "Tkinter GUI", "TCP/IP"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure (Azure)",
    desc: "Deploying and managing scalable cloud resources on Microsoft Azure, configuring virtual network partitions, access governance (IAM), and Linux cloud instances.",
    tags: ["Microsoft Azure", "Cloud Services", "Linux CLI", "Virtual Networks"],
  },
  {
    icon: Database,
    title: "Backend & Relational DBMS",
    desc: "Engineering structured web backends with Django and robust relational schemas. Optimizing SQL queries, data relationships, and ACID compliance across PostgreSQL and MySQL.",
    tags: ["Django MVT", "PostgreSQL", "MySQL", "SQL Queries"],
  },
  {
    icon: Cpu,
    title: "Core CS & Algorithmic Rigor",
    desc: "Implementing fundamental data structures, graph traversals, and object-oriented abstractions. Strong mathematical grounding in C, Python, and computer networks.",
    tags: ["Data Structures", "Algorithms", "C Language", "OOP Design"],
  },
];

const TECH_BADGES = [
  "Python",
  "C Language",
  "SQL",
  "Django",
  "Microsoft Azure",
  "PostgreSQL",
  "MySQL",
  "Socket Programming",
  "Tkinter",
  "Linux & Bash",
  "Git & GitHub",
  "VS Code",
  "Data Structures & Algorithms",
  "OOP",
  "Computer Networks",
  "DBMS",
];

const METRICS = [
  { label: "B.Tech CGPA @ GITAM", value: "8.6", unit: "Academic Rank" },
  { label: "Class 12th PCM", value: "96.8%", unit: "Distinction" },
  { label: "Verified Credentials", value: "4+", unit: "Certifications" },
  { label: "Core Foundations", value: "100%", unit: "DSA & OOP" },
];

export default function TechStack() {
  return (
    <section id="capabilities" className="relative w-full py-32 px-6 md:px-12 bg-[#020611] border-t border-white/5 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4 text-xs font-mono text-amber-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Engineered For Reliability.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl font-light">
            Combining rigorous computer science foundations with real-time socket communications, relational database modeling, and Microsoft Azure cloud architecture.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {CAPABILITIES.map((cap, i) => {
            const IconComponent = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl p-8 border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-amber-400/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 text-amber-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                    {cap.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benchmarks Banner */}
        <div className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-gradient-to-r from-amber-500/[0.05] via-white/[0.02] to-amber-500/[0.05] backdrop-blur-xl mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10 text-center">
            {METRICS.map((metric) => (
              <div key={metric.label} className="pt-4 lg:pt-0 lg:px-6 flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                  {metric.value}
                </span>
                <span className="mt-1 text-xs font-mono text-amber-300 tracking-wider uppercase">
                  {metric.unit}
                </span>
                <span className="mt-2 text-xs text-white/50 font-light">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Ecosystem Pills */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-6 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Technical Toolkit &amp; Languages</span>
          </span>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
            {TECH_BADGES.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full text-xs font-mono border border-white/10 bg-white/[0.03] text-white/80 hover:text-white hover:border-amber-400/50 hover:bg-amber-400/10 transition-all cursor-default"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
