// import 'dotenv/config'

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function categorize(data) {
  const prompt = `
You are an automated categorization engine. Analyze the following content. 
Return a strict JSON object containing a short 1-sentence summary and an array of 3-5 highly relevant tags. 
Do not return markdown formatting, just raw JSON.
Input:
${data}
`;
  try {
    // 5-second timeout for the AI call to prevent hanging the entire POST request
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("AI generation timed out")), 5000)
    );

    const completionPromise = groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const completion = await Promise.race([completionPromise, timeoutPromise]);
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq AI Error or Timeout:", error);
    // Return a valid JSON fallback so the parser in route.js succeeds instantly
    return JSON.stringify({
      summary: "A saved memory drop.",
      tags: ["inbox"]
    });
  }
}
