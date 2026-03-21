import { useParams, useNavigate } from 'react-router-dom';
import { postsData } from '../data/postsData';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import styles from './postDetail.module.css';

function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Trouver le post correspondant au slug
  const post = postsData.find(p => p.slug === slug);
  
  // Si le post n'existe pas, afficher un message d'erreur
  if (!post) {
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
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.author}>Par {post.author}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
          </div>
          
          <div className={styles.imageWrapper}>
            <img src={post.image} alt={post.title} className={styles.image} />
          </div>
          
          <div className={styles.content}>
            <p>{post.description}</p>
            {/* Vous pouvez ajouter du contenu supplémentaire ici */}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default PostDetail;
