
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeWithAI = async (requestData) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
      Analyze this HTTP request for cybersecurity threats.

      Request Data:
      ${JSON.stringify(requestData)}
      `,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: Type.OBJECT,

          properties: {
            isThreat: {
              type: Type.BOOLEAN,
            },

            threatType: {
              type: Type.STRING,
enum: [
  "NONE",
  "SQL_INJECTION",
  "XSS_ATTACK",
  "BOT_ACTIVITY",
  "BRUTE_FORCE_ATTACK",
  "PATH_TRAVERSAL",
  "COMMAND_INJECTION",
  "SUSPICIOUS_REQUEST",
],

            },

            confidenceScore: {
              type: Type.NUMBER,
            },

            explanation: {
              type: Type.STRING,
            },
          },

          required: [
            "isThreat",
            "threatType",
            "confidenceScore",
            "explanation",
          ],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.log("AI Threat Analysis Error:", error.message);

    return {
      isThreat: false,
      threatType: "NONE",
      confidenceScore: 0,
      explanation: "AI analysis failed",
    };
  }
};

export default analyzeWithAI;
