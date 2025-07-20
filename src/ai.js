export async function getRecipeFromAI(ingredients) {
    const response = await fetch("http://localhost:3001/api/generate-recipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
    });

    const result = await response.json();
    if (result.generated_text) {
        return result.generated_text;
    } else if (result.error) {
        return `Error: ${result.error}`;
    }
    return "No recipe found.";
}
