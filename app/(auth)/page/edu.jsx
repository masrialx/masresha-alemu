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
    }, 3000);
    
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
    <div className="relative w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Tech Certificates
      </h2>

      <div
        className="relative w-full flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 p-3 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 transition duration-300 z-10"
        >
          &#10094;
        </button>

        {/* Image Container */}
        <div className="w-[80%] h-72 overflow-hidden rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 flex items-center justify-center">
          <img
            src={certificates[currentIndex]}
            alt={`Certificate ${currentIndex + 1}`}
            className="w-full h-full object-contain transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 p-3 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 transition duration-300 z-10"
        >
          &#10095;
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {certificates.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentIndex ? "bg-gray-800 dark:bg-white w-4 h-4" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
