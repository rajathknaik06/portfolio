"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  MapPin,
  Palette,
} from "lucide-react";

const EDUCATION = [
  {
    institution: "GITAM University",
    degree: "Bachelor of Technology in Computer Science Engineering",
    period: "09/2024 – 07/2028",
    location: "Bengaluru, India",
    grade: "CGPA: 8.6",
    details: [
      "Core Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS), Computer Networks",
      "Active Member of Perspective Arts Club participating in cultural & creative initiatives",
    ],
    highlight: true,
  },
  {
    institution: "Anand Ashram Composite PU College",
    degree: "Class 12th PCM (Physics, Chemistry, Mathematics)",
    period: "06/2023 – 04/2024",
    location: "Bhatkal, India",
    grade: "Grade: 96.8%",
    details: [
      "Rigorous pre-university scientific curriculum in Physics, Chemistry, and Mathematics",
      "Demonstrated academic distinction with 96.8% aggregate score",
    ],
    highlight: false,
  },
  {
    institution: "Anand Ashram High School",
    degree: "Class 10th Secondary Education",
    period: "06/2021 – 04/2022",
    location: "Bhatkal, India",
    grade: "Grade: 94.8%",
    details: [
      "Comprehensive secondary education focusing on mathematics, science, and computer basics",
      "Graduated with 94.8% high-distinction honor",
    ],
    highlight: false,
  },
];

const CERTIFICATIONS = [
  {
    title: "Technology Job Simulation",
    issuer: "Deloitte",
    date: "July 2026",
    badge: "Industry Simulation",
    accent: "border-blue-500/30 bg-blue-500/5",
  },
  {
    title: "Azure Fundamentals",
    issuer: "Simplilearn",
    date: "July 2026",
    badge: "Cloud Computing",
    accent: "border-amber-500/30 bg-amber-500/5",
  },
  {
    title: "Python with Data Structures & Algorithms",
    issuer: "Tutedude",
    date: "June 2026",
    badge: "Core CS & DSA",
    accent: "border-emerald-500/30 bg-emerald-500/5",
  },
  {
    title: "Python Programming",
    issuer: "Tutedude",
    date: "June 2026",
    badge: "Software Engineering",
    accent: "border-purple-500/30 bg-purple-500/5",
  },
];

export default function Credentials() {
  return (
    <section id="credentials" className="relative w-full py-32 px-6 md:px-12 bg-[#020611] border-t border-white/5 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4 text-xs font-mono text-amber-300">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMIC FOUNDATION &amp; CREDENTIALS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Education &amp; Certifications.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/60 max-w-xl font-light">
              Formal engineering education at GITAM University paired with industry simulations and verified cloud certifications.
            </p>
          </div>
        </div>

        {/* Two Column Layout: Education Timeline + Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Education Timeline (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-lg font-mono text-white/70 flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Formal Education Journey</span>
            </h3>

            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300 ${
                  edu.highlight
                    ? "border-amber-400/30 bg-white/[0.03] shadow-[0_0_30px_-10px_rgba(251,191,36,0.15)]"
                    : "border-white/10 bg-white/[0.015] hover:border-white/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    {edu.institution}
                  </h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-300">
                    {edu.grade}
                  </div>
                </div>

                <div className="text-sm text-white/80 font-medium mb-3">
                  {edu.degree}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50 mb-5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400/80" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                    {edu.location}
                  </span>
                </div>

                <ul className="space-y-2 border-t border-white/5 pt-4 text-xs sm:text-sm text-white/60 font-light">
                  {edu.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certifications & Leadership (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-lg font-mono text-white/70 flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verified Certifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`rounded-2xl p-6 border ${cert.accent} backdrop-blur-md hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 uppercase">
                        {cert.badge}
                      </span>
                      <h4 className="text-base font-bold text-white mt-2 leading-snug">
                        {cert.title}
                      </h4>
                    </div>
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-white/50 pt-3 border-t border-white/5">
                    <span className="text-amber-300/90">{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Creative Activities & Perspective Arts Club Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-6 border border-white/10 bg-gradient-to-br from-amber-500/[0.05] via-white/[0.02] to-transparent backdrop-blur-xl mt-2"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Perspective Arts Club
                  </h4>
                  <span className="text-xs font-mono text-amber-300/80">
                    Active Member &bull; GITAM University
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Actively participating in cultural, artistic, and creative design initiatives organized by GITAM&apos;s Perspective Arts Club. Bridging computational engineering with aesthetic sensibility.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
