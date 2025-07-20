export async function getRecipeFromAI(ingredients) {
    const response = await fetch("https://chef-claude-ow6t.onrender.com", {
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
