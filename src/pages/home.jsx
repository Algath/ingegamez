import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import styles from './home.module.css';
import isc from '../assets/sponso/ISC.png';
import maitre_du_jeux from '../assets/sponso/le_maitre_du_jeux.png';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_LATEST_POSTS = gql`
    query GetLatestPosts {
        posts {
         id
         title
         image
         description
         slug
        }
    }
`;

const GET_EVENTS = gql`
    query GetEvents {
        events {
            id
            title
            logo
            date
            location
        }
    }
`;

const GET_GALLERY = gql`
    query GetGallery {
        galleryImages {
            id
            url
            alt
            category
        }
    }
`;

function GalleryItem({ item }) {
    return (
        <Paper elevation={0} className={styles.carouselItem}>
            <img src={item.src} alt={item.caption} className={styles.carouselImage} />
        </Paper>
    );
}

function Home () {
    const { data } = useQuery(GET_LATEST_POSTS);
    const latestPosts = data?.posts?.slice(0,2) ?? [];
    const { data: eventsData } = useQuery(GET_EVENTS);
    const today = new Date().toISOString().slice(0,10);
    const upcomingEvent = (eventsData?.events ?? [])
        .filter((e) => e.date >= today)
        .slice(0, 1)[0];
    const { data: galleryData } = useQuery(GET_GALLERY);
    const galleryImages = galleryData?.galleryImages ?? [];
    return (
        <div className={styles.home}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.hero}>
                    <div className={styles.contentOverlay}>
                        <h1>Bienvenue à IngéGamEZ</h1>
                        <h2>Soirées jeux, événements</h2>
                        <p>Soirées jeux vidéos et jeux de sociétés toutes les semaines et événements durant toute l'année !</p>
                    </div>
                </section>

                <section className={styles.eventsSection}>
                    <div className={styles.contentOverlay}>
                        <h2>Prochain événement</h2>
                        {upcomingEvent ? (
                            <div className={styles.eventCard}>
                                {upcomingEvent.logo && <img src={upcomingEvent.logo} alt={upcomingEvent.title} className={styles.eventLogo} />}
                                <strong>{upcomingEvent.title}</strong>{new Date(upcomingEvent.date).toLocaleDateString()}
                                {upcomingEvent.location && `, ${upcomingEvent.location}`}
                            </div>
                        ) : (
                            <p>Aucun événement à venir pour le moment. Restez à l'écoute !</p>
                        )}
                    </div>
                </section>

                <section className={styles.gallerySection}>
                    <div className={styles.contentOverlay}>
                        <h2>Galerie</h2>
                        <p>Découvrez les moments forts de nos événements</p>
                        <Carousel>
                            {galleryImages.map((img) => (
                                <GalleryItem key={img.id} item={{src: img.url, caption: img.alt || img.category }} />
                            ))}
                        </Carousel>
                    </div>
                </section>

                <section className={styles.actualitySection}>
                    <div className={styles.contentOverlay}>
                        <h2>Dernières Actualités</h2>
                        {latestPosts.map((post) => (
                            <article key={post.id} className={styles.newsItem}>
                                <h3>{post.title}</h3>
                                <img src={post.image} alt={post.title} className={styles.newsImage} />
                                <p>{post.description}</p>
                                <Link to={`/post/` + post.slug} className={styles.readMore}>Lire le post →</Link>
                            </article>
                        ))}
                        <Link to="/actuality" className={styles.viewAll}>Voir toutes les actualités →</Link>
                    </div>
                </section>

                <section className={styles.sponsorsSection}>
                    <div className={styles.contentOverlay}>
                        <h2>Merci à nos généreux sponsors</h2>
                        <div className={styles.sponsors}>
                            <a href="https://isc.hevs.ch/learn/#" className={styles.sponsorItem}>
                                <img src={isc} alt="ISC - Informatique et Systèmes de Communication"/>
                            </a>
                            <a href="https://shop.lemaitredejeux.ch" className={styles.sponsorItem}>
                                <img src={maitre_du_jeux} alt="Le Maître de Jeux"/>
                            </a>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

export default Home;