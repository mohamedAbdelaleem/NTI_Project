import express from 'express';
import dotenv from "dotenv";
import databaseSetup from './config/database';
import mountRoutes from './routes';
import errorHandler from './middlewares/errorHandler';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';


dotenv.config();
databaseSetup();

const app: express.Application = express();

app.use(express.json({ limit: '10kb' }));
app.use(cors({
  origin: ['http://localhost:4200', 'https://dramcode.top'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(compression());
app.use(mongoSanitize());
app.use(hpp({ whitelist: ['price', 'category', 'subcategory', 'ratingAverage', 'sold'] }));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.static('uploads'))

mountRoutes(app);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("server is running")
});