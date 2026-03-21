import { Link } from 'react-router-dom';
import styles from './postCard.module.css';

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.slug}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={post.image} alt={post.title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <span className={styles.category}>{post.category}</span>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.meta}>
            <span className={styles.author}>{post.author}</span>
            <span className={styles.date}>{post.date}</span>
          </div>
          <p className={styles.description}>{post.description}</p>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
