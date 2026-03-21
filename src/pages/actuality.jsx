import Navigation from "../components/navigation";
import Footer from "../components/footer";
import PostCard from "../components/PostCard";
import { postsData } from "../data/postsData";
import homeStyles from "./home.module.css";
import styles from "./actuality.module.css";

function Actuality () {
    return (
        <div className={styles.actuality}>
            <header>
                <Navigation />
            </header>
            <main>
                <h1>Actualités</h1>
                <div className={styles.postsGrid}>
                    {postsData.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Actuality;