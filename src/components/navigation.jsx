import React from "react";
import styles from './navigation.module.css'
import logo from '../assets/Mascotte.png'
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logoBrand}>
                    <Link to="/"><img src={logo} alt="IngéGamEZ"/><span className={styles.brandName}>IngéGamEZ</span></Link>
                </div>
                <ul className={styles.navLinks}>
                    <li><Link to="/pixel-jam-2026">Pixel Jam</Link></li>
                    <li><Link to="/pixel-lan-2025">Pixel_Lan</Link></li>
                    <li><Link to="/actuality">Actualités</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;