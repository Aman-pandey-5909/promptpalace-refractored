import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const sandboxController = async (req: any, res: any) => {
    const {prompt} = req.body
    const response = await genai.models.generateContent({
        model: "gemini-2.5-flash",
        
        contents: [
            {
                text: prompt
            }
        ]
    })

    return res.status(200).json(response.text);
};