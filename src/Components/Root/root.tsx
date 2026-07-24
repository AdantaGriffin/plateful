import styles from './root.module.scss';
import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import { useApi } from '../Api/api';

function Root(){
    const {darkMode, setDarkMode} = useApi();
    return(
        <section className={darkMode ? styles.root : styles.darkMode}>
            <Header/>
            <div className={styles.outlet}>
                <Outlet/>
            </div>
        </section>
    )
};

export default Root