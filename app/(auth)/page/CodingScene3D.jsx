"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CODE_SNIPPETS = [
  `async function deployAgent() {
  const mcp = await connect();
  const agent = orchestrate(mcp);
  return agent.run(pipeline);
}`,
  `export class AlphaMailAI {
  constructor(llm, tools) {
    this.llm = llm;
    this.tools = tools;
  }
  async handleInbox() {
    return this.llm.reason(ctx);
  }
}`,
  `const buildSaaS = async () => {
  await api.integrate("hubspot");
  await vectorDB.embed(docs);
  return workflow.execute();
}`,
];

export default function CodingScene3D() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const lines = CODE_SNIPPETS[snippetIndex].split("\n");

  useEffect(() => {
    if (visibleLines >= lines.length) {
      const pause = setTimeout(() => {
        setSnippetIndex((i) => (i + 1) % CODE_SNIPPETS.length);
        setVisibleLines(0);
      }, 1600);
      return () => clearTimeout(pause);
    }
    const tick = setTimeout(() => setVisibleLines((v) => v + 1), 380);
    return () => clearTimeout(tick);
  }, [visibleLines, lines.length, snippetIndex]);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="scene-3d-wrap relative mx-auto h-[280px] w-full max-w-md sm:h-[340px] lg:h-[420px] lg:max-w-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/20 via-transparent to-sky-500/25 blur-2xl"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="scene-3d-stage relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="scene-floor absolute bottom-8 left-1/2 h-32 w-[90%] -translate-x-1/2 rounded-full bg-gradient-to-t from-sky-500/15 to-transparent blur-md" />

        <DeveloperFigure />

        {/* Desk */}
        <div
          className="scene-desk absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
          style={{ transform: "translateZ(24px)" }}
        >
          <div className="relative h-4 w-56 rounded-sm bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg sm:w-64">
            <motion.div
              className="absolute -top-1 left-2 right-2 h-1 rounded-full bg-sky-400/50"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="absolute -bottom-8 left-4 h-8 w-2 rounded-b bg-slate-700" />
          <div className="absolute -bottom-8 right-4 h-8 w-2 rounded-b bg-slate-700" />
          <div className="absolute -bottom-8 left-1/2 h-8 w-2 -translate-x-1/2 rounded-b bg-slate-700" />

          {/* Keyboard */}
          <div
            className="absolute -top-3 left-1/2 h-2.5 w-28 -translate-x-1/2 rounded bg-slate-800 shadow-inner"
            style={{ transform: "translateZ(10px) rotateX(-10deg)" }}
          >
            <div className="flex justify-center gap-0.5 pt-0.5">
              {[...Array(10)].map((_, i) => (
                <motion.span
                  key={i}
                  className="h-0.5 w-1 rounded-sm bg-slate-500"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 0.5, delay: i * 0.06, repeat: Infinity }}
                />
              ))}
            </div>
          </div>

          {/* Monitor */}
          <div
            className="absolute -top-[7.5rem] left-1/2 -translate-x-1/2 sm:-top-[8.5rem]"
            style={{ transform: "translateZ(36px)" }}
          >
            <div className="mx-auto h-7 w-3 rounded-b bg-slate-600" />
            <div className="mx-auto -mt-0.5 h-1 w-14 rounded-full bg-slate-500" />

            <div className="relative mt-1 w-44 overflow-hidden rounded-lg border-2 border-slate-600 bg-slate-950 shadow-2xl shadow-sky-500/30 sm:w-52">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-sky-500/15 to-rose-500/10"
                animate={{ opacity: [0.35, 0.85, 0.35] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative p-2.5 font-mono text-[9px] leading-relaxed sm:text-[10px]">
                <div className="mb-1.5 flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500/90" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/90" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
                </div>
                <pre className="text-left">
                  {lines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={`${snippetIndex}-${i}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sky-300/95"
                    >
                      <span className="mr-2 select-none text-slate-600">
                        {String(i + 1).padStart(2, " ")}
                      </span>
                      {highlightSyntax(line)}
                    </motion.div>
                  ))}
                  <motion.span
                    className="ml-6 inline-block h-3 w-1.5 bg-sky-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.75, repeat: Infinity }}
                  />
                </pre>
              </div>
            </div>
          </div>
        </div>

        {["const", "async", "AI", "MCP", "</>", "{}"].map((word, i) => (
          <motion.span
            key={word}
            className="scene-particle absolute font-mono text-[10px] font-bold text-sky-400/50"
            style={{
              left: `${12 + i * 13}%`,
              top: `${8 + (i % 3) * 20}%`,
              transform: `translateZ(${50 + i * 12}px)`,
            }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 3.2 + i * 0.35, repeat: Infinity, delay: i * 0.25 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

function DeveloperFigure() {
  const id = useId().replace(/:/g, "");
  return (
    <div
      className="scene-dev absolute bottom-[3.5rem] left-1/2 z-0 -translate-x-1/2"
      style={{ transform: "translateZ(4px)" }}
    >
      <motion.svg
        viewBox="0 0 160 180"
        className="h-[9.5rem] w-[8.5rem] drop-shadow-2xl sm:h-[11rem] sm:w-[10rem]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <defs>
          <linearGradient id={`${id}-hoodie`} x1="80" y1="52" x2="80" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5b6b82" />
            <stop offset="0.45" stopColor="#475569" />
            <stop offset="1" stopColor="#2d3748" />
          </linearGradient>
          <linearGradient id={`${id}-hair`} x1="80" y1="28" x2="80" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id={`${id}-skin`} x1="80" y1="38" x2="80" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d4a574" />
            <stop offset="1" stopColor="#b8956a" />
          </linearGradient>
          <linearGradient id={`${id}-chair`} x1="80" y1="118" x2="80" y2="168" gradientUnits="userSpaceOnUse">
            <stop stopColor="#475569" />
            <stop offset="1" stopColor="#1e293b" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Chair */}
        <ellipse cx="80" cy="172" rx="46" ry="7" fill="#0f172a" opacity="0.35" />
        <path
          d="M42 118 C42 118 38 155 48 162 L112 162 C122 155 118 118 118 118 L108 108 L52 108 Z"
          fill={`url(#${id}-chair)`}
        />
        <path d="M52 108 L108 108 L102 98 L58 98 Z" fill="#334155" opacity="0.6" />

        {/* Torso / hoodie (back view) */}
        <motion.g
          animate={{ scaleY: [1, 1.015, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "80px 95px" }}
        >
          <path
            d="M80 52 C62 52 50 62 48 78 L44 118 C44 128 52 132 80 132 C108 132 116 128 116 118 L112 78 C110 62 98 52 80 52 Z"
            fill={`url(#${id}-hoodie)`}
          />
          {/* Hood outline */}
          <path
            d="M80 52 C68 52 58 58 54 68 L52 78 C58 72 68 68 80 68 C92 68 102 72 108 78 L106 68 C102 58 92 52 80 52 Z"
            fill="#334155"
            opacity="0.35"
          />
          {/* Accent stripe */}
          <path d="M80 78 L80 118" stroke="#f43f5e" strokeWidth="2" opacity="0.35" strokeLinecap="round" />
        </motion.g>

        {/* Neck */}
        <rect x="74" y="48" width="12" height="8" rx="3" fill={`url(#${id}-skin)`} />

        {/* Head + hair (back of head) */}
        <motion.g
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="80" cy="42" rx="17" ry="18" fill={`url(#${id}-skin)`} />
          <path
            d="M62 40 C62 18 72 10 80 10 C88 10 98 18 98 40 C98 32 93 26 80 26 C67 26 62 32 62 40 Z"
            fill={`url(#${id}-hair)`}
          />
          <path
            d="M68 36 C70 28 75 24 80 24 C85 24 90 28 92 36"
            fill="#0f172a"
            opacity="0.15"
          />
          <path
            d="M64 40 C66 32 72 28 80 28 C88 28 94 32 96 40"
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.25"
          />
        </motion.g>

        {/* Headphones */}
        <path
          d="M58 40 Q58 28 80 26 Q102 28 102 40"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="54" y="38" width="7" height="12" rx="3" fill="#475569" />
        <rect x="99" y="38" width="7" height="12" rx="3" fill="#475569" />

        {/* Left arm — typing */}
        <motion.g
          style={{ transformOrigin: "52px 88px" }}
          animate={{ rotate: [-4, 2, -4] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M48 78 C38 82 28 92 26 102 C26 106 30 108 34 106 C40 100 46 94 52 90"
            fill={`url(#${id}-hoodie)`}
            stroke="#334155"
            strokeWidth="0.5"
          />
          <ellipse cx="32" cy="106" rx="6" ry="4" fill={`url(#${id}-skin)`} transform="rotate(-15 32 106)" />
        </motion.g>

        {/* Right arm — typing */}
        <motion.g
          style={{ transformOrigin: "108px 88px" }}
          animate={{ rotate: [4, -2, 4] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        >
          <path
            d="M112 78 C122 82 132 92 134 102 C134 106 130 108 126 106 C120 100 114 94 108 90"
            fill={`url(#${id}-hoodie)`}
            stroke="#334155"
            strokeWidth="0.5"
          />
          <ellipse cx="128" cy="106" rx="6" ry="4" fill={`url(#${id}-skin)`} transform="rotate(15 128 106)" />
        </motion.g>

        {/* Monitor glow on shoulders */}
        <ellipse cx="80" cy="72" rx="28" ry="8" fill="#38bdf8" opacity="0.08" filter={`url(#${id}-glow)`} />
      </motion.svg>
    </div>
  );
}

function highlightSyntax(line) {
  const parts = [];
  const keywords = /\b(async|function|const|return|await|export|class|constructor|this|new)\b/g;
  let last = 0;
  let match;
  while ((match = keywords.exec(line)) !== null) {
    if (match.index > last) {
      parts.push(
        <span key={`t-${last}`} className="text-slate-300">
          {line.slice(last, match.index)}
        </span>
      );
    }
    parts.push(
      <span key={`k-${match.index}`} className="text-rose-400">
        {match[0]}
      </span>
    );
    last = match.index + match[0].length;
  }
  if (last < line.length) {
    parts.push(
      <span key={`t-${last}`} className="text-slate-300">
        {line.slice(last)}
      </span>
    );
  }
  return parts.length ? parts : <span className="text-slate-300">{line}</span>;
}
