import request from 'supertest';

import createConnection from '../database';
import { app } from '../app';

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/user").send({
            name: "teste",
            email: "teste@gmail.com"
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to duplicate user email", async () => {
        const response = await request(app).post("/user").send({
            name: "teste",
            email: "teste@gmail.com"
        });

        expect(response.status).toBe(400);
    });
});