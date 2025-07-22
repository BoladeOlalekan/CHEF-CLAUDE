import Markdown from 'react-markdown'

//SHOW RECIPE
export function ClaudeRecipe(props){
    return (
        <section className="recipeDetails">
            <h2>Chef Bolex Recommends:</h2>
            <Markdown>{props.recipeText}</Markdown>
        </section>
    )
}