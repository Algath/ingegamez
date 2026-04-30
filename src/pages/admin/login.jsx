import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";
import styles from "./login.module.css";

function Login() {
    return (
        <div className={styles.login}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.loginSection}>
                    <h1>Admin Login</h1>
                    <form className={styles.loginForm}>
                        <input type="text" placeholder="Username" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Login</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Login;