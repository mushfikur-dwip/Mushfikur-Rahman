import { GoogleGenerativeAI } from "@google/generative-ai";
const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const generateCV = async (userInput) => {
  const prompt = `
You are a resume expert AI. user your best Try to extract structured information from the following input and return it as valid JSONb format.
You will receive a text input that contains various details about a person, including their name, title, location, contact links, about section, experience, and education. Your task is to parse this information and return it in the specified JSONb format.
Always replay in English and even if  the input is in another language, you should still return the output in English.
Here is the input format you should follow:
Return ONLY valid JSONb  based on this input — no explanation or text outside JSON.
 
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
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

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
