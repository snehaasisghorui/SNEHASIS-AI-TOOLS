const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

const PORT = 3000;


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


app.use(express.json());

app.use(express.static("public"));


app.post("/api/ask", async (req, res) => {

    try {

        const question = req.body.question;

        if (!question) {

            return res.status(400).json({
                error: "Question is required"
            });

        }


        const response = await ai.interactions.create({

            model: "gemini-3.6-flash",

            input: `
You are EduSearch AI.

You are an educational AI assistant.

Explain answers clearly and simply.

If the student asks a programming question,
give examples when useful.

Student question:

${question}
`
        });


        res.json({
            answer: response.output_text
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to get AI response"
        });

    }

});


app.listen(PORT, () => {

    console.log(
        `EduSearch is running at http://localhost:${PORT}`
    );

});