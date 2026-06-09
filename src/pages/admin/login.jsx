import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";
import styles from "./login.module.css";
import { useState } from "react";
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            role
        }
    }
`;

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loginUser] = useMutation(LOGIN);
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await loginUser({ variables: form });
            localStorage.setItem(`role`, data.login.role);
            navigate('/admin');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className={styles.login}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.loginSection}>
                    <h1>Admin Login</h1>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        {error && <p>{error}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Login;