import React from 'react'

function AnalysesSteps() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-2xl space-y-10 animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-wide hover:text-indigo-600 transition-colors duration-500 ease-in-out drop-shadow-lg">
        Resume Analysis Overview
      </h1>

      <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
        Our resume analysis focuses on assessing the document’s compatibility with Applicant Tracking Systems (ATS), keyword relevance, structure, and overall clarity. This helps ensure your resume can be easily parsed and ranks well for your target roles.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <section className="flex-1 bg-indigo-50/60 rounded-xl p-6 shadow hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4 hover:text-indigo-500 transition-colors duration-300 cursor-pointer">
            Key Areas of Analysis
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-4">
            <li className="transition hover:translate-x-2 duration-200">
              <span className="font-semibold">ATS Compatibility:</span> We check for formatting consistency, use of standard characters, and layout for ATS readability.
            </li>
            <li className="transition hover:translate-x-2 duration-200">
              <span className="font-semibold">Keyword Analysis:</span> Verifies relevant industry keywords and their density for passing filters.
            </li>
            <li className="transition hover:translate-x-2 duration-200">
              <span className="font-semibold">Structural Review:</span> Ensures sections are clear, well-organized, and achievements are highlighted with bullet points.
            </li>
            <li className="transition hover:translate-x-2 duration-200">
              <span className="font-semibold">Content Recommendations:</span> Guidance on quantifying achievements and improving clarity.
            </li>
          </ul>
        </section>

        <section className="flex-1 bg-gradient-to-tr from-violet-100 to-blue-100 rounded-xl p-6 shadow hover:shadow-xl transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4 hover:text-indigo-500 transition-colors duration-300 cursor-pointer">
            Why This Matters
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Many employers rely on ATS software to screen resumes before a human ever reviews them. Inconsistent formatting, non-standard symbols, or missing keywords can cause your resume to be rejected automatically, even if you’re highly qualified.
          </p>
        </section>
      </div>

      <section className="bg-gradient-to-tr from-white via-indigo-50 to-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-semibold text-indigo-900 mb-4 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
          Our Approach
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We pinpoint improvements like replacing unusual symbols with standard bullets, adding must-have keywords ("Agile", "Version Control"), and restructuring project descriptions into sharp bullet points. We also suggest quantifying results to help your achievements shine.
        </p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-semibold text-indigo-900 mb-4 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
          Final Goal
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          The goal: A resume that's ATS-friendly and recruiter-compelling—giving you the best shot to score interviews and career growth.
        </p>
      </section>
    </div>
  )
}

export default AnalysesSteps
