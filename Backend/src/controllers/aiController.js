import { generateResponse } from "../services/aiService.js";

export const chatWithAI = async (req, res) => {
    console.log("AI route hit");
    try {
        console.log(req.body);
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required",
            });
        }

        const reply = await generateResponse(message);

        res.status(200).json({
            reply,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};