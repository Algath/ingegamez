import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import passport from './middleware/passport.js';

export async function createApp() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    
    app.set('trust proxy', 1);
    const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

    app.use(cors({ origin: allowedOrigin, credentials: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(passport.initialize());

    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req, res }) => {
            const user = await new Promise((resolve) => {
                passport.authenticate('jwt', { session: false }, (err, user) =>
                resolve(user || null))(req, res, () => {});
            });
            return { user, res };
        },
    }));

    return app;
}