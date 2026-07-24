import styles from './mealPlan.module.scss';
import { Link } from 'react-router-dom';

function MealPlan(){
    return(
        <>
            <section className={styles.mealPlan}>

                <header className={styles.mealPlanHeader}>
                    <h2>Meal Planner</h2>
                    <p>Plan your week with saved favorite recipes</p>
                </header>

                <div className={styles.mealPlanDisplay}>
                    <div className={styles.noMealPlanData}>
                        <img src="/icons/meals.svg" alt="image of favorites heart icon" />
                        <p>Save recipes to your favorites first, then assign them to a meal slot here.</p>
                        <Link to="/">Browse Recipes</Link>
                    </div>
                </div>

            </section>
        </>
    )
};

export default MealPlan;