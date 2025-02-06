"use client"; // <-- Add this at the top
import { useState, useEffect, useRef } from "react";

export default function SkillList() {
  const skills = [
    { name: "HTML", percent: 90 },
    { name: "CSS", percent: 85 },
    { name: "JavaScript", percent: 80 },
    { name: "React.js", percent: 75 },
    { name: "Next.js", percent: 70 },
    { name: "Python", percent: 80 },
    { name: "Django", percent: 70 },
    { name: "Flask", percent: 65 },
    { name: "Express", percent: 60 },
    { name: "Node.js", percent: 65 },
    { name: "MongoDB", percent: 60 },
    { name: "PostgreSQL", percent: 50 },
    { name: "Oracle SQL", percent: 55 },
    { name: "Penetration Testing", percent: 40 },
    { name: "AI Chatbot", percent: 60 },
    { name: "Machine Learning", percent: 50 },
    { name: "Automation", percent: 65 },
    { name: "React Native", percent: 70 }, // Added React Native to skills list
  ];

  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Detect when the section comes into view on scroll
  useEffect(() => {
    const onScroll = () => {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop <= windowHeight * 0.8) {
        setInView(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="container mx-auto p-6" ref={sectionRef}>
      <h1 className="text-center text-3xl font-bold mb-6">My Skills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="w-full">
            <h3 className="text-xl font-medium mb-2">{skill.name}</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-sm">
                  {inView ? skill.percent : 0}%
                </span>
              </div>
              <div className="flex mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    style={{
                      width: inView ? `${skill.percent}%` : "0%",
                      transition: "width 3s ease-in-out", // Slower transition here
                    }}
                    className="h-2.5 rounded-full bg-blue-600"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
