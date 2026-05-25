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
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Groq's updated fast llama model
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq AI Error:", error);
    return "Other";
  }
}
