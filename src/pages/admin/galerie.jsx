import React, { useState } from "react";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";
import styles from "./galerie.module.css";
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { Link } from "react-router-dom";
import { API_URL } from '../../config';

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
const CREATE_GALLERY_IMAGE = gql`
    mutation CreateGalleryImage($url: String!, $alt: String, $year: Int!, $category: String!) {
        createGalleryImage(url: $url, alt: $alt, year: $year, category: $category) {
            id
        }
    }
`;
const DELETE_GALLERY_IMAGE = gql`
    mutation DeleteGalleryImage($id: ID!) {
        deleteGalleryImage(id: $id)
    }
`;

function GalerieAdmin() {
    const [selectedFile, setSelectedFile] = useState(null);
    const { data } = useQuery(GET_GALLERY);
    const images = data?.galleryImages ?? [];
    const [createGalleryImage] = useMutation(CREATE_GALLERY_IMAGE, { refetchQueries: [{ query: GET_GALLERY }] });
    const [deleteGalleryImage] = useMutation(DELETE_GALLERY_IMAGE, { refetchQueries: [{ query: GET_GALLERY }] });
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({ alt: '', year: '', category: '' });

    async function uploadImage(file) {
        const fd = new FormData();
        fd.append('image', file);
        const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: fd, credentials: 'include' });
        const data = await res.json();
        return data.url;
    }
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!file) return;
        try {
            const url = await uploadImage(file);
            await createGalleryImage({
                variables: { url, alt: form.alt, year: parseInt(form.year), category: form.category },
            });
            setForm({ alt: '', year: '', category: '' });
            setFile(null);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={styles.galerie}>
            <header>
                <Navigation />
            </header>
            <main>
                <Link to="/admin" className={styles.backButton}>← Back to Admin Panel</Link>
                <section className={styles.galerieSection}>
                    <h1>Gallery Panel</h1>
                    <p>Here you can manage and create image posts.</p>
                    <section className={styles.addImage}>
                        <h2>Add New Image</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Image Title" onChange={(e) => setForm({ ...form, alt: e.target.value })} />
                            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
                            <input name="alt" placeholder="Légende" value={form.alt} onChange={handleChange} />
                            <input type="number" name="year" placeholder="Année" value={form.year} onChange={handleChange} />
                            <select name="category" value={form.category} onChange={handleChange}>
                                <option value="">Sélectionner une catégorie</option>
                                <option value="Pixel Jam">Pixel Jam</option>
                                <option value="Pixel Lan">Pixel Lan</option>
                                <option value="Murder Party">Murder Party</option>
                            </select>
                            <button type="submit">Add Image</button>
                        </form>
                    </section>
                    <section className={styles.imageGrid}>
                        {images.map((image) => (
                            <div key={image.id} className={styles.imageItem}>
                                <img src={image.url} alt={image.alt} width={80} />
                                <p>{image.year}</p>
                                <p>{image.category}</p>
                                <button onClick={() => deleteGalleryImage({ variables: { id: image.id } })} className={styles.deleteButton}>
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </section>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default GalerieAdmin;
