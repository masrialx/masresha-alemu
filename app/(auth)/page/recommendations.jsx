"use client";

import { FaLinkedin } from "react-icons/fa";
import SectionHeader from "./SectionHeader";

const LINKEDIN_URL = "https://www.linkedin.com/in/masresha-a-851241232/";

export default function Recommendations() {
  return (
    <section id="recommendations" className="section-shell bg-slate-50">
      <div className="section-inner max-w-4xl">
        <SectionHeader
          label="Testimonials"
          title="Recommendations"
          subtitle="What industry professionals say about my work"
        />

        <article className="card-modern overflow-hidden border-0 bg-brand-navy p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="mx-auto shrink-0 md:mx-0">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-sky-500 text-2xl font-bold shadow-glow md:h-24 md:w-24">
                  DT
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs ring-2 ring-brand-navy">
                  ✓
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="border-b border-white/10 pb-4 mb-4">
                <h3 className="text-xl font-bold sm:text-2xl">Dagnachew Tsegaye</h3>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                  <span className="rounded-lg bg-white/10 px-3 py-1 font-medium">Senior Software Engineer</span>
                  <span>Microsoft</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">July 27, 2025 · Direct Manager</p>
              </div>

              <blockquote className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Masresha Alemu is a highly skilled full-stack developer with deep expertise in the MERN stack and Python
                frameworks like FastAPI, Django, and Flask. He also brings strong AI/ML integration skills, making him a rare
                all-rounder. His work ethic, reliability, and problem-solving mindset consistently stand out. A valuable asset
                to any team.
              </blockquote>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Verified</span>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#004182]"
                >
                  <FaLinkedin size={14} />
                  More on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
