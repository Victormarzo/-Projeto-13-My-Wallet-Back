import express from 'express';
import * as transactionController from '../controllers/transactionController.js';
import {hasUser} from '../middlewares/authorization.middleware.js'
const router = express.Router();

router.get('/home',hasUser, transactionController.getTransactions);
router.post('/add',hasUser,transactionController.newTransaction);


export default router;