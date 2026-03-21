import Navigation from '../components/navigation';
import Footer from '../components/footer'
import styles from './pixel-lan.module.css'
import pixelLan from '../assets/pixel_lan/pixel_lan_2025.jpg'
import homeStyles from './home.module.css'

function PixelLan () {
    return (
        <div className={styles.pixelLan}>
            <header>
                <Navigation />
            </header>
            <main>
                <img src={pixelLan} alt="Pixel Lan 2025" className={styles.eventHeaderImage}/>
                <section className={homeStyles.contentOverlay}>
                    <p>
                        La Pixel Lan est un week-end de jeux vidéos en réseau organisé annuellement par l'association IngéGamEZ.
                        Cet événement rassemble des passionnés de jeux vidéo et des joueurs de tous horizons pour partager leur
                        amour du jeu vidéo dans une ambiance conviviale et compétitive.
                    </p>
                    <br />
                    <p>
                        Pour l'occasion, nous avons ouvert un serveur discord temporaire! Il est accessible à tous les participants
                        pour la durée de la LAN.
                    </p>
                    <section className={`${styles.importantInfo} ${homeStyles.contentOverlay}`}>
                        <h2>Infos importantes</h2>
                        <p>Date: 25-26 octobre 2025</p>
                        <p>Tarifs:</p>
                        <ul>
                            <li>Inscription: <b>20 CHF</b></li>
                        </ul>
                        <br />
                        <h2>Tournoi</h2>
                        <p>Un tournoi est organisé sur plusieurs jeux. Il a lieu durant la journée de samedi. Tous les jeux sont
                            en équipe de 5. Il est possible de s'inscrire solo et on créera une équipe pour vous, ou de s'inscrire 
                            avec une équipe déjà constituée. Les jeux sont les suivants:
                        </p>
                        <ul>
                            <li>League of Legends</li>
                            <li>Valorant</li>
                            <li>Overwatch</li>
                            <li>Minecraft</li>
                        </ul>
                    </section>
                </section>
                <section className={`${styles.planning} ${homeStyles.contentOverlay}`}>
                    <h2>Planning</h2>
                    <p><b>Samedi 25 octobre 2025</b></p>
                    <ul>
                        <li>08:00 - 09:00 : Accueil et formation des équipes pour le tournoi</li>
                        <li>09:00 - 19:00 : Tournoi (phase de groupes)</li>
                        <li>19:00 - 20:00 : Soirée pizzas</li>
                        <li>20:00 - 09:00 : Session de jeux libre nocturne (optionnelle)</li>
                    </ul>
                    <br/>
                    <p><b>Dimanche 26 octobre 2025</b></p>
                    <ul>
                        <li>09:00 : Petit-déjeuner</li>
                        <li>10:00 - 12:00 : Session de jeux libre</li>
                        <li>12:00 - 13:00 : Pause déjeuner (livraison des sandwichs)</li>
                        <li>13:00 - 15:00 : Session de jeux libre</li>
                        <li>18:00 : Clôture de l'événement</li>
                    </ul>
                    <p><i>Notes: Les horaires sont susceptibles de changer sans préavis.</i></p>
                    <br/>
                    <p><b>Mis à disposition:</b></p>
                    <ul>
                        <li>Connexion internet haut débit</li>
                        <li>Espaces de jeu équipés de tables et de chaises</li>
                        <li>Restauration sur place (snacks, boissons, pizzas)</li>
                        <li>Serveur Discord pour la communication entre les participants</li>
                    </ul>
                </section>
                <section className={`${styles.liens} ${homeStyles.contentOverlay}`}>
                    <h2>Liens utiles</h2>
                    <ul>
                        <li><a href="https://discord.gg/NakSqWHGTQ">Serveur Discord d'IngéGamEZ</a></li>
                        <li><a href="https://chat.whatsapp.com/C00MXZiPS6vIRJ9lZyJNXm">Groupe WhatsApp d'IngéGamEZ</a></li>
                        <li><a href="https://www.instagram.com/ingegamez/">Instagram d'IngéGamEZ</a></li>
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default PixelLan;