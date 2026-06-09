import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import styles from './postDetail.module.css';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_POST = gql`
  query GetPost($slug: String!) {
    post(slug:$slug) {
      title
      date
      category
      author
      image
      description
    }
}
`;

function PostDetail() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(GET_POST, { variables: { slug } });
  const navigate = useNavigate();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  
  // Trouver le post correspondant au slug
  // const post = postsData.find(p => p.slug === slug);
  
  // Si le post n'existe pas, afficher un message d'erreur
  if (!data.post) {
    return (
      <div className={styles.postDetail}>
        <header>
          <Navigation />
        </header>
        <main>
          <div className={styles.error}>
            <h1>Article non trouvé</h1>
            <p>Désolé, cet article n'existe pas.</p>
            <button onClick={() => navigate('/actuality')} className={styles.backButton}>
              Retour aux actualités
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className={styles.postDetail}>
      <header>
        <Navigation />
      </header>
      <main>
        <button onClick={() => navigate('/actuality')} className={styles.backButton}>
          ← Retour aux actualités
        </button>
        
        <article className={styles.article}>
          <div className={styles.header}>
            <span className={styles.category}>{data.post.category}</span>
            <h1 className={styles.title}>{data.post.title}</h1>

            <div className={styles.meta}>
              <span className={styles.author}>Par {data.post.author}</span>
              <span className={styles.date}>{data.post.date}</span>
            </div>
          </div>
          
          <div className={styles.imageWrapper}>
            <img src={data.post.image} alt={data.post.title} className={styles.image} />
          </div>
          
          <div className={styles.content}>
            <p>{data.post.description}</p>
            {/* Vous pouvez ajouter du contenu supplémentaire ici */}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default PostDetail;
