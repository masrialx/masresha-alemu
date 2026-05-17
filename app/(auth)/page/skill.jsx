"use client";

import SectionHeader from "./SectionHeader";

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["JavaScript / TypeScript", "Python", "Go", "Java", "Rust / C++"],
  },
  {
    title: "Web & Backend",
    items: ["React / Next.js", "Node.js / Express", "Django / Flask", "React Native", "API Design"],
  },
  {
    title: "AI & Agents",
    items: [
      "LLM & AI Agents",
      "OpenClaw",
      "MCP",
      "Browser Automation",
      "UI / Multimodal Agents",
      "Trading Automation",
      "Workflow Orchestration",
    ],
  },
  {
    title: "Data & DevOps",
    items: ["PostgreSQL / MongoDB", "Vector DBs", "Machine Learning", "DevOps / CI/CD"],
  },
];

export default function SkillList() {
  return (
    <section id="skills" className="section-shell bg-slate-50">
      <div className="section-inner max-w-4xl">
        <SectionHeader
          label="Expertise"
          title="Skills"
          subtitle="Full stack development with modern AI agent tooling"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILL_GROUPS.map((group) => (
            <article key={group.title} className="card-modern p-4 sm:p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-3">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="inline-block rounded-lg bg-slate-50 px-2.5 py-1 text-xs sm:text-sm text-slate-700 border border-slate-100">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
