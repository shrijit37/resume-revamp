import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.API_KEY,
});

const resumeOptimizer = async (prompt, retries = 2) => {
  try {
    const res = await openai.chat.completions.create({
      model: "google/gemini-flash-1.5", // Verify correct model ID for OpenRouter
      messages: [
        {
          role: "system",
          content: "You are an expert in writing resumes using LATEX.",
        },
        {
          role: "user",
          content: prompt, // Ensure `prompt` contains resume content
        },
      ],
    });

    return res.choices[0]?.message?.content || "No response from model";
  } catch (error) {
    console.error("Error in LLM:", error);

    // Handle rate limiting
    if (error.status === 429 && retries > 0) {
      console.log("Rate limited, retrying...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return LLM(prompt, retries - 1);
    }

    // Handle other API errors
    if (error.status && retries > 0) {
      console.log(`API error ${error.status}, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return LLM(prompt, retries - 1);
    }

    throw error;
  }
};

export default resumeOptimizer;