import 'dotenv/config';
import mongoose from 'mongoose';
import Post from './models/Post.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ingegamez';

const posts = [
  {
    title: "Jeudi 05.03.2026",
    date: "March 04, 2026",
    category: "Thursday Games",
    author: "Algath",
    image: "/posts/tsuro.png",
    description: "Ce jeudi 05 mars, dès 16h30 : 77e IngeGameZ ! On continue le mois...",
    slug: "thursday-games-05-03-2026",
  },
  {
    title: "Jeudi 26.02.2026",
    date: "February 25, 2026",
    category: "Thursday Games",
    author: "Algath",
    image: "/posts/unlock-risky-adventures-fotor-bg-remover-20240906105151.png",
    description: "Ce jeudi 26 février, dès 16h30 : 76e IngeGameZ ! On continue notre aventure...",
    slug: "thursday-games-26-02-2026",
  },
  {
    title: "Inscriptions Pixel Jam 2026",
    date: "January 5, 2026",
    category: "Events",
    author: "Algath",
    image: "/posts/pixel_jam_2026.png",
    description: "Les inscriptions pour le Pixel Jam 2026 sont ouvertes ! Venez créer un jeu vidéo...",
    slug: "pixel-jam-2026-inscriptions",
  },
  {
    title: "Joyeux Noël !",
    date: "December 25, 2025",
    category: "Events",
    author: "Algath",
    image: "/posts/christmas.png",
    description: "L'équipe IngeGameZ vous souhaite un joyeux Noël ! Profitez de cette période festive...",
    slug: "joyeux-noel-2025",
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connecté');

  for (const post of posts) {
    await Post.findOneAndUpdate(
      { slug: post.slug },
      { $set: post },
      { upsert: true, new: true }
    );
    console.log(`Post "${post.title}" inséré ou mis à jour`);
  }

  await mongoose.disconnect();
  console.log('Terminé.');
}

seed().catch((err) => {
  console.error('Erreur seed :', err);
  process.exit(1);
});
