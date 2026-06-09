import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
        },
        date: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        location: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Event', eventSchema);