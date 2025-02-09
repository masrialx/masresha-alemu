"use client"; // <-- Add this at the top
import { useState, useEffect, useRef } from "react";

export default function SkillList() {
  const skills = [
    { name: "HTML", percent: 95 },
    { name: "CSS", percent: 90 },
    { name: "JavaScript", percent: 85 },
    { name: "React.js", percent: 85 },
    { name: "Next.js", percent: 80 },
    { name: "Python", percent: 80 },
    { name: "Django", percent: 83 },
    { name: "Flask", percent: 87 },
    { name: "Express", percent: 90 },
    { name: "Node.js", percent: 90 },
    { name: "MongoDB", percent: 95 },
    { name: "PostgreSQL", percent: 95 },
    { name: "Oracle SQL", percent: 95 },
    { name: "Penetration Testing", percent: 70 },
    { name: "AI Chatbot", percent: 80 },
    { name: "Machine Learning", percent: 70 },
    { name: "Automation", percent: 75 },
    { name: "React Native", percent: 70 },
  ];

  const [inView, setInView] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false); // State to toggle skill visibility
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

  const visibleSkills = showAllSkills ? skills : skills.slice(0, 6); // Show 6 skills initially or all skills if toggled

  return (
    <div id="skills"  key={2} className="container mx-auto p-6" ref={sectionRef}>
      <h1 className="text-center text-2xl sm:text-3xl font-semibold mb-6">My Skills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleSkills.map((skill, index) => (
          <div key={index} className="w-full bg-white shadow-md rounded-lg p-4 transform transition-transform hover:scale-105">
            <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between text-sm text-gray-600">
                <span>{inView ? skill.percent : 0}%</span>
              </div>
              <div className="flex mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    style={{
                      width: inView ? `${skill.percent}%` : "0%",
                      transition: "width 1s ease-in-out", // Faster transition here
                    }}
                    className="h-1.5 rounded-full bg-blue-600"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle button for "See More" / "See Less" */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowAllSkills(!showAllSkills)}
          className="text-blue-600 hover:underline focus:outline-none"
        >
          {showAllSkills ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
}
