export function IngredientsList(props){
    const ingredientsListItems = props.ingredientList.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return (
        <section className="ingredient-sect">
            {props.ingredientList.length > 0 && (
                <>
                    <h2>Ingredients on hand <span>(At least 4 ingredients.)</span></h2>
                    <ul className="ingredients-list">{ingredientsListItems}</ul>
                </>
            )}

            {props.ingredientList.length > 2 && (
                <div className="getRecipeContainer">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            )}
        </section>
    )
}
