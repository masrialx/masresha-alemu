"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

const HIGHLIGHT = "font-semibold text-rose-500";

export default function AboutMe() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleResumeClick = () => setShowResumeModal(true);
  const handleCloseModal = () => setShowResumeModal(false);
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/masresha_alemu_adasho.pdf";
    link.download = "/masresha_alemu_adasho.pdf";
    link.click();
  };

  const handleZoomIn = () => setZoomLevel((prev) => prev + 0.2);
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(1, prev - 0.2));

  const handleMouseDown = (e) => {
    setDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
  };
  const handleMouseUp = () => setDragging(false);
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setDragging(true);
      setStartPos({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };
  const handleTouchMove = (e) => {
    if (!dragging || e.touches.length !== 1) return;
    setPosition({ x: e.touches[0].clientX - startPos.x, y: e.touches[0].clientY - startPos.y });
  };
  const handleTouchEnd = () => setDragging(false);

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
                international startups — from <span className={HIGHLIGHT}>AlphaMail AI</span> at Agents4Hire to CRM
                automation at <span className={HIGHLIGHT}>AISyncso</span>, interview systems at{" "}
                <span className={HIGHLIGHT}>Sapien AI</span>, and <span className={HIGHLIGHT}>Kelem Quiz</span> at NileSync.
                Harvard HSIL Hackathon <span className={HIGHLIGHT}>Ethiopia Hub winner</span> and{" "}
                <span className={HIGHLIGHT}>Global Top 50 finalist</span>.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <a href="#contact" className="btn-accent">
                  Connect
                </a>
                <button onClick={handleResumeClick} className="btn-outline">
                  View Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/70 p-4 backdrop-blur-sm">
          <div className="card-modern relative flex h-[85vh] w-full max-w-4xl flex-col p-4">
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 z-10 rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Close
            </button>

            <div
              className="flex flex-1 items-center justify-center overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: dragging ? "grabbing" : "grab" }}
            >
              <img
                src="/masresha_alemu_adasho.png"
                alt="Resume"
                className="max-h-full max-w-full object-contain"
                style={{ transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
              <div className="flex gap-2">
                <button onClick={handleZoomOut} className="btn-outline px-4 py-2">
                  −
                </button>
                <button onClick={handleZoomIn} className="btn-outline px-4 py-2">
                  +
                </button>
              </div>
              <button onClick={handleDownloadResume} className="btn-primary">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
