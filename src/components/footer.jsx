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
                <ul className={styles.highlights}>
                    <li>🎓 Association étudiante – HEI Sion</li>
                    <li>🎲 Soirées jeux vidéo &amp; jeux de société</li>
                    <li>🎪 Événements : Pixel Jam &amp; Pixel_Lan</li>
                    <li>🤝 Une communauté de passionnés</li>
                </ul>
            </section>
            <div className={styles.about}>
                <p>
                    Notre objectif est de créer une communauté dynamique et
                    inclusive autour du gaming, en offrant un espace où les
                    étudiants peuvent se divertir, socialiser et partager
                    leur passion pour les jeux vidéo.
                </p>
            </div>
            <section className={styles.contact}>
                <h2>Contact Us</h2>
                <div>21 Rue de l'Industrie, 1950 Sion</div>
                <div>Valais/Wallis Suisse</div>
                <br/>
                <div>Jeudi</div>
                <div>16:30-19:30</div>
                <Link to="mailto:ingegamez@hevs.ch">ingegamez@hevs.ch</Link>
                <div className={styles.socials}>
                    <p><a href="https://www.instagram.com/ingegamez/" target="_blank" rel="noopener noreferrer">@ingegamez</a></p>
                    <p><a href="https://chat.whatsapp.com/C00MXZiPS6vIRJ9lZyJNXm" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
                    <p><a href="https://discord.gg/w8vhTMwgUW" target="_blank" rel="noopener noreferrer">Discord</a></p>
                </div>
            </section>
            <div className={styles.copyright}>
                <p>&copy; 2026 IngéGamEZ. Tous droits réservés.</p>
            </div>
        </footer>
    );
}

export default Footer;