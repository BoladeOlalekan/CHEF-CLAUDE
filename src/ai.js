export async function getRecipeFromAI(ingredients) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/generate-recipe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
    });

    console.log(process.env.REACT_APP_API_URL);
    const result = await response.json();
    if (result.generated_text) {
        return result.generated_text;
    } else if (result.error) {
        return `Error: ${result.error}`;
    }
    return "No recipe found.";
}
