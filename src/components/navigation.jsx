import React, { useState } from "react";
import styles from './navigation.module.css'
import logo from '../assets/Mascotte.png'
import { Link, useNavigate } from 'react-router-dom';
import { useBreakpoints } from '../hooks/useBreakpoints';

function Navigation() {
    const { isTouch } = useBreakpoints();
    const [open, setOpen] = useState(false);
    const isAdmin = localStorage.getItem('role') === 'admin';
    const isLoggedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    }
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logoBrand}>
                    <Link to="/">
                        <img src={logo} alt="IngéGamEZ"/>
                        <span className={styles.brandName}>IngéGamEZ</span>
                    </Link>
                </div>
                {/* Bouton burger : visible uniquement sur tactile */}
                {isTouch && (
                    <button
                        className={styles.burger}
                        aria-label="Menu"
                        aria-expanded={open}
                        onClick={() => setOpen(v => !v)}
                    >
                        ☰
                    </button>
                )}
                {(!isTouch || open) && (
                    <ul className={styles.navLinks} onClick={() => setOpen(false)}>
                        <li><Link to="/pixel-jam-2026">Pixel Jam</Link></li>
                        <li><Link to="/pixel-lan-2025">Pixel_Lan</Link></li>
                        <li><Link to="/actuality">Actualités</Link></li>
                        <li><Link to="/games">Jeux</Link></li>
                        <li><Link to="/gallery">Galerie</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {isAdmin && (
                            <li><Link to="/admin">Admin</Link></li>
                        )}
                        {!isLoggedIn && (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
                        )}
                    </ul>
                )}
            </nav>
        </header>
    );
}

export default Navigation;