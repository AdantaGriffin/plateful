import styles from './browse.module.scss';
import { Link } from 'react-router-dom';
import { useApi } from '../../Api/api';
import { useParams } from 'react-router-dom';


function Browse(){
    const {id} = useParams();
    const {categories, selectedCategory, setSelectedCategory, displayCategory, setFilterDisplay, userList, setFavorites} = useApi();
    //console.log(filterDisplay)

    const displayAfterFilter = userList?.length > 0 ? displayCategory.filter(meal => userList.some(userMeal => userMeal.idMeal === meal.idMeal)) : displayCategory;
    //console.log(displayCategory);
    //console.log(displayAfterFilter)
    return(
        <>
            <section className={styles.browse}>

                <header className={styles.browseHeader}>
                    <h2>Discover your next meal</h2>
                    <p>Search thousands of recipes by ingredient or name, then filter to your taste.</p>
                </header>

                <form className={styles.browseForm}>

                    <div className={styles.formSection1}>

                        <div className={styles.formSearchContainer}>
                            <img className={styles.formSearchIcon} src="/icons/searchicon.svg" height="20px" alt="search icon"/>
                            <input 
                            className={styles.formSearch}
                            placeholder="filter search by country or region" 
                            type="text"
                            onChange={(e) => setFilterDisplay(e.target.value)}
                            />
                        </div>

                        <div className={styles.filterSliderContainer}>
                            <p className={styles.filterSliderChoice}>name</p>
                            <p className={styles.filterSliderChoice}>ingredient</p>
                        </div>

                    </div>

                    <div className={styles.formSection2}>
                        <div className={styles.formSection2Div}>
                            <h3>Cuisine: </h3>
                            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className={styles.select}>
                                    <option>select a category</option>
                                {categories?.map(x => (
                                    <option key={x.idCategory} value={x.strCategory}>{x.strCategory}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.formSection3}>
                        clear filter
                    </div>

                </form>

                <div className={styles.browseDisplay}>

                    <div>
                        <p>{displayAfterFilter ? displayAfterFilter?.length || displayCategory?.length : 0} recipes found</p>
                    </div>

                    <div className={styles.recipeCardListContainer}>

                        <ul className={styles.recipeCardList}>
                            {displayAfterFilter?.map(x => (
                                <li
                                key={x.idMeal}
                                className={styles.recipeCardListItem}
                                >
                                    <article className={styles.recipeArticle}>
                                        <div style={{backgroundImage: `url(${x.strMealThumb})`}} className={styles.recipeArticleImage}>
                                            <div className={styles.recipeBanner}>
                                                <p className={styles.recipeArea}>{x.strArea ? x.strArea : x.strCountry}</p>
                                                <button
                                                onClick={() => setFavorites(prev => [...prev, x])}
                                                 className={styles.recipeFav}>
                                                    <img src="/icons/hearticon.svg"/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.recipeArticleHeading}>
                                            <Link to={`${x.idMeal}`}><h3>{x.strMeal}</h3></Link>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </section>
        </>
    )
};

export default Browse;