import Navigation from "../components/navigation";
import Footer from "../components/footer";
import PostCard from "../components/PostCard";
import styles from "./actuality.module.css";
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      date
      category
      author
      image
      description
      slug
    }
  }
`;

function Actuality () {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div className={styles.actuality}>
            <header>
                <Navigation />
            </header>
            <main>
                <h1>Actualités</h1>
                <div className={styles.postsGrid}>
                    {data.posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Actuality;