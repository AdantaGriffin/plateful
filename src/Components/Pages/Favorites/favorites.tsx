import styles from './favorites.module.scss';
import { Link } from 'react-router-dom';
import { useApi } from '../../Api/api';
import { useParams } from 'react-router-dom';

function Favorites(){
    const {id} = useParams();
    const {favorites} = useApi();

    return(
        <>
            <section className={styles.favorites}>

                <header className={styles.favoritesHeader}>
                    <h2>Your favorites</h2>
                    <p>Recipes you saved for later</p>
                </header>

                <div className={styles.favoritesDisplay}>
                    {favorites.length > 0 ? favorites.map(x => (
                        <Link
                        className={styles.favoritesItem}
                        to={`/${x.idMeal}`} 
                        key={x.idMeal}>
                            <article className={styles.favoritesArticle}>
                                <img
                                src={`${x.strMealThumb}`} 
                                alt={x.strMeal}/>
                                <p>{x.strMeal}</p>
                            </article>
                        </Link>
                    )) : 
                    (
                        <div className={styles.noFavoritesData}>
                            <img src="/icons/hearticon.svg" alt="image of favorites heart icon" />
                            <p>No favorites yet - start collecting recipes you love.</p>
                            <Link to="/">Browse Recipes</Link>
                        </div>
                    )}
                    
                </div>

            </section>
        </>
    )
};

export default Favorites;