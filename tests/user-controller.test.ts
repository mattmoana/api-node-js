// tests/api.spec.ts
import { test, expect } from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

    test('GET / - should return empty when no users', async ({ request }) => {
        const response = await request.get(`${baseURL}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.text()
        expect(responseBody).toBe('[]');
    });

    test('GET /:id - should return a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(201);
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
        expect(response.status()).toBe(404);
    });

    test('POST / - should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(201);
        const responseBody = await response.json()
        await expect.soft(responseBody.id).toBeDefined()
    });

    test('DELETE /:id - should delete a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(201);
        const responseBody = await response.json()
        const id = responseBody.id

        const response2 = await request.delete(`${baseURL}/${id}`);
        await expect(response2.status()).toBe(200)

    });

    test('DELETE /:id - should return 404 if user not found', async ({ request }) => {
        const response = await request.delete(`${baseURL}/1000`);
        expect(response.status()).toBe(404);
    });


});
