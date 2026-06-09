import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from './app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({ storage });

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ingegamez';

async function start() {
  // Connect to MongoDB
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connecté :', MONGO_URI);

  const app = await createApp();

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url });
  });

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error('Erreur au démarrage :', err);
  process.exit(1);
});
