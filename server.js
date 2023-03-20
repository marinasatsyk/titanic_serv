import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();

dotenv.config();

const {
    APP_LOCALHOST: hostname,
    APP_PORT: port, //8000
    MONGODB_ADDRESS,
    APP_COLLECTION_MONGOOSE
} = process.env;

 mongoose.set('strictQuery', false);
mongoose.connect(
    // `mongodb://${MONGODB_ADDRESS}/${APP_COLLECTION_MONGOOSE}`,
    `${MONGODB_ADDRESS}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({extended: true}) );
app.use( '/', routes );

app.listen( port, () => {
    console.log(`API running, listening at http://${hostname}:${port}`);
})