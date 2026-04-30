import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import styles from './home.module.css'
import pixelJam from '../assets/pixel_jam/pixel_jam.png'
import isc from '../assets/sponso/ISC.png'
import maitre_du_jeux from '../assets/sponso/le_maitre_du_jeux.png'
import christmas from '../assets/posts/christmas.png'
import crackList from '../assets/posts/crack_list.png'
import discord from '../assets/posts/discord.png'
import endSaison from '../assets/posts/end_saison.png'
import tsuro from '../assets/posts/tsuro.png'

// Placeholder — sera remplacé par des données du backend
const galleryItems = [
    { src: christmas,  caption: 'Soirée de Noël' },
    { src: crackList,  caption: 'Crack List' },
    { src: discord,    caption: 'Discord' },
    { src: endSaison,  caption: 'Fin de saison' },
    { src: tsuro,      caption: 'Tsuro' },
];

function GalleryItem({ item }) {
    return (
        <Paper elevation={0} className={styles.carouselItem}>
            <img src={item.src} alt={item.caption} className={styles.carouselImage} />
            <p className={styles.carouselCaption}>{item.caption}</p>
        </Paper>
    );
}

function Home () {
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
                        <h2>Événement en cours</h2>
                        <div className={styles.eventCard}>
                            <Link to="/pixel-jam-2026" className={styles.eventLink}>
                                <img src={pixelJam} alt="Pixel Jam 2026" />
                                Pixel Jam 2026 - 21-22 mars 2026
                            </Link>
                        </div>
                    </div>
                </section>

                <section className={styles.gallerySection}>
                    <div className={styles.contentOverlay}>
                        <h2>Galerie</h2>
                        <p>Découvrez les moments forts de nos événements</p>
                        <Carousel>
                            {galleryItems.map((item, i) => (
                                <GalleryItem key={i} item={item} />
                            ))}
                        </Carousel>
                    </div>
                </section>

                <section className={styles.actualitySection}>
                    <div className={styles.contentOverlay}>
                        <h2>Dernières Actualités</h2>
                        <article className={styles.newsItem}>
                            <h3>Nouvelle soirée jeux de société !</h3>
                            <p>Rejoignez-nous pour une soirée dédiée aux jeux de société le 15 mars à 19h. Venez découvrir de nouveaux jeux et partager un moment convivial avec d'autres passionnés !</p>
                            <Link to="/actuality" className={styles.readMore}>Lire les actualités →</Link>
                        </article>
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