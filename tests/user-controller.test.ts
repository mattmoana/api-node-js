// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import { StatusCodes} from "http-status-codes";
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

    test('GET /:id - should return a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(StatusCodes.CREATED);
        const responseBody = await response.json()
        await expect.soft(responseBody.id).toBeDefined()
        const id = responseBody.id
        console.log(id)
        const response2 = await request.get(`${baseURL}/${id}`);
        const responseBody2 = await response2.json()
        await expect.soft(responseBody2.id).toBe(id)
    });

    test('GET /:id - should return 404 if user not found', async ({ request }) => {
        const response = await request.post(`${baseURL}/1000`);
        expect(response.status()).toBe(StatusCodes.NOT_FOUND);
    });

    test('POST / - should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(201);
        const responseBody = await response.json()
        await expect.soft(responseBody.id).toBeDefined()
    });

    test('DELETE /:id - should delete a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(StatusCodes.CREATED);
        const responseBody = await response.json()
        const id = responseBody.id

        const response2 = await request.delete(`${baseURL}/${id}`);
        await expect(response2.status()).toBe(StatusCodes.OK)

    });

    test('DELETE /:id - should return 404 if user not found', async ({ request }) => {
        const response = await request.delete(`${baseURL}/1000`);
        expect(response.status()).toBe(StatusCodes.NOT_FOUND);
    });


});
