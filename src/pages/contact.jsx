import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import styles from "./contact.module.css";
import homeStyles from "./home.module.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Contact() {
    const [address, setAddress] = useState("Rue de l'Industrie 21, 1950 Sion, Suisse");
    const mapRef = useRef(null);

    useEffect(() => {
        const mapElement = document.getElementById("map");
        if (!mapElement) return;
        
        // Détruire la carte précédente si elle existe
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
        
        // Géocoder l'adresse avec Nominatim
        fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    const map = L.map("map").setView([lat, lon], 15);
                    mapRef.current = map;
                    
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: '&copy; OpenStreetMap contributors',
                        maxZoom: 19,
                    }).addTo(map);
                    
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup("<b>IngéGamEZ</b><br>" + address);
                } else {
                    console.warn("Adresse non trouvée:", address);
                }
            })
            .catch(err => console.error("Erreur géocodage:", err));
    }, [address]);

    return (
        <div className={styles.contactPage}>
            <header>
                <Navigation />
            </header>
            <main className={styles.content}>
                <h1>Contact</h1>
                <p>Pour toutes questions ou informations, n'hésitez pas à nous contacter !</p>
                <p>Vous pouvez nous retrouver les jeudis dès 16h30 à la Students Room ou en 21N305.</p>
                <br />
                <ul>
                    <li>Email : <a href="mailto:ingegamez@hevs.ch">ingegamez@hevs.ch</a></li>
                    <li>Discord : <a href="https://discord.gg/NakSqWHGTQ">Serveur Discord d'IngéGamEZ</a></li>
                    <li>Whatsapp : <a href="https://chat.whatsapp.com/C00MXZiPS6vIRJ9lZyJNXm">Groupe WhatsApp d'IngéGamEZ</a></li>
                    <li>Instagram : <a href="https://www.instagram.com/ingegamez/">IngéGamEZ sur Instagram</a></li>
                </ul>
                <section className={styles.content}>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Entrez une adresse"
                        style={{ width: "100%", padding: "8px", marginBottom: "10px", fontSize: "14px" }}
                    />
                    <div id="map" style={{ height: "450px", width: "100%", borderRadius: "8px" }} />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Contact;