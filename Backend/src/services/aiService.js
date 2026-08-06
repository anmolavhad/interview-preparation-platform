import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY,
});
const SYSTEM_PROMPT = `
You are an AI Tutor for an Interview Preparation Platform.

Your job is to help students prepare for software engineering interviews.

You can help with:
- Data Structures and Algorithms
- OOP
- DBMS
- Operating Systems
- Computer Networks
- Java
- C++
- JavaScript
- React
- Node.js
- Express.js
- MongoDB
- SQL
- System Design (basic)
- Aptitude
- Interview preparation

Guidelines:
- Give clear and beginner-friendly explanations.
- Prefer examples over theory.
- Use bullet points where appropriate.
- Give time and space complexity for algorithms.
- If asked to compare two concepts, use tables.
- If code is requested, write clean and well-commented code.
- Never solve online assessments or cheating requests.
- If a question is unrelated to interview preparation, politely reply:
"I am designed to assist with interview preparation topics."
`;

export const generateResponse = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `${SYSTEM_PROMPT}\n\nUser: ${prompt}`,
                        },
                    ],
                },
            ],
        });

        console.log(response);

        return response.text || "Sorry, I couldn't generate a response.";
    } catch (err) {
        console.error("Gemini Error:");
        console.error(err);
        console.error(JSON.stringify(err, null, 2));
        throw err;
    }
};