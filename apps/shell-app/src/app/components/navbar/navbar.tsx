import { Link } from 'react-router-dom';

import styles from './navbar.module.css';

export default function Navbar() {
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
        </div>
    )
}