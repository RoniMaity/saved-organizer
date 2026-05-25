// import 'dotenv/config'

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function categorize(data) {
const prompt = `
You will be given Instagram post data in this exact format:
[
  [ "caption string here" ],
  [ "hashtag1", "hashtag2", ... ]
]
Your task:
Determine the single most accurate topic category that best represents the post using both the caption and hashtags.
Output Rules:
Output only one category
Must be a single word or short phrase
Example categories:
Food, Travel, Fitness, Motivation, Fashion, Pets, Technology, Business, Nature, Sports, Art, Coding, Quotes, Lifestyle
Do NOT provide explanations
Do NOT output more than one category
Input:
${data}
Output:
Only the category name.
`;
  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // Groq's fast llama model
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq AI Error:", error);
    return "Other";
  }
}
