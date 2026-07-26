import OpenAI from "openai";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY missing in environment variables.");
}

const groq = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

/**
 * Generate technical interview questions
 */
export async function generateInterviewQuestions(
  role: string,
  experience: string,
  topic: string,
  amount: number
): Promise<string[]> {
  const prompt = `
Generate ${amount} technical interview questions.
Role: ${role}
Experience: ${experience}
Topic: ${topic}

Return ONLY a raw JSON array of string questions. No markdown formatting.
Example format:
["Explain React Virtual DOM", "What is useEffect?"]
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = response.choices[0]?.message?.content || "";

  // Remove potential ```json ... ``` wrappers from LLM output
  const cleanedText = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  if (!cleanedText) {
    throw new Error("AI response was empty.");
  }

  return JSON.parse(cleanedText) as string[];
}

/**
 * Evaluate candidate's answer
 */
export async function evaluateAnswer(
  question: string,
  answer: string,
  role: string,
  experience: string
): Promise<{
  score: number;
  strengths: string[];
  improvements: string[];
}> {
  const prompt = `
Evaluate this interview answer.
Role: ${role}
Experience: ${experience}
Question: ${question}
User Answer: ${answer || "No answer provided."}

Return ONLY a raw JSON object without markdown code blocks in this exact format:
{
  "score": 8,
  "strengths": ["Clear explanation"],
  "improvements": ["Add concrete examples"]
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = response.choices[0]?.message?.content || "";

  // Remove potential ```json ... ``` wrappers
  const cleanedText = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  if (!cleanedText) {
    throw new Error("Evaluation failed.");
  }

  return JSON.parse(cleanedText);
}

