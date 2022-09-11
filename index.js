import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signUpRouter from './routers/signup.routers.js'



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(signUpRouter);



app.listen(5000, () => console.log(`App running in port: 5000`));