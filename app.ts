import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();
const app: express.Application = express()
app.use(express.json())


mongoose.connect(process.env.DB_CONNECTION!).then(() => {
    console.log(`Database connected to : ${process.env.DB_CONNECTION}`);
}).catch((err: Error) => {
    console.log(err);
});

app.get('/', function (req: express.Request, res: express.Response) {
    res.json({ message: "Hello App" })
});

app.get('/test', function (req: express.Request, res: express.Response) {
    res.json({ message: "Test" })
});

app.listen(process.env.PORT);