import express  from "express";
import router from "./router";
import db from "./config/db";

const connectDB = async () => {
    try {
        await db.authenticate();
        db.sync();
        console.log('Successfull');
    } catch (error) {
        console.log(error);
        console.log('Nulla sunt ut ut aute fugiat fugiat magna cillum.');
        
    }
}

connectDB();

const server = express();

server.use('/api/products', router);

export default server;