import React from 'react';
import styles from './footer.module.css'
import logo from '../assets/Mascotte.png'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className={styles.footer}>
            <section className={styles.presentation}>
                <div className={styles.logoBrand}>
                    <Link to="/"><img src={logo} alt="IngéGamEZ"/></Link>
                    <span className={styles.brandName}>IngéGamEZ</span>
                </div>
                <p>IngéGamEZ est une association étudiante de l'HEI Sion, 
                    organisant des soirées autour des jeux vidéos et jeu de société. 
                    Nous organisons également des événements plus importants tels que 
                    la Pixel Jam et la Pixel_Lan, qui rassemblent des passionnés de 
                    jeux vidéo pour des compétitions et des week-ends ensemble.</p>
                <p>
                    Notre objectif est de créer une communauté dynamique et 
                    inclusive autour du gaming, en offrant un espace où les 
                    étudiants peuvent se divertir, socialiser et partager 
                    leur passion pour les jeux vidéo.
                </p>
                <br/>
                <p>Instagram : <a href="https://www.instagram.com/ingegamez/" target="_blank" rel="noopener noreferrer">@ingegamez</a></p>
                <p>WhatsApp : <a href="https://chat.whatsapp.com/C00MXZiPS6vIRJ9lZyJNXm" target="_blank" rel="noopener noreferrer">Rejoindre le groupe WhatsApp</a></p>
                <p>Discord : <a href="https://discord.gg/w8vhTMwgUW" target="_blank" rel="noopener noreferrer">Rejoindre le serveur Discord</a></p>
            </section>
            <section className={styles.navigation}>
                <h2>Quick Links</h2>
                <dl>
                    <dt><Link to="/">Home</Link></dt>
                    <dt><Link to="/pixel-jam-2026">Pixel Jam</Link></dt>
                    <dt><Link to="/pixel-lan-2025">Pixel_Lan</Link></dt>
                    <dt><Link to="/actuality">Actualités</Link></dt>
                    <dt><Link to="/gallery">Gallery</Link></dt>
                    <dt><Link to="/contact">Contact</Link></dt>
                </dl>
            </section>
            <section className={styles.contact}>
                <h2>Contact Us</h2>
                <div>21 Rue de l'Industrie, 1950 Sion</div>
                <div>Valais/Wallis Suisse</div>
                <br/>
                <div>Jeudi</div>
                <div>16:30-19:30</div>
                <Link to="mailto:ingegamez@hevs.ch">ingegamez@hevs.ch</Link>
            </section>
            <p>&copy; 2026 Our Assossiation. All rights reserved.</p>
        </footer>
    );
}

export default Footer;