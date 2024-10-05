import express  from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors';

const connectDB = async () => {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue.bold('Connection successfully!'));
    } catch (error) {
        console.log('Has been an error:' + colors.bgRed.white( error));
        
    }
}

connectDB();

// NOTE: Axios instance
const server = express();

// NOTE: Read data form
server.use(express.json());

server.use('/api/products', router);

export default server;