const getAtsWithResumePrompt = (resumeText) => {
   return  `
    ${resumeText}

Please provide a detailed analysis in the following JSON format:


Focus on:
1. Can ATS systems easily extract and parse this text?
2. Are standard resume sections clearly identifiable?
3. Is the content structured in an ATS-friendly way?
4. Are there sufficient relevant keywords?
5. What specific improvements would make this more ATS-compatible?
    `
}

export default getAtsWithResumePrompt;