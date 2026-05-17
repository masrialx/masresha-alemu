"use client";

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
    <section id="skills" className="w-full bg-white py-8 sm:py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Skills</h2>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            Full stack development with modern AI agent tooling
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {SKILL_GROUPS.map((group) => (
            <article
              key={group.title}
              className="rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-3 sm:px-4 sm:py-3.5"
            >
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-red-600 mb-2">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="inline-block rounded-md bg-white px-2 py-1 text-xs sm:text-sm text-gray-800 border border-gray-200 shadow-sm">
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
