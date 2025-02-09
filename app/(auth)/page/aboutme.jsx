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
    link.href = "/Masresha_Alemu_Resume.pdf";
    link.download = "Masresha_Alemu_Resume.pdf";
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
    <div id="about"  key='about' className="bg-white min-h-screen flex items-center justify-center p-4 dark:bg-gray-800 dark:text-white">
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
    Results-driven software engineer with <span className="font-bold text-red-500">2+</span> years of experience in mobile app development, web app development, AI integration, and cybersecurity. Successfully completed <span className="font-bold text-red-500">50+</span> projects, including <span className="font-bold text-red-500">10+</span> large-scale applications, with <span className="font-bold text-red-500">international</span> and local experience in remote and onsite roles.
  </p>
  
  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">
      Let's Connect
    </button>
    <button
      onClick={handleResumeClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
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
              style={{ cursor: dragging ? "grabbing" : "grab" }}
            >
              <img
                src="/Masresha_Alemu_Resume_img.jpg"
                alt="Resume Screenshot"
                className="shadow-lg object-contain w-full h-full max-w-full max-h-full"
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                  transition: dragging ? "none" : "transform 0.2s ease-in-out",
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
