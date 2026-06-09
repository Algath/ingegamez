import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";
import styles from "./events.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { API_URL } from '../../config';

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
const CREATE_EVENT = gql`
    mutation CreateEvent($title: String!, $logo: String, $date: String!, $description: String, $location: String) {
        createEvent(title: $title, logo: $logo, date: $date, description: $description, location: $location) {
            id
        }
    }
`;
const DELETE_EVENT = gql`
    mutation DeleteEvent($id: ID!) {
        deleteEvent(id: $id)
    }
`;

function Events() {
    const { isTouch } = useBreakpoints();
    const { data } = useQuery(GET_EVENTS);
    const events = data?.events ?? [];
    const [createEvent] = useMutation(CREATE_EVENT, { refetchQueries: [{ query: GET_EVENTS }] });
    const [deleteEvent] = useMutation(DELETE_EVENT, { refetchQueries: [{ query: GET_EVENTS }] });
    const [form, setForm] = useState({ title: '', logo: '', date: '', description: '', location: '' });
    const fileInputRef = useRef(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createEvent({ variables: { ...form } });
            setForm({ title:'', logo: '', date: '', description: '', location: '' });
        } catch (err) {
            console.error(err);
        }
    }
    async function uploadImage(file) {
        try {
            const fd = new FormData();
            fd.append('image', file);
            const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: fd });
            const data = await res.json();
            setForm((f) => ({...f, logo: data.url }))
        } catch (err) {
            console.error(err);
        }
    }
    function handleDrop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) uploadImage(file);
    }
    function handleDragOver(e) {
        e.preventDefault();
    }
    return (
        <div className={styles.events}>
            <header>
                <Navigation />
            </header>
            <main>
                <Link to='/admin' className={styles.backButton}>
                    ← Retour au pannel admin
                </Link>
                <section className={styles.eventsSection}>
                    <h1>Events</h1>
                    <p>Here you can view and manage upcoming events.</p>
                    
                </section>
                <section className={styles.eventsList}> {/*connecté à mongo et prendre les événements du backend*/}
                    <h2>Upcoming Events</h2>
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                {event.title} - {new Date(event.date).toLocaleDateString()} at {event.location}
                                <button onClick={() => deleteEvent({ variables: { id: event.id } })} className={styles.deleteButton}>
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className={styles.addEvent}>
                    <h2>Add New Event</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputRow}>
                            <input type="text" placeholder="Event Name" name="title" value={form.title} onChange={handleChange} />
                            <input type="date" placeholder="Event Date" name="date" value={form.date} onChange={handleChange} />
                        </div>
                        <div
                            className={styles.logoUpload}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => fileInputRef.current.click()}
                        >
                            {form.logo ? <img src={form.logo} alt="Event Logo" className={styles.logoPreview} />
                            : <span>Glisse une image ici, ou clique pour en choisir une</span>}
                        </div>
                        <input type="file" accept="image/*" placeholder="Event Logo" ref={fileInputRef} name="logo" style={{ display: 'none' }} onChange={(e) => {if (e.target.files[0]) uploadImage(e.target.files[0]);}} />
                        <input type="text" placeholder="Event Description" name="description" value={form.description} onChange={handleChange} />
                        <input type="text" placeholder="Event Location" name="location" value={form.location} onChange={handleChange} />
                        <button type="submit">Add Event</button>
                    </form>
                </section>
                <section className={styles.eventsList}>
                    <div className={styles.calendar}>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                            initialView={isTouch ? "listWeek" : "dayGridMonth"}
                            events={events.map(e => ({title: e.title, date: e.date, logo: e.logo}))}
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