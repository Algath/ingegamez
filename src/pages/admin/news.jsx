import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";
import styles from "./news.module.css";

function News() {
    return (
        <div className={styles.news}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.newsSection}>
                    <h1>News Panel</h1>
                    <p>Here you can manage and create news posts.</p>
                    <section className={styles.addNews}>
                        <h2>Add New Post</h2>
                        <form>
                            <input type="text" placeholder="Post Title" />
                            <textarea placeholder="Post Content"></textarea>
                            <button type="submit">Add Post</button>
                        </form>
                    </section>
                    <section className={styles.newsList}> {/*connecté à mongo et prendre les posts du backend*/}
                        <h2>Existing Posts</h2>
                        <ul>
                            <li>Post 1: Lorem ipsum dolor sit amet...</li>
                            <li>Post 2: Consectetur adipiscing elit...</li>
                            <li>Post 3: Sed do eiusmod tempor incididunt...</li>
                        </ul>
                    </section>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default News;