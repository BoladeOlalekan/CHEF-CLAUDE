import React from "react"
import { ClaudeRecipe } from "./ClaudeRecipe"
import { IngredientsList } from "./IngredientsList"
import { getRecipeFromAI } from "../ai"

export default function Main() {

    const [ingredientList, setIngredientList] = React.useState([])
    const [recipeText, setRecipeText] = React.useState("")
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    //ADD INGREDIENT
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")?.trim();

        if (newIngredient) {
            setIngredientList(prevList => [...prevList, newIngredient]);
        }
    }

    //FLIP GET RECIPE STATE
    async function getRecipe() {
        console.log("API URL:", import.meta.env.VITE_API_URL);
        setLoading(true);
        const recipe = await getRecipeFromAI(ingredientList);
        setRecipeText(recipe);
        setRecipeShown(prevState => !prevState);
        setLoading(false);
    }

    return (
        <>
            <main>
                <form action={addIngredient} className="ingredient-form">
                    <input type="text" name="ingredient" id="ingredient" placeholder="e.g Pepper" />
                    <button>+ Add Ingredient</button>
                </form>

                <IngredientsList
                    ingredientList={ingredientList}
                    getRecipe={getRecipe}
                />

                {loading ? (
                    <div className="overlay">
                        <div className="loader-container">
                            <div className="spinner"></div>
                            <p>🍳 Cooking up something delicious...</p>
                        </div>
                    </div>
                ) : (
                    recipeShown && <ClaudeRecipe recipeText={recipeText} />
                )}
            </main>
        </>
    )
}
