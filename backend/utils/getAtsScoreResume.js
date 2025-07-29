import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.API_KEY,
});

const LLM = async (prompt, retries = 2) => {
  try {
    const res = await openai.chat.completions.create({
      model: "google/gemini-flash-1.5", // Verify correct model ID for OpenRouter
      messages: [
        {
          role: "system",
          content: "Analyze the resume and provide a structured ATS compatibility report in JSON format.",
        },
        {
          role: "user",
          content: prompt, // Ensure `prompt` contains resume content
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "ats_report",
          schema: {
            type: "object",
            properties: {
              ats_score: { type: "number" },
              overall_assessment: { type: "string" },
              text_extraction: {
                type: "object",
                properties: {
                  readable: { type: "boolean" },
                  quality: { type: "string" },
                  issues: { type: "array", items: { type: "string" } },
                },
                required: ["readable", "quality", "issues"],
                additionalProperties: false,
              },
              structure_analysis: {
                type: "object",
                properties: {
                  has_standard_sections: { type: "boolean" },
                  sections_found: { type: "array", items: { type: "string" } },
                  missing_sections: { type: "array", items: { type: "string" } },
                  formatting_quality: { type: "string" },
                },
                required: ["has_standard_sections", "sections_found", "missing_sections", "formatting_quality"],
                additionalProperties: false,
              },
              keyword_analysis: {
                type: "object",
                properties: {
                  keyword_density: { type: "string" },
                  industry_relevance: { type: "string" },
                  missing_keywords: { type: "array", items: { type: "string" } },
                  top_keywords: { type: "array", items: { type: "string" } },
                },
                required: ["keyword_density", "industry_relevance", "missing_keywords", "top_keywords"],
                additionalProperties: false,
              },
              ats_compatibility: {
                type: "object",
                properties: {
                  problematic_elements: { type: "array", items: { type: "string" } },
                  formatting_issues: { type: "array", items: { type: "string" } },
                  parsing_difficulty: { type: "string" },
                },
                required: ["problematic_elements", "formatting_issues", "parsing_difficulty"],
                additionalProperties: false,
              },
              recommendations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    priority: { type: "string" },
                    category: { type: "string" },
                    issue: { type: "string" },
                    solution: { type: "string" },
                  },
                  required: ["priority", "category", "issue", "solution"],
                  additionalProperties: false,
                },
              },
              strengths: { type: "array", items: { type: "string" } },
              summary: { type: "string" },
            },
            required: [
              "ats_score",
              "overall_assessment",
              "text_extraction",
              "structure_analysis",
              "keyword_analysis",
              "ats_compatibility",
              "recommendations",
              "strengths",
              "summary",
            ],
            additionalProperties: false,
          },
          strict: true,
        },
      },
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

export default LLM;