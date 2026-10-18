import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    // version triable de `date` (qui est du texte affiché tel quel)
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: 'Algath',
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
