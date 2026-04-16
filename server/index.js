import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import { getUserFromToken } from './middleware/auth.js';

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ingegamez';

async function start() {
  // Connect to MongoDB
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connecté :', MONGO_URI);

  // Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // Express app
  const app = express();
  app.use(cors());
  app.use(express.json());

  // GraphQL endpoint — injecte l'utilisateur décodé dans le context
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const user = getUserFromToken(token);
      return { user };
    },
  }));

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error('Erreur au démarrage :', err);
  process.exit(1);
});
