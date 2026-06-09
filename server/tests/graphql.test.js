import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../app.js';

let app;
let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    app = await createApp();
}, 60000);

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('GRaphQL /graphql', () => {
    test('la query publique posts répond 200 avec un tableau', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({ query: '{ posts { id title } }' })
        
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data.posts)).toBe(true);
    });

    test('createPost sans authentification est rejeté', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({
                query: `mutation {
                 createPost(title: "X", date:"2026-01-01", category: "Events", description: "d", slug: "x") { id }
                 }`,
            });
        expect(res.body.errors).toBeDefined();
        expect(res.body.errors[0].message).toMatch(/admin/i);
    });
});