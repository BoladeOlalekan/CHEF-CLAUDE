import React from "react"
import {ClaudeRecipe} from "./ClaudeRecipe"
import {IngredientsList} from "./IngredientsList"
import { getRecipeFromAI } from "../ai"

export default function Main(){

    const [ingredientList, setIngredientList] = React.useState([])
    const [recipeText, setRecipeText] = React.useState("")
    const [recipeShown, setRecipeShown] = React.useState(false)

    //ADD INGREDIENT
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")?.trim();

        if (newIngredient) {
            setIngredientList(prevList => [...prevList, newIngredient]);
        }
    }   
    
    //FLIP GET RECIPE STATE
    async function getRecipe(){
        const recipe = await getRecipeFromAI(ingredientList);
        setRecipeText(recipe);
        setRecipeShown(prevState => !prevState);
    }

    return(
        <>
            <main>
                <form action={addIngredient} className="ingredient-form">
                    <input type="text" name="ingredient" id="ingredient" placeholder="e.g Pepper"/>
                    <button>+ Add Ingredient</button>
                </form>

                <IngredientsList
                    ingredientList = {ingredientList}
                    getRecipe = {getRecipe}
                />

                {recipeShown && <ClaudeRecipe
                    recipeText = {recipeText}
                />}
            </main>
        </>
    )
}
