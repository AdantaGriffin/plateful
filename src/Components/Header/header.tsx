import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { useApi } from '../Api/api';

function Header(){
    const {darkMode, setDarkMode} = useApi();
    const goDark = () => {
        setDarkMode(prev => !prev)
    }
    return(
        <>
            <section className={darkMode ? styles.header : styles.darkMode}>

                <div className={styles.home}>
                    <img className={styles.homeimage} src={darkMode ? "/icons/menulogolight.svg" : "/icons/menulogodark.svg"} alt="plateful logo"/>
                    <h1 className={styles.homeHeading}>plateful</h1>
                </div>

                <div className={styles.nav}>
                    <ul className={styles.navList}>
                        <Link to="/">
                            <li className={styles.navListLink}>
                                <img className={styles.linkImg} src="/icons/homeicon.svg" alt="home icon"/>
                                <p className={styles.linkText}>Browse</p>
                            </li>
                        </Link>
                        <Link to="/favorites">
                            <li className={styles.navListLink}>
                                <img src="/icons/hearticon.svg" alt="heart icon"/>
                                <p>Favorites</p>
                            </li>
                        </Link>
                        <Link to="/mealplan">
                            <li className={styles.navListLink}>
                                <img src="/icons/calendericon.svg" alt="calender icon"/>
                                <p>Meal Plan</p>
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className={styles.switch}>
                    <button onClick={goDark} className={styles.switchContainer}>
                        <img src="/icons/darkmode.svg" alt="dark mode / light mode switch"/>
                    </button>
                </div>

            </section>
        </>
    )
};

export default Header;