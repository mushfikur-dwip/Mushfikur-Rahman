import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from .env (Vite project)
const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const generateCV = async (userInput) => {
  const prompt = `
You are a resume expert AI.
Return ONLY valid JSON based on this input — no explanation or text outside JSON.

Format:
{
  "name": "",
  "title": "",
  "location": "",
  "imageUrl": "",
  "links": {
    "email": "",
    "phone": "",
    "github": "",
    "linkedin": "",
    "twitter": ""
  },
  "about": "",
  "experience": [
    {
      "title": "",
      "company": "",
      "location": "",
      "years": "",
      "description": ""
    }
  ],
  "education": {
    "degree": "",
    "institution": "",
    "year": ""
  }
}

Now generate JSON for this person:
"""${userInput}"""
`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const textOutput = await result.response.text();

    console.log("🧠 AI Raw Output:\n", textOutput);

    // Slice only the JSON part
    const jsonStart = textOutput.indexOf("{");
    const jsonEnd = textOutput.lastIndexOf("}") + 1;
    const jsonString = textOutput.slice(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (err) {
    console.error("❌ Gemini SDK error:", err);
    return null;
  }
};

export default generateCV;
