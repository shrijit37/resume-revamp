import getOptimizeResumePrompt from "../prompts/optimizeResumePrompt.js";
import LLM from "./getAtsScoreResume.js"
import resumeOptimizer from "./resumeOptimizer.js";

function cleanLatexDocument(input) {
  // Remove opening ```latex and closing ```
  let cleaned = input.trim();
  
  // Remove opening ```latex (case insensitive)
  if (cleaned.startsWith('```latex')) {
    cleaned = cleaned.substring(8); // Remove '```latex'
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3); // Remove just '```'
  }
  
  // Remove closing ```
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  
  // Trim any remaining whitespace
  return cleaned.trim();
}

const optimizeResume = async(latexCode, jd) => {
    const prompt = getOptimizeResumePrompt(jd, latexCode);
    let res = await resumeOptimizer(prompt);
    console.log("LLM Called");
    console.log(res);
    res = cleanLatexDocument(res);
    return res.replace(/%.*?\n/g, '').replace(/\n/g, '\n');

}



export default optimizeResume;