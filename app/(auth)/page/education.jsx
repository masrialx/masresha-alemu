import educationData from "./educationData.js";
import SectionHeader from "./SectionHeader";

function Education() {
  return (
    <section className="section-shell bg-slate-50">
      <div className="section-inner max-w-3xl">
        <div id="education">
          <SectionHeader
            label="Education"
            title="Academic Background"
            subtitle="Formal training and continuous learning"
          />
        </div>

        <div className="relative space-y-0">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-rose-300 via-sky-300 to-transparent sm:left-6" />

          {educationData.map((item, index) => (
            <article key={index} className="relative pl-10 sm:pl-14 pb-8 last:pb-0">
              <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-rose-500 shadow sm:left-4.5" />
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-rose-600 border border-rose-100 shadow-sm mb-3">
                {item.date}
              </span>
              <div className="card-modern p-5">
                <h3 className="text-lg font-bold text-slate-900 hover:text-rose-500 transition-colors">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.about}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
