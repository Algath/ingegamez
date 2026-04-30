import React, { useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { ImageList, ImageListItem } from '@mui/material';
import styles from './gallery.module.css';

const galleryData = [
    {
        year: 2025,
        events: [
            {
                name: 'Game Jam',
                icon: '🕹️',
                images: [
                    { src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', alt: 'Game Jam 1' },
                    { src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', alt: 'Game Jam 2' },
                    { src: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', alt: 'Game Jam 3' },
                ],
            },
            {
                name: 'LAN Party',
                icon: '💻',
                images: [
                    { src: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', alt: 'LAN 1' },
                    { src: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', alt: 'LAN 2' },
                ],
            },
        ],
    },
    {
        year: 2026,
        events: [
            {
                name: 'Game Jam',
                icon: '🕹️',
                images: [
                    { src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', alt: 'Game Jam 1' },
                    { src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', alt: 'Game Jam 2' },
                    { src: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', alt: 'Game Jam 3' },
                ],
            },
            {
                name: 'Murder Party',
                icon: '🕵️‍♂️',
                images: [],
            },
            {
                name: 'LAN Party',
                icon: '💻',
                images: [
                    { src: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', alt: 'LAN 1' },
                    { src: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', alt: 'LAN 2' },
                ],
            },
        ],
    },
];

function GalleryEvent({ event, isOpen, onToggle }) {
    return (
        <section className={styles.galleryEvent}>
            <button className={styles.toggle} onClick={onToggle}>
                <span className={styles.toggleIcon}>{isOpen ? '▼' : '▶'}</span>
                {event.icon} {event.name}
            </button>
            {isOpen && (
                <div className={styles.content}>
                    <ImageList cols={3} rowHeight={164} sx={{ width: '100%' }}>
                        {event.images.map((img) => (
                            <ImageListItem key={img.src}>
                                <img
                                    src={img.src}
                                    srcSet={`${img.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={img.alt}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )}
        </section>
    );
}

function GalleryYear({ yearData, isOpen, onToggle }) {
    const [openEvent, setOpenEvent] = useState(null);

    const handleEventToggle = (name) => {
        setOpenEvent(openEvent === name ? null : name);
    };

    return (
        <section className={styles.galleryYear}>
            <button className={`${styles.toggle} ${styles.toggleYear}`} onClick={onToggle}>
                <span className={styles.toggleIcon}>{isOpen ? '▼' : '▶'}</span>
                📅 {yearData.year}
            </button>
            {isOpen && (
                <div className={styles.content}>
                    {yearData.events.map((event) => (
                        <GalleryEvent
                            key={event.name}
                            event={event}
                            isOpen={openEvent === event.name}
                            onToggle={() => handleEventToggle(event.name)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function Gallery() {
    const currentYear = new Date().getFullYear();
    const [openYear, setOpenYear] = useState(currentYear);

    const handleYearToggle = (year) => {
        setOpenYear(openYear === year ? null : year);
    };

    return (
        <div className={styles.gallery}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.gallerySection}>
                    <h1>Gallery</h1>
                    <p>Browse our photos by year and event.</p>
                    <div className={styles.galleryContainer}>
                        {galleryData.map((yearData) => (
                            <GalleryYear
                                key={yearData.year}
                                yearData={yearData}
                                isOpen={openYear === yearData.year}
                                onToggle={() => handleYearToggle(yearData.year)}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Gallery;
