import { connectDB } from "../server";
import db from "../config/db";

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