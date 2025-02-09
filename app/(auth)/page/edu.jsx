"use client"; 
import { useState, useEffect, useRef } from "react";
import certificates from "./eduData"; 

export default function Edu() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  // Auto-slide every 3 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
    );
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
      nextSlide();
    } else if (touchEndX - touchStartX.current > 50) {
      prevSlide();
    }
  };

  return (
    <div id="certificates" key="certificates" className="relative w-full max-w-3xl mx-auto mt-10">
      {/* Title */}
      <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-500 mb-6">
        Certifications & Training
      </h2>

      <div
        className="relative w-full flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button (Hidden on Mobile) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 p-3 text-blue-500 font-bold rounded-full shadow-2xl hover:text-blue-1000 hover:scale-125 transition duration-300 z-10 transform hidden lg:block"
        >
          &#10094; {/* Arrow icon */}
        </button>

        {/* Image Container */}
        <div className="w-full sm:w-[80%] h-70 sm:h-96 overflow-hidden rounded-lg shadow-xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center transition-all duration-500 ease-in-out transform">
          <img
            src={certificates[currentIndex]}
            alt={`Certificate ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-[1000ms] ease-in-out"
          />
        </div>

        {/* Next Button (Hidden on Mobile) */}
        <button
          onClick={nextSlide}
          className="absolute right-4 p-3 text-blue-500 font-bold rounded-full shadow-2xl hover:text-blue-700 hover:scale-125 transition duration-1000 z-10 transform hidden lg:block"
        >
          &#10095; {/* Arrow icon */}
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {certificates.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentIndex
                ? "bg-indigo-600 dark:bg-purple-400 w-4 h-4"
                : "bg-gray-400 dark:bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
