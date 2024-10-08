import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe('GET /api', () => { 

    test('should first', async() => { 

        const res = await request(server).get('/api');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.msg).toBe('API');

        expect(res.status).not.toBe(404);

    });

});

jest.mock('../config/db');

describe('connectDB', () => {

    test('Should handle database connection error', async() => { 

        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Has been an error:'));

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Has been an error:'),
        );

    });

});