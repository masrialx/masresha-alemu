"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FaHome,
  FaUser,
  FaLaptopCode,
  FaBriefcase,
  FaPhone,
  FaBars,
  FaTimes,
  FaCertificate,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";

const CodingScene3D = dynamic(() => import("./CodingScene3D"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex h-[280px] w-full max-w-md items-center justify-center sm:h-[340px] lg:h-[420px]">
      <div className="h-12 w-12 animate-pulse rounded-2xl bg-white/10" />
    </div>
  ),
});

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { name: "Home", icon: <FaHome />, id: "home" },
    { name: "About", icon: <FaUser />, id: "about" },
    { name: "Skills", icon: <FaLaptopCode />, id: "skills" },
    { name: "Projects", icon: <FaBriefcase />, id: "projects" },
    { name: "Education", icon: <FaGraduationCap />, id: "education" },
    { name: "Certificates", icon: <FaCertificate />, id: "certificates" },
    { name: "Recommendations", icon: <FaStar />, id: "recommendations" },
    { name: "Contact", icon: <FaPhone />, id: "contact" },
  ];

  const handleScroll = (id) => {
    setOpen(false);
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 72, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, observerOptions);

    menuItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-brand-navy/80 backdrop-blur-xl">
        <motion.div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-sky-500 text-lg font-bold text-white shadow-glow transition-transform group-hover:scale-105">
              MA
            </div>
            <span className="hidden text-sm font-semibold text-white sm:block">Masresha Alemu</span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          <ul
            className={`absolute left-0 top-full w-full flex-col gap-1 border-b border-white/10 bg-brand-navy/95 px-4 py-4 backdrop-blur-xl md:static md:flex md:w-auto md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 ${
              open ? "flex" : "hidden md:flex"
            }`}
          >
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScroll(item.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:w-auto ${
                    activeSection === item.id
                      ? "bg-white/10 text-rose-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base opacity-80">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>

      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden bg-brand-dark pt-20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/98 via-brand-navy/90 to-brand-dark" />
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-blob animation-delay-2000" />

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-16">
          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-sky-400">
              Full Stack &amp; AI Engineer
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Masresha <span className="gradient-text">Alemu</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 sm:text-xl">
              Building SaaS, AI agents &amp; automation for global teams
            </p>
            <div className="mt-3 text-base text-slate-400 sm:text-lg">
              <Typewriter
                options={{
                  strings: [
                    "AI Agents & MCP",
                    "LLM Automation",
                    "SaaS Platforms",
                    "OpenClaw & Browser Agents",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <button onClick={() => handleScroll("projects")} className="btn-accent w-full sm:w-auto">
                View Experience
              </button>
              <button
                onClick={() => handleScroll("contact")}
                className="btn-outline w-full border-white/20 bg-white/5 text-white hover:border-sky-400 hover:text-sky-300 sm:w-auto"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>

          {/* 3D coding scene */}
          <motion.div
            className="w-full flex-1 lg:max-w-xl"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <CodingScene3D />
          </motion.div>
        </div>

        <button
          onClick={() => handleScroll("about")}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-slate-400 transition-colors hover:text-white lg:bottom-8"
          aria-label="Scroll to about"
        >
          <span className="block h-8 w-5 rounded-full border-2 border-slate-500">
            <span className="mx-auto mt-1.5 block h-1.5 w-1 rounded-full bg-slate-400 animate-bounce" />
          </span>
        </button>
      </section>
    </>
  );
}
