import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";
import styles from "./news.module.css";
import { useState, useRef } from "react";
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { API_URL } from '../../config';

const GET_POSTS = gql`
    query GetPosts {
        posts {
            id
            title
            category
            date
            slug
        }
    }
`;

function slugify(str) {
    return str
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

const CREATE_POST = gql`
    mutation CreatePost($title: String!, $date: String!, $category: String!, $image:String, $description: String!, $slug: String!) {
        createPost(title: $title, date: $date, category: $category, image: $image, description: $description, slug: $slug) {
            id
        }
    }
`;
const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`;

function News() {
    const { data } = useQuery(GET_POSTS);
    const posts = data?.posts ?? [];
    const [form, setForm] = useState({
        title: '', date: '', category: '', image: '', description: ''
    });
    const [createPost] = useMutation(CREATE_POST, { refetchQueries: [{ query: GET_POSTS }] });
    const [deletePost] = useMutation(DELETE_POST, { refetchQueries: [{ query: GET_POSTS }] });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createPost({ variables: { ...form, slug: slugify(form.title) } });
            setForm({ title:'', date: '', category: '', image: '', description: '' });
        } catch (err) {
            console.error(err);
        }
    }
    async function uploadImage(file) {
        console.log(`Uploading file`, file);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: fd });
            const data = await res.json();
            setForm((f) => ({...f, image: data.url }))
        } catch (err) {
            console.error(err);
        }
    }
    function handleDrop(e) {
        console.log(`drop!`, e.dataTransfer.files);
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) uploadImage(file);
    }
    function handleDragOver(e) {
        e.preventDefault();
    }
    const fileInputRef = useRef();
    return (
        <div className={styles.news}>
            <header>
                <Navigation />
            </header>
            <main>
                <Link to="/admin" className={styles.backButton}>
                    ← Retour au pannel admin
                </Link>
                <section className={styles.newsSection}>
                    <h1>News Panel</h1>
                    <p>Here you can manage and create news posts.</p>
                    <section className={styles.addNews}>
                        <h2>Add New Post</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Post Title"
                                value={form.title}
                                onChange={handleChange}
                            />
                            <input
                                type="date"
                                name="date"
                                placeholder="Post Date"
                                value={form.date}
                                onChange={handleChange}
                            />
                            <select name="category" value={form.category} onChange={handleChange}>
                                <option value="">Select Category</option>
                                <option value="Pixel_Jam">Pixel Jam</option>
                                <option value="Pixel_Lan">Pixel_Lan</option>
                                <option value="thursday_night">Thursday Night</option>
                            </select>
                            <div
                                className={styles.dropzone}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={() => fileInputRef.current.click()}
                            >
                                {form.image ? <img src={form.image} alt="aperçu" className={styles.preview} />
                                : <p>Glisse une image ici, ou clique pour en choisir une</p>}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => { if (e.target.files[0]) uploadImage(e.target.files[0]); }}
                            />
                            <textarea
                                name="description"
                                placeholder="Post Content"
                                value={form.description}
                                onChange={handleChange}
                            ></textarea>
                            <button type="submit">Add Post</button>
                        </form>
                    </section>
                    <section className={styles.newsList}> {/*connecté à mongo et prendre les posts du backend*/}
                        <h2>Existing Posts</h2>
                        <ul>
                            {posts.map((post) => (
                                <li key={post.id}>
                                    {post.title} - <em>{post.category}</em>
                                    <button onClick={() => deletePost({ variables: { id: post.id } })} className={styles.deleteButton}>
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default News;