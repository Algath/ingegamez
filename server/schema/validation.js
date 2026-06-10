import SimpleSchema from "simpl-schema";

export const PostSchema = new SimpleSchema({
    title: String,
    date: String,
    category: String,
    author: { type: String, optional: true },
    image: { type: String, optional: true },
    description: String,
    content: { type: String, optional: true },
    slug: String,
});

export const EventSchema = new SimpleSchema({
    title: String,
    date: String,
    description: { type: String, optional: true },
    location: { type: String, optional: true },
    logo: { type: String, optional: true },
});

export const GalleryImageSchema = new SimpleSchema({
    url: String,
    alt: { type: String, optional: true },
    year: SimpleSchema.Integer,
    category: String,
});