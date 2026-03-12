import Navigation from '../components/navigation'
import Footer from '../components/footer'
import styles from './pixel-jam.module.css'
import pixelJam from '../assets/pixel_jam_2026.png'
import homeStyles from './home.module.css'

function PixelJam () {
    return (
        <div className={styles.pixelJam}>
            <header>
                <Navigation />
            </header>  
            <main>
                <img src={pixelJam} alt="Pixel Jam 2026" className={styles.eventHeaderImage}/>
                <section className={homeStyles.contentOverlay}>
                    <p>
                        La Pixel Jam est un marathon de développement de jeux vidéos sur 36 heures
                qui est organisé annuellement par l'association IngéGamEZ.
                Cet événement rassemble des passionnés de jeux vidéo, des développeurs, 
                des artistes et des créateurs de tous horizons pour créer des jeux originaux en un temps limité.
                    </p>
                    <br />
                    <p>
                      C'est une occasion unique pour les participants de mettre à l'épreuve leur créativité, 
                leurs compétences techniques et leur capacité à travailler en équipe dans un environnement stimulant et convivial.  
                    </p>
                    <p>
                        Un thème est choisi chaque année pour guider la création des jeux. Et pour cette année, nous apportons un nouveau défi 
                avec une contrainte technique supplémentaire!
                    </p>
                    <br />
                    <section className={`${styles.importantInfo} ${homeStyles.contentOverlay}`}>
                        <h2>Infos importantes</h2>
                        <p>Date: 21-22 mars 2026</p>
                        <p>Nombre de personne par équipe : 2 à 4</p>
                        <p>Tarifs:</p>
                        <ul>
                            <li>Inscription: <b>20 CHF</b></li>
                            <li>Inscription + T-shirt: <b>30 CHF</b></li>
                            <li>T-Shirt: <b>15 CHF</b></li>
                        </ul>
                    </section>
                </section>
                <section className={`${styles.planning} ${homeStyles.contentOverlay}`}>
                    <h2>Planning</h2>
                    <p><b>Samedi 21 mars 2026</b></p>
                    <ul>
                        <li>08:00 - 09:00 : Accueil et formation des équipes</li>
                        <li>09:00 - 09:30 : Présentation du thème et des contraintes</li>
                        <li>18:00 - 19:00 : Soirée pizzas</li>
                        <li>20:00 - 09:00 : Session de développement nocturne (optionnelle)</li>
                    </ul>
                    <br/>
                    <p><b>Dimanche 22 mars 2026</b></p>
                    <ul>
                        <li>09:00 : Petit-déjeuner</li>
                        <li>12:00 - 13:00 : Pause déjeuner (livraison des sandwichs)</li>
                        <li>13:00 - 15:00 : Finalisation des projets et préparation des présentations</li>
                        <li>15:00 - 17:00 : Présentations finales et délibération du jury</li>
                        <li>17:00 - 18:00 : Annonce des résultats et clôture de l'événement</li>
                    </ul>
                    <p><i>Notes: Les horaires sont susceptibles de changer sans préavis.</i></p>
                    <br/>
                    <p><b>Mis à disposition:</b></p>
                    <ul>
                        <li>Salle info</li>
                        <li>Salle de repos</li>
                        <li>Salle de classe</li>
                    </ul>
                    <p>Vous retrouverez également une coop à côté du bâtiment pour la journée de samedi et des snacks + boissons seront mis à disposition.</p>
                </section>
                <section className={`${styles.liens} ${homeStyles.contentOverlay}`}>
                    <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAM0PqP1UM0xSOUFXNEM2N1ZKSzBBUkFBSDI4Q1hZUS4u" className={styles.formulaire}><h1>Formulaire</h1></a>
                    <br/>
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
    );
}

export default PixelJam;