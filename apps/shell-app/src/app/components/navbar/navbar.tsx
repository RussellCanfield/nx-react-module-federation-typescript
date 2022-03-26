import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode, useThemeContext } from '../../providers/theme';

import './navbar.css';

export default function Navbar() {
    const { changeTheme, theme } = useThemeContext();

    return (
        <div className={`navbar ${theme == ThemeMode.Dark ? 'dark' : ''}`}>
            <span className='title'>Shell App</span>
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
                <button type="button" onClick={() => 
                    changeTheme(theme == ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark)}>
                    Change Theme
                </button>
            </span>
        </div>
    )
}