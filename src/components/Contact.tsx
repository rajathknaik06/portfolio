"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Check,
  Copy,
  ArrowUpRight,
  Sparkles,
  MapPin,
} from "lucide-react";
import { GithubIcon, TwitterXIcon, LinkedinIcon } from "./Icons";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const email = "rajathkrishnamurthy173@gmail.com";
  const phone = "+91 9353597411";
  const githubUrl = "https://github.com/rajathknaik06";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contact" className="relative w-full py-32 px-6 md:px-12 bg-[#020611] border-t border-white/5 z-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6 text-xs font-mono text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>OPEN FOR COLLABORATION</span>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl">
          Let’s build something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
            exceptional together.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-white/60 max-w-xl font-light leading-relaxed">
          Seeking internship, entry-level engineering roles, and cloud development opportunities. Based in Bengaluru and Bhatkal, India.
        </p>

        {/* Interactive Contact Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl">
          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-amber-400/40 text-white font-mono text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-between gap-3 backdrop-blur-md shadow-lg group"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{email}</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-amber-400/20 transition-colors">
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-white/60 group-hover:text-amber-300" />
              )}
            </div>
          </button>

          {/* Copy Phone Button */}
          <button
            onClick={handleCopyPhone}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-amber-400/40 text-white font-mono text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-between gap-3 backdrop-blur-md shadow-lg group"
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{phone}</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-amber-400/20 transition-colors">
              {copiedPhone ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-white/60 group-hover:text-amber-300" />
              )}
            </div>
          </button>
        </div>

        {/* Direct Send Email Link */}
        <div className="mt-4 flex items-center gap-4">
          <a
            href={`mailto:${email}`}
            className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wide transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] active:scale-95"
          >
            <span>Send Direct Email</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Location & Status Badge */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-white/60">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Bengaluru &amp; Bhatkal, Karnataka, India</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-white/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Actively Seeking Software &amp; Cloud Opportunities</span>
          </div>
        </div>

        {/* Social / Professional Profiles */}
        <div className="mt-14 flex items-center gap-4 text-white/60">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full border border-white/10 bg-white/5 hover:text-white hover:border-amber-400/40 hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono"
            aria-label="GitHub Profile"
            title="GitHub: rajathknaik06"
          >
            <GithubIcon className="w-4 h-4" />
            <span>github.com/rajathknaik06</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full border border-white/10 bg-white/5 hover:text-white hover:border-amber-400/40 hover:bg-white/10 transition-all"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
