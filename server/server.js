const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
console.log("Loaded API key:", process.env.CHEF_CLAUDE_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-recipe", async (req, res) => {
    const ingredients = req.body.ingredients;
    console.log("Received ingredients:", ingredients);

    if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: "Invalid ingredients format" });
    }

    const prompt = `You are a culinary assistant. Given the following list of ingredients: ${ingredients.join(", ")}. Generate at least 3 well-structured and complete recipe.
        You can start by saying "Based on the ingredients you have, i would recommend" then the names of the recipes generated.
        Also, when giving the name of the recipe, you do not need to include "Recipe 1 or Recipe 2 or even just Recipe", just the name of the recipe.
        The recipe should include:
        1. A suitable title based on the main ingredients in an h2 markdown.
        2. Recommended **measurements** for each ingredient.
        3. A full **ingredients list** including quantities and any common additions (e.g. water, oil, salt).
        4. A clear, step-by-step **cooking process**, written with care and precision.
        5. Estimated **prep time**, **cook time**, and **servings**.
        6. Optionally, include serving suggestions or pairing ideas.
        Ensure to format your response in markdown.
    `;

    console.log("Prompt:", prompt);

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful chef assistant." },
                    { role: "user", content: prompt }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.CHEF_CLAUDE_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const aiMessage = response.data?.choices?.[0]?.message?.content;
        if (!aiMessage) {
            throw new Error("No AI response received");
        }

        res.json({ generated_text: aiMessage });
        console.log(aiMessage)

    } catch (error) {
        console.error("OpenRouter API error:", error.response?.data || error.message, error.stack);
        res.status(500).json({
            error: "Failed to generate recipe",
            details: error.response?.data || error.message
        });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
