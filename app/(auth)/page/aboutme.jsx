"use client";

import Head from "next/head";
import { useState } from "react";

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
    link.href = "/masresha-alemu-ats-resume-updated.pdf";
    link.download = "/masresha-alemu-ats-resume-updated.pdf";
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
    <div id="about" key="about" className="bg-white min-h-screen flex items-center justify-center p-4 dark:bg-gray-800 dark:text-white">
      <Head>
        <title>About Me</title>
      </Head>

      <main className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>

        <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Profile Image Section */}
          <div className="w-full sm:w-[50%] lg:w-[30%] h-80 relative rounded-full overflow-hidden border-8 border-gradient-to-r from-teal-400 to-lime-500 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 shadow-xl">
            <div
              className="absolute inset-0 bg-cover bg-center backdrop-blur-sm"
              style={{ backgroundImage: "url('/masri1.jpg')" }}
            />
            <div className="w-full h-full bg-[rgb(202,199,25)] opacity-0" />
          </div>

          {/* About Text Section */}
          <div className="w-full sm:w-[70%] lg:w-[50%] text-left px-4 sm:px-8 text-justify">
          <p className="text-lg mb-4">
  Results-driven Software Engineer with <span className="font-bold text-red-500">2+</span> years of hands-on experience in backend and mobile app development. Proficient in <span className="font-bold text-red-500">MERN stack</span>, <span className="font-bold text-red-500">Django</span>, <span className="font-bold text-red-500">Python</span>, <span className="font-bold text-red-500">machine learning</span>, and <span className="font-bold text-red-500">LLM-based AI automation</span>. Proven ability to design scalable systems with <span className="font-bold text-red-500">Flask</span>, <span className="font-bold text-red-500">OpenCV</span>, and <span className="font-bold text-red-500">TensorFlow</span>, ensuring data security and integrity. Adept problem-solver and collaborative team player committed to continuous learning and delivering innovative solutions.
</p>


            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
  {/* Connect Button */}
  <a
    href="#contact"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full sm:w-auto text-lg sm:text-xl text-center"
  >
    Connect
  </a>

  {/* Resume Button */}
  <button
    onClick={handleResumeClick}
    className="bg-[#0a192f] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full sm:w-auto text-lg sm:text-xl border-2 border-white"
  >
    Resume
  </button>
</div>

           
          </div>
        </div>
      </main>

      {/* Modal for PDF Screenshot Preview */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-full sm:w-[80%] lg:w-[60%] h-[80%] relative flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-xl font-bold text-red-500 z-10"
            >
              X
            </button>

            {/* Image Container with Zoom & Pan */}
            <div
              className="overflow-hidden w-full flex justify-center items-center"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                cursor: dragging ? "grabbing" : "grab",
                transition: "transform 0.2s ease-in-out", // Smooth transition when zooming and dragging
              }}
            >
              <img
                src="/masresha-alemu-ats-photo.png"
                alt="Resume"
                className="shadow-lg object-contain w-full h-full max-w-full max-h-full"
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex justify-between mt-4 w-full px-4">
              {/* Zoom Controls */}
              <div className="flex gap-4">
                <button
                  onClick={handleZoomOut}
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  -
                </button>
                <button
                  onClick={handleZoomIn}
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  +
                </button>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownloadResume}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
