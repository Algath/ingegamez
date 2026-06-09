import React, { useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { ImageList, ImageListItem } from '@mui/material';
import styles from './gallery.module.css';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_GALLERY = gql`
    query GetGallery {
        galleryImages {
            id
            url
            alt
            year
            category
        }
    }
`;

function groupGallery(images) {
    const byYear = {};
    for (const img of images) {
        byYear[img.year] ??= {};
        byYear[img.year][img.category] ??= [];
        byYear[img.year][img.category].push({ src: img.url, alt: img.alt});
    }
    return Object.entries(byYear)
        .map(([year, cats]) => ({
            year: Number(year),
            events: Object.entries(cats).map(([name, imgs]) => ({name, images: imgs})),
        }))
        .sort((a,b) => b.year - a.year);
}

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
    const { data } = useQuery(GET_GALLERY);
    const galleryData = groupGallery(data?.galleryImages ?? []);

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
