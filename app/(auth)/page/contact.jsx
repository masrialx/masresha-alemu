"use client";

import {
  FaLinkedin,
  FaGithub,
  FaTelegram,
  FaPhoneAlt,
  FaEnvelope,
  FaLaptopCode,
} from "react-icons/fa";
import SectionHeader from "./SectionHeader";

const contactInfo = [
  { icon: FaLinkedin, link: "https://www.linkedin.com/in/masresha-a-851241232/", label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
  { icon: FaGithub, link: "https://github.com/masrialemu", label: "GitHub", color: "hover:bg-slate-800" },
  { icon: FaGithub, link: "https://github.com/masrialx", label: "GitHub 2", color: "hover:bg-slate-800" },
  { icon: FaTelegram, link: "https://t.me/Masri404", label: "Telegram", color: "hover:bg-sky-500" },
  { icon: FaPhoneAlt, link: "tel:+251979745762", label: "Phone", color: "hover:bg-emerald-600" },
  { icon: FaLaptopCode, link: "https://leetcode.com/u/masrialemu/", label: "LeetCode", color: "hover:bg-amber-500" },
  { icon: FaEnvelope, link: "mailto:masrialemu@gmail.com", label: "Email", color: "hover:bg-rose-500" },
];

export default function Contact() {
  return (
    <section className="section-shell bg-white py-10 sm:py-12">
      <div className="section-inner max-w-3xl">
        <SectionHeader label="Connect" title="Find Me Online" subtitle="Reach out on your preferred platform" />
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                title={item.label}
                className={`group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-lg ${item.color}`}
              >
                <Icon size={22} />
                <span className="text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-70 sm:group-hover:opacity-100">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
