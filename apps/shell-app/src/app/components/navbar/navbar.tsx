//import { useContext } from 'react';
import { Link } from 'react-router-dom';
//import UserContext from '../../providers/usercontext';

import styles from './navbar.module.css';

export default function Navbar() {
    //const appContext = useContext(UserContext);

    return (
        <div className={styles.navbar}>
            <span className={styles.title}>Shell App</span>
            <span>
                <Link to='/home'>
                    Home
                </Link>
            </span>
            <span>
                <Link to='/about-me'>
                    About Me
                </Link>
            </span>
            <span>
                <button type="button">Change Theme</button>
            </span>
        </div>
    )
}