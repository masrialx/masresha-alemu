"use client";

export default function Recommendations() {
  return (
    <section id="recommendations" className="bg-white py-16 px-4 min-h-screen flex items-center">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-600">
            Recommendations
          </h2>
          <p className="text-lg text-gray-600 font-semibold">What industry professionals say about my work</p>
        </div>

        {/* Recommendation Card */}
        <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 rounded-2xl shadow-xl p-8 md:p-10 border-4 border-blue-600 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-xl ring-4 ring-blue-400">
                  DT
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-2 shadow-lg ring-2 ring-white">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 w-full">
              {/* Header Info */}
              <div className="mb-5 pb-5 border-b-2 border-blue-500">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Dagnachew Tsegaye
                </h3>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-3 py-1.5 rounded-lg text-sm font-bold bg-blue-600 text-white shadow-md border-2 border-blue-400">
                    Senior Software Engineer
                  </span>
                  <span className="text-blue-300 font-bold">•</span>
                  <span className="text-base font-bold text-blue-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    Microsoft
                  </span>
                </div>
                <p className="text-sm font-bold text-blue-300">
                  July 27, 2025 • Direct Manager
                </p>
              </div>

              {/* Quote */}
              <div className="mb-6 relative">
                <div className="absolute -top-1 -left-1 text-blue-400 text-4xl font-serif leading-none opacity-50">"</div>
                <p className="text-base md:text-lg text-gray-200 leading-relaxed font-bold relative z-10 pl-5">
                  Masresha Alemu is a highly skilled full-stack developer with deep expertise in the MERN stack and Python frameworks like FastAPI, Django, and Flask. He also brings strong AI/ML integration skills, making him a rare all-rounder. His work ethic, reliability, and problem-solving mindset consistently stand out. A valuable asset to any team.
                </p>
                <div className="absolute -bottom-1 -right-1 text-blue-400 text-4xl font-serif leading-none rotate-180 opacity-50">"</div>
              </div>

              {/* Footer Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors duration-200">
                  ✓ Verified Recommendation
                </span>
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-blue-500 text-white shadow-md border-2 border-blue-400 hover:bg-blue-600 transition-colors duration-200">
                  🔗 LinkedIn Endorsed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
