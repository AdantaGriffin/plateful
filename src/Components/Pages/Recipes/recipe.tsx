import styles from './recipe.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../Api/api';

function Recipes(){ 
    const {id} = useParams();
    const {recipe, setRecipe} = useApi();
    useEffect(() => {
        async function recipeDetails(){
            if(!id){return};
            try{
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                if(!response.ok){
                    throw new Error('failed to fetch data');
                }
                const result = await response.json();
                console.log(result.meals[0]);
                console.log(id)
                setRecipe(result.meals[0]);
            }
            catch(error){
                console.log(error)
            }
        }
        recipeDetails()
    }, [id]);

   const ingredients = recipe
    ? Array.from({ length: 20 }, (_, index) => {
        const ingredient = recipe[`strIngredient${index + 1}`]?.trim();
        const measurement = recipe[`strMeasure${index + 1}`]?.trim();

        if (!ingredient) return null;

        return {
            ingredient,
            measurement
        };
    }).filter(Boolean)
    : [];
    
    return(
        <>
            <section className={styles.recipes}>
                {recipe ? 
                (
                    <article
                    className={styles.recipeArticle} 
                    key={recipe.strMeal}>
                            <img className={styles.recipeImage} src={`${recipe.strMealThumb}`} height="300px" width="400px" alt={recipe.strMeal}/>
                        <div className={styles.recipeHeader}>
                            <p className={styles.recipeOrigin}>{recipe.strArea || recipe.strCountry}</p>
                            <h3>{recipe.strMeal}</h3>
                        </div>
                        <p>set to favorites</p>

                        <div className={styles.recipeInstructions}>
                            <h3>ingredients</h3>
                            <ul className={styles.recipeList}>
                                {ingredients.map((item, index) => (
                                    <li key={index}>
                                        <p>{item?.ingredient}: {item?.measurement}</p>
                                    </li>
                                ))}
                            </ul>
                            <h3>instructions</h3>
                            <p>{recipe.strInstructions}</p>
                            <h3>video tutorial</h3>
                            <iframe 
                                className={styles.recipeVideo}
                                src={recipe.strYoutube.replace("watch?v=", "embed/")}
                                title={recipe.strMeal} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                >
                            </iframe>
                        </div>

                    </article>
                ) 
                : <p>no recipes selected</p>}
            </section>
        </>
    )
};

export default Recipes;