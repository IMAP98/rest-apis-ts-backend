import express from "express";
import colors from 'colors';
import cors, { CorsOptions } from "cors";
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

export const connectDB = async () => {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue.bold('Connection successfully!'));
    } catch (error) {
        console.log('Has been an error:' + colors.bgRed.white( error));
        
    }
}

connectDB();

// NOTE: Axios instance
const server = express();

// NOTE: Allow connections
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('CORS error'));
        }
    }
}

server.use(cors(corsOptions));

// NOTE: Read data form
server.use(express.json());

// NOTE: API consult information
server.use(morgan('dev'));

server.use('/api/products', router);

// NOTE: Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
