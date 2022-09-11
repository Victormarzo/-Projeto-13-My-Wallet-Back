
import {transactionSchema} from '../schemas/schemas.js'
import mongo from '../db/db.js';
import dayjs from "dayjs"

let db = await mongo();


const newTransaction = async (req,res)=>{
const {operation,value,description}=req.body;
const validation = transactionSchema.validate(req.body, 
    {abortEarly: false,});  
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.status(422).send(errors);
    return;
  }

  let transaction={
    operation,value,description,date: dayjs().format("DD/MM")
  }
try {
    await db.collection('transactions').insertOne(transaction);
    res.sendStatus(201);
} catch (error) {
    console.error(error);
      res.sendStatus(500);
}



};

export {newTransaction}