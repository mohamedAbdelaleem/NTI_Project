import express from 'express';
import dotenv from "dotenv";
import categoryRouter  from './routes/categoryRoutes';
import subCategoryRouter from './routes/subCategoryRoutes';
import databaseSetup from './config/database';
import mountRoutes from './routes';
import errorHandler from './middlewares/errorHandler';


dotenv.config();
databaseSetup();

const app: express.Application = express()
app.use(express.json())

mountRoutes(app);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("server is running")
});