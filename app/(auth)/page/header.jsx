"use client"; // Ensures this is a client component

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import Image from "next/image";
import { FaMoon, FaSun, FaHome, FaUser, FaLaptopCode, FaBriefcase, FaPhone, FaBars, FaTimes, FaCertificate, FaGraduationCap } from "react-icons/fa"; // Added FaGraduationCap for the new Education menu item

export default function Header() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

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

  const menuItems = [
    { name: "Home", icon: <FaHome />, id: "home" },
    { name: "About", icon: <FaUser />, id: "about" },
    { name: "Skills", icon: <FaLaptopCode />, id: "skills" },
    { name: "Projects", icon: <FaBriefcase />, id: "projects" },
    { name: "Education", icon: <FaGraduationCap />, id: "education" },
    { name: "Certificates", icon: <FaCertificate />, id: "certificates" },
    { name: "Contact", icon: <FaPhone />, id: "contact" },
  ];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 70, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    menuItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => {
      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-[#0a192f] text-white min-h-screen font-sans">
      <nav className="fixed top-0 left-0 w-full bg-[#0a192f] px-4 md:px-6 py-3 flex justify-between items-center shadow-md z-50">
        <Link href="/">
          <Image src="/logos1.png" alt="Logo" width={80} height={24} className="cursor-pointer" />
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden text-3xl text-white focus:outline-none">
          {open ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`absolute md:static top-[5rem] left-0 w-full md:w-auto bg-[#0a192f] md:flex md:space-x-4 transition-all duration-300 ease-in-out ${open ? "block" : "hidden"} md:block md:mt-0 md:py-0 py-3`}>
          {menuItems.map((item) => (
            <li key={item.id} className="py-2 md:py-0 text-center md:text-left font-semibold transition duration-300">
              <button
                onClick={() => handleScroll(item.id)}
                className={`flex items-center gap-3 px-5 py-2 md:px-2 md:py-2 transition duration-300 ${activeSection === item.id ? "text-red-500" : "text-white"}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-4 bg-cover bg-center mt-16" style={{ backgroundImage: "url('/bg1.jpg')" }}>
        <motion.div className="p-6 bg-black bg-opacity-50 rounded-xl w-[90%] md:w-[50%] border-2 border-yellow-500" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 className="text-base text-green-400 font-extrabold">My name is</h2>
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400">Masresha Alemu</h1>
          <p className="text-xl mt-2 font-extrabold">I'm a Software Engineer</p>
          <h3 className="text-yellow-300 text-xl mt-2 font-extrabold">
            <Typewriter options={{ strings: ["Python", "Django", "Machine Learning"], autoStart: true, loop: true }} />
          </h3>
          <button onClick={() => handleScroll("contact")} className="mt-4 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-extrabold">Let's Contact</button>
        </motion.div>
      </section>

     
    </div>
  );
}
