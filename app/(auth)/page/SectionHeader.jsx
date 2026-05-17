export default function SectionHeader({ title, subtitle, dark = false, label }) {
  return (
    <header className="text-center mb-8 sm:mb-10">
      {label && (
        <p
          className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2 ${
            dark ? "text-sky-400" : "text-rose-500"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 sm:mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            dark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
