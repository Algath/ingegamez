import React, { useState } from "react";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";
import styles from "./galerie.module.css";
import axios from "axios";

function GalerieAdmin() {
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0] || null);
    };

    const onFileUpload = (event) => {
        event.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        axios.post("api/uploadfile", formData);
    };

    return (
        <div className={styles.galerie}>
            <header>
                <Navigation />
            </header>
            <main>
                <section className={styles.galerieSection}>
                    <h1>Gallery Panel</h1>
                    <p>Here you can manage and create image posts.</p>
                    <section className={styles.addImage}>
                        <h2>Add New Image</h2>
                        <form onSubmit={onFileUpload}>
                            <input type="text" placeholder="Image Title" />
                            <input type="file" accept="image/*" onChange={onFileChange} />
                            <button type="submit">Add Image</button>
                        </form>
                        {selectedFile ? (
                            <div>
                                <h2>File Details:</h2>
                                <p>File Name: {selectedFile.name}</p>
                                <p>File Type: {selectedFile.type}</p>
                                <p>Last Modified: {new Date(selectedFile.lastModified).toDateString()}</p>
                            </div>
                        ) : (
                            <p>Choose a file before pressing Upload.</p>
                        )}
                    </section>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default GalerieAdmin;
