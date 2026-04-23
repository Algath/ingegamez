import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";
import styles from "./events.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Remplacer par les vraies données du backend quand connecté
const placeholderEvents = [
    { title: "Pixel_Lan", date: "2026-10-15" },
    { title: "Pixel Jam", date: "2026-03-20" },
    { title: "Murder Party", date: "2026-05-10" },
];

function Events() {
    return (
        <div className={styles.events}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.eventsSection}>
                    <h1>Events</h1>
                    <p>Here you can view and manage upcoming events.</p>
                    
                </section>
                <section className={styles.eventsList}> {/*connecté à mongo et prendre les événements du backend*/}
                    <h2>Upcoming Events</h2>
                    <ul>
                        <li>Pixel_Lan: XX octobre 20XX</li>
                        <li>Pixel Jam: XX mars 20XX</li>
                        <li>Murder Party: XX mai 20XX</li>
                    </ul>
                </section>
                <section className={styles.addEvent}>
                    <h2>Add New Event</h2>
                    <form>
                        <div className={styles.inputRow}>
                            <input type="text" placeholder="Event Name" />
                            <input type="date" placeholder="Event Date" />
                        </div>
                        <textarea placeholder="Event Description"></textarea>
                        <button type="submit">Add Event</button>
                    </form>
                </section>
                <section className={styles.eventsList}>
                    <div className={styles.calendar}>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={placeholderEvents}
                            locale="fr"
                            height="auto"
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Events;