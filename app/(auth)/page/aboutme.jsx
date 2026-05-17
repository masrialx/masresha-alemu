"use client";

import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import SectionHeader from "./SectionHeader";

const HIGHLIGHT = "font-semibold text-rose-500";
const LINKEDIN_URL = "https://www.linkedin.com/in/masresha-a-851241232/";
const RESUME_PDF = "/Masresha_alemu-update-resume-ATS-I.pdf";
const RESUME_DOWNLOAD_NAME = "Masresha_Alemu_Resume.pdf";

export default function AboutMe() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleResumeClick = () => setShowResumeModal(true);
  const handleCloseModal = () => setShowResumeModal(false);
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = RESUME_PDF;
    link.download = RESUME_DOWNLOAD_NAME;
    link.click();
  };

  return (
    <>
      <section id="about" className="section-shell bg-slate-50">
        <div className="section-inner">
          <SectionHeader label="About" title="Who I Am" subtitle="Full stack & AI engineer building products for global teams" />

          <div className="card-modern flex flex-col items-center gap-8 p-6 sm:p-10 lg:flex-row lg:items-start">
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-rose-500 to-sky-500 opacity-80 blur-sm" />
              <div
                className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-slate-200 sm:h-56 sm:w-56 bg-cover bg-center"
                style={{ backgroundImage: "url('/masri.png')" }}
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                <span className={HIGHLIGHT}>Full Stack &amp; AI Engineer</span> with experience building scalable{" "}
                <span className={HIGHLIGHT}>SaaS platforms</span>, <span className={HIGHLIGHT}>AI agents</span> (OpenClaw,
                MCP, browser automation, UI agents), and <span className={HIGHLIGHT}>LLM-powered automation</span> for
                international startups — from <span className={HIGHLIGHT}>AlphaMail AI</span> and{" "}
                <span className={HIGHLIGHT}>GenAI</span> at Agents4Hire to CRM automation at{" "}
                <span className={HIGHLIGHT}>AISyncso</span>, interview systems at{" "}
                <span className={HIGHLIGHT}>Sapien AI</span>, and <span className={HIGHLIGHT}>Kelem Quiz</span> at NileSync.
                Harvard HSIL Hackathon — <span className={HIGHLIGHT}>Ethiopia&apos;s #1 winner</span>, representing{" "}
                <span className={HIGHLIGHT}>Ethiopia on the world stage</span>.
              </p>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-3 rounded-xl border-2 border-[#0A66C2]/30 bg-[#0A66C2]/5 px-4 py-3 text-left transition-all hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:shadow-md lg:justify-start"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-md">
                  <FaLinkedin size={22} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#0A66C2]">
                    See more on LinkedIn — full experience &amp; recommendations
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">linkedin.com/in/masresha-a-851241232</span>
                </span>
              </a>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent inline-flex items-center justify-center gap-2"
                >
                  <FaLinkedin size={18} />
                  LinkedIn Profile
                </a>
                <a href="#contact" className="btn-outline">
                  Contact
                </a>
                <button onClick={handleResumeClick} className="btn-outline">
                  View Resume
                </button>
                <a href={RESUME_PDF} download={RESUME_DOWNLOAD_NAME} className="btn-outline">
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/70 p-4 backdrop-blur-sm">
          <div className="card-modern relative flex h-[90vh] w-full max-w-4xl flex-col p-4">
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <h3 className="text-lg font-semibold text-slate-900">Resume</h3>
              <div className="flex items-center gap-2">
                <button onClick={handleDownloadResume} className="btn-primary px-4 py-2 text-sm">
                  Download PDF
                </button>
                <button
                  onClick={handleCloseModal}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>

            <iframe
              src={`${RESUME_PDF}#toolbar=1&navpanes=0`}
              title="Masresha Alemu Resume"
              className="min-h-0 flex-1 w-full rounded-lg border border-slate-200 bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
}
