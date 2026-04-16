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
    slug: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
