"use client"; // Ensures this is a client component

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa"; // Import night and bright icons

export default function Header() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check for dark mode preference on page load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <div className="bg-[#0a192f] text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#0a192f] px-6 md:px-12 py-4 flex justify-between items-center shadow-md z-50">
        <h1 className="text-2xl font-bold text-yellow-400">Portfolio</h1>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-3xl">☰</button>

        {/* Navbar Links */}
        <ul className={`absolute md:static top-16 left-0 w-full md:w-auto bg-[#0a192f] md:flex md:space-x-6 ${open ? "block" : "hidden"} md:block`}>
          {["Home", "About", "Skills", "Portfolio", "Contact"].map((item, idx) => (
            <li key={idx} className="text-lg py-2 md:py-0 text-center md:text-left">
              <a href={`#${item.toLowerCase()}`} className="px-4 py-2 hover:text-red-500">{item}</a>
            </li>
          ))}

          {/* Login Button */}
          <li className="text-lg py-2 md:py-0 text-center md:text-left">
            <Link href="/login">
              <span className="px-6 py-2 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition duration-300 cursor-pointer">
                Login
              </span>
            </Link>
          </li>
        </ul>
        
        {/* Dark Mode Toggle Button */}
        <button onClick={toggleDarkMode} className="text-2xl">
          {darkMode ? <FaSun /> : <FaMoon />} {/* Change icon based on dark mode */}
        </button>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center px-4 bg-cover bg-center mt-16"
        style={{ backgroundImage: "url('/bg1.jpg')" }}
      >
        <motion.div
          className="p-6 bg-black bg-opacity-50 rounded-xl w-[90%] md:w-[50%] border-2 border-yellow-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-lg text-green-400">My name is</h2>
          <h1 className="text-3xl font-bold text-yellow-400">Masresha Alemu</h1>
          <p className="text-xl mt-2">I'm a Software Engineer</p>
          <h3 className="text-yellow-300 text-xl mt-2">
            <Typewriter options={{ strings: ["Python", "Django", "Machine Learning"], autoStart: true, loop: true }} />
          </h3>

          {/* Contact Button */}
          <button className="mt-4 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Let's Contact
          </button>
        </motion.div>
      </section>
    </div>
  );
}
