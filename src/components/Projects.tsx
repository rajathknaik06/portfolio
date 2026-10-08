"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Sparkles,
  Cpu,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { GithubIcon } from "./Icons";

interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  tech: string[];
  metrics: string;
  year: string;
  accent: string;
  featured: boolean;
  codeUrl: string;
  liveUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "socket-chat",
    title: "Client-Server Chat Engine",
    tagline: "Real-Time Socket Architecture & Event-Driven GUI",
    category: "Networking & Sockets",
    description:
      "Developed a real-time multi-client chat application using Python socket programming. Implemented concurrent TCP/IP socket listeners, multithreaded message broadcasting between multiple clients and a central server, and a graphical Tkinter interface with OOP architecture.",
    tech: ["Python", "Socket Programming", "Tkinter", "Multithreading", "OOP"],
    metrics: "Concurrent Client Sync • Event-Driven",
    year: "2026",
    accent: "from-amber-500/20 via-yellow-500/10 to-transparent",
    featured: true,
    codeUrl: "https://github.com/rajathknaik06",
    liveUrl: "https://github.com/rajathknaik06",
  },
  {
    id: "taskflow",
    title: "TaskFlow Orchestrator",
    tagline: "Python Workflow Engine & Automated Task Pipeline",
    category: "Automation & Systems",
    description:
      "A modular Python task execution and workflow management framework. Built to organize dependency-based execution trees, error recovery routines, and automated scheduling with clean object-oriented code architecture.",
    tech: ["Python", "Task Scheduling", "Data Structures", "OOP", "CLI"],
    metrics: "Automated Pipeline • Clean Architecture",
    year: "2026",
    accent: "from-orange-500/20 via-amber-500/10 to-transparent",
    featured: true,
    codeUrl: "https://github.com/rajathknaik06/taskflow",
    liveUrl: "https://github.com/rajathknaik06/taskflow",
  },
  {
    id: "azure-cloud",
    title: "Azure Cloud Infrastructure",
    tagline: "Phase-1 Cloud Provisioning & Resource Architecture",
    category: "Cloud & DevOps",
    description:
      "Comprehensive Microsoft Azure cloud infrastructure implementation. Explores virtual network isolation, Azure resource management, identity & access control (IAM), and cloud security best practices aligned with Microsoft Azure Fundamentals.",
    tech: ["Microsoft Azure", "Cloud Infrastructure", "Linux", "Virtual Networks", "IAM"],
    metrics: "Certified Cloud Skills • Simplilearn",
    year: "2026",
    accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
    featured: false,
    codeUrl: "https://github.com/rajathknaik06/azure-fundamentals-phase1",
    liveUrl: "https://github.com/rajathknaik06/azure-fundamentals-phase1",
  },
  {
    id: "django-backend",
    title: "Django Full-Stack Systems",
    tagline: "Relational Database Modeling & Production MVT Architecture",
    category: "Backend & Web",
    description:
      "Full-stack web application architecture implemented using Django. Employs relational database modeling with PostgreSQL and MySQL, secure authentication pipelines, and optimized ORM query patterns for high-throughput database interactions.",
    tech: ["Django", "Python", "PostgreSQL", "MySQL", "REST APIs", "MVT Pattern"],
    metrics: "PostgreSQL & MySQL • Relational DBMS",
    year: "2026",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    featured: false,
    codeUrl: "https://github.com/rajathknaik06/Django-class-final-notes-and-source-code",
    liveUrl: "https://github.com/rajathknaik06/Django-class-final-notes-and-source-code",
  },
  {
    id: "linux-core",
    title: "Linux Core & Systems Automation",
    tagline: "Low-Level Shell Scripting & POSIX OS Fundamentals",
    category: "OS & Systems",
    description:
      "Linux environment engineering repository covering core system utilities: process management, file permissions, compression, environment variable orchestration, and stream manipulation with shell automation.",
    tech: ["Linux", "Bash Scripting", "POSIX OS", "CLI Tooling", "File Systems"],
    metrics: "Kernel Concepts • Shell Scripting",
    year: "2026",
    accent: "from-purple-500/20 via-pink-500/10 to-transparent",
    featured: false,
    codeUrl: "https://github.com/rajathknaik06",
    liveUrl: "https://github.com/rajathknaik06",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
    filter === "all"
      ? PROJECTS
      : filter === "python"
      ? PROJECTS.filter((p) => p.tech.includes("Python") || p.tech.includes("Django"))
      : filter === "cloud"
      ? PROJECTS.filter((p) => p.category.includes("Cloud") || p.tech.includes("Linux"))
      : PROJECTS;

  return (
    <section id="projects" className="relative w-full py-32 px-6 md:px-12 bg-[#020611] z-20">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4 text-xs font-mono text-amber-300">
              <Layers className="w-3.5 h-3.5" />
              <span>SELECTED CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Featured Work.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/60 max-w-xl font-light">
              A curated catalog of experiments, production systems, and creative technology architectures engineered for maximum visual delight.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-1.5 rounded-full border border-white/10 backdrop-blur-md text-xs font-mono">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === "all"
                  ? "bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter("python")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === "python"
                  ? "bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Python &amp; Sockets
            </button>
            <button
              onClick={() => setFilter("cloud")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === "cloud"
                  ? "bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Cloud &amp; Linux
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl p-8 sm:p-10 border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-amber-400/40 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Dynamic ambient hover glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />

              {/* Corner badge & Year */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                  PROJECT // 0{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-white/10 bg-white/5 text-amber-300">
                    {project.year}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-amber-400/30 bg-amber-400/10 text-amber-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Mockup Preview Visual Box */}
              <div className="relative z-10 w-full h-48 sm:h-56 rounded-2xl bg-black/60 border border-white/10 overflow-hidden mb-8 p-4 flex flex-col justify-between group-hover:border-amber-400/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 truncate max-w-[200px]">
                    https://{project.id}.systems
                  </span>
                </div>

                {/* Abstract visual art inside card */}
                <div className="my-auto text-center flex flex-col items-center justify-center">
                  <Cpu className="w-10 h-10 text-amber-400/40 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-500" />
                  <span className="mt-2 text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors">
                    {project.category}
                  </span>
                </div>

                {/* Metrics pill inside mockup */}
                <div className="flex items-center justify-between text-[11px] font-mono text-white/40 border-t border-white/5 pt-2">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Activity className="w-3 h-3" /> Live Architecture
                  </span>
                  <span className="text-amber-300/80">{project.metrics}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs font-mono text-amber-400/80 uppercase tracking-wider">
                  {project.tagline}
                </p>
                <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/5 text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-white group-hover:text-amber-300 transition-colors"
                  >
                    <span>Inspect Live</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    title="Source Code"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
