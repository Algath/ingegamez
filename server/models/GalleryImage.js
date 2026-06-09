import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
        },
        year: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('GalleryImage', galleryImageSchema);