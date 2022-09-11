import express from 'express';
import * as transactionController from '../controllers/transactionController.js';

const router = express.Router();

//router.get('/home', transactionController.getTransactions);
router.post('/add',transactionController.newTransaction);


export default router;