"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-dark py-10 text-slate-400">
      <div className="section-inner text-center">
        <p className="text-sm font-semibold text-white">
          © {year} Masresha Alemu
        </p>
        <p className="mt-2 text-xs sm:text-sm">
          Full Stack &amp; AI Engineer · Building SaaS, agents &amp; automation
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="mailto:masrialemu@gmail.com" className="transition-colors hover:text-sky-400">
            masrialemu@gmail.com
          </a>
          <span className="hidden sm:inline text-slate-600">|</span>
          <a href="tel:+251979745762" className="transition-colors hover:text-sky-400">
            +251 979 745 762
          </a>
        </div>
      </div>
    </footer>
  );
}
