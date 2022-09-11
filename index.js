import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signRouter from './routers/sign.routers.js'
import transactionRouter from './routers/transaction.router.js'


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(signRouter);
app.use(transactionRouter);


app.listen(5000, () => console.log(`App running in port: 5000`));