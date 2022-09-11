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
  
  try {
      
   let user=res.locals.token
    let transaction={
      operation,value,description,date: dayjs().format("DD/MM"),userId:user.userId
    }
    await db.collection('transactions').insertOne(transaction);
      res.sendStatus(201);
  } catch (error) {
      console.error(error);
        res.sendStatus(500);
  }

};

const getTransactions=async(req,res)=>{
  
  try {
    const user =res.locals.token
    
  
    const transactions=await db.collection('transactions').find({userId: user.userId}).toArray();
    let result=sumResult(transactions)
    
    let final={transactions:transactions,result:result}
      res.send(final);
} catch (error) {
  console.error(error);
  res.sendStatus(500);
}

};


function sumResult(arr){
  let obj= {}
  let sum=0;
  arr.forEach(transaction=>{
      if(transaction.operation==='positive'){
          sum+=Number(transaction.value.replace(',','.'))
      }else{
          sum-=Number(transaction.value.replace(',','.'))
      }
  })
  if (sum>0){
      obj={
          soma:sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.','x').replace(',','.').replace('x',','),
          operation:'positive'
      }
  }else{
      obj={
          soma:sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.','x').replace(',','.').replace('x',','),
          operation:'negative'
      }
  }
  
  return obj;

}

export {newTransaction,getTransactions}