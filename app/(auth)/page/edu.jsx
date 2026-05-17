"use client";

import { useState, useEffect, useRef } from "react";
import certificates from "./eduData";
import SectionHeader from "./SectionHeader";

export default function Edu() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 7000);
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % certificates.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) nextSlide();
    else if (touchEndX - touchStartX.current > 50) prevSlide();
  };

  return (
    <section id="certificates" className="section-shell bg-white">
      <div className="section-inner max-w-3xl">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          subtitle="Professional training and certifications"
        />

        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md text-brand-navy hover:bg-slate-50 lg:block"
            aria-label="Previous"
          >
            &#10094;
          </button>

          <div className="card-modern mx-auto max-w-2xl overflow-hidden">
            <img
              src={certificates[currentIndex]}
              alt={`Certificate ${currentIndex + 1}`}
              className="h-56 w-full object-cover sm:h-80 transition-opacity duration-500"
            />
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md text-brand-navy hover:bg-slate-50 lg:block"
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to certificate ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-rose-500" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
