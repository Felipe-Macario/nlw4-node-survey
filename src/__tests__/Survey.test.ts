import request from 'supertest';
import { getConnection } from 'typeorm';

import createConnection from '../database';
import { app } from '../app';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/survey").send({
            title: "Titulo legal",
            description: "Esta é uma descrição"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to select all surveys", async () => {
        await request(app).post("/survey").send({
            title: "Titulo legal 2",
            description: "Esta é uma descrição 2"
        });

        const response = await request(app).get("/survey");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});