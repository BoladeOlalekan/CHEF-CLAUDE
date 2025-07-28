import React from "react"
import { ClaudeRecipe } from "./ClaudeRecipe"
import { IngredientsList } from "./IngredientsList"
import { getRecipeFromAI } from "../ai"

export default function Main() {

    const [ingredientList, setIngredientList] = React.useState(
        ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
    )
    const [recipeText, setRecipeText] = React.useState("")
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const recipeSection = React.useRef(null)

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

    React.useEffect(() => {
        if(recipeText !== '' && recipeSection.current !== null){
            recipeSection.current.scrollIntoView({behavior: "smooth"});
        }
    },[recipeText])

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
                    ref={recipeSection}
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
