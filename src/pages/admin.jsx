import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import styles from "./admin.module.css";
import { useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

function Admin() {
    const navigate = useNavigate();
    const [logout] = useMutation(LOGOUT);

    async function handleLogout() {
        try {
            await logout();
        } finally {
            localStorage.removeItem('role');
            navigate('/login');
        }
    }
    return (
        <div className={styles.admin}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.adminSection}>
                    <h1>Admin Panel</h1>
                    <p>Welcome to the admin panel. Here you can manage events, news, and galerie.</p>
                    <div className={styles.adminLinks}>
                        <Link to="/admin/events" className={styles.adminLink}>Manage Events</Link>
                        <Link to="/admin/news" className={styles.adminLink}>Manage News</Link>
                        <Link to="/admin/galerie" className={styles.adminLink}>Manage Galerie</Link>
                        <Link to="/admin/games" className={styles.adminLink}>Manage Games</Link>
                    </div>
                    <br />
                    <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Admin;