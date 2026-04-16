import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ingegamez';

// Modifie ces valeurs avant de lancer
const USERNAME = 'admin';
const PASSWORD = 'changeme';

async function createAdmin() {
  await mongoose.connect(MONGO_URI);

  const existing = await User.findOne({ username: USERNAME });
  if (existing) {
    console.log(`L'utilisateur "${USERNAME}" existe déjà.`);
    await mongoose.disconnect();
    return;
  }

  const user = new User({ username: USERNAME, password: PASSWORD, role: 'admin' });
  await user.save();
  console.log(`Admin "${USERNAME}" créé avec succès.`);

  await mongoose.disconnect();
}

createAdmin().catch((err) => {
  console.error('Erreur :', err);
  process.exit(1);
});
