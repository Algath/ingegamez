import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    bggId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    yearPublished: Number,
    description: String,
    thumbnail: String,
    image: String,
    minPlayers: Number,
    maxPlayers: Number,
    playingTime: Number,
    rating: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Game', gameSchema);
