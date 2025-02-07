"use client"; // <-- Add this at the top
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }, []);

  return (
    <footer className="bg-[#0a192f] text-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-2">© 2025 Masresha Alemu. All Rights Reserved.</p>
        <p className="text-sm mb-4">Your trusted partner for high-quality services and products.</p>
        <p className="text-sm mb-4">
          Reach out to us at <a href="mailto:contact@yourcompany.com" className="text-blue-200 hover:text-white">masrialemu@gmail.com</a> or call us at <a href="tel:+251979742762" className="text-blue-200 hover:text-white">+1 (234) 567-890</a>.
        </p>
        <p className="text-sm">Current Date: {currentDate}</p>
      </div>
    </footer>
  );
}
