import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import styles from "./register.module.css";

function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        nom: '',
        prenom: '',
        password: '',
    });
    const [error, setError] = useState(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        // TODO: appeler la mutation GraphQL register(form)
    }

    return (
        <div className={styles.register}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.registerSection}>
                    <h1>Créer un compte</h1>
                    <form className={styles.registerForm} onSubmit={handleSubmit}>
                        <label htmlFor="prenom">Prénom</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={form.prenom}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="nom">Nom</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={form.nom}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.registerButton}>
                            S'inscrire
                        </button>
                    </form>
                    <p>Déjà un compte ? <Link to="/login">Se connecter</Link>.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Register;
