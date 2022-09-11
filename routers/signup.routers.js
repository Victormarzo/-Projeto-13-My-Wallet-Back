import express from 'express';
import * as signController from '../controllers/signController.js';

const router = express.Router();

router.post('/signup', signController.signUp);
router.post('/',signController.signIn);


export default router;