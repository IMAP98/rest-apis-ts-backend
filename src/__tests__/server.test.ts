import request from "supertest";
import server from "../server";

describe('GET /api', () => { 
    test('should first', async() => { 

        const res = await request(server).get('/api');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.msg).toBe('API');

        expect(res.status).not.toBe(404);

    });
});