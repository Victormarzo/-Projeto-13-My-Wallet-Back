import bcrypt from "bcrypt"
import {signUpSchema,signInSchema} from '../schemas/schemas.js'
import mongo from '../db/db.js';
import { v4 as uuid } from 'uuid';
let db = await mongo();

const signUp = async (req, res) => {
  const {name,email,password} = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  const validation = signUpSchema.validate(req.body, 
    {abortEarly: false,});  
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.status(422).send(errors);
    return;
  }
  try {
    const userExists = await db
      .collection('users')
      .findOne({ name:name });

    if (userExists) {
      res.sendStatus(409);
      return;
    }

    await db.collection('users').insertOne({
      name: name,
      email:email,
      password:passwordHash
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const signIn=async(req,res)=>{
  const {email,password}=req.body;
  const validation = signInSchema.validate(req.body, 
    {abortEarly: false,});  
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.status(422).send(errors);
    return;
  }

  try {
    const user = await db.collection('users').findOne({email})
    if (user && bcrypt.compareSync(password, user.password)){
      delete user.password
      const token = uuid();
      db.collection('sessions').insertOne({token,userId: user._id})

    return res.status(200).send(token)


    }else{
      return res.sendStatus(401);
    }

} catch (error) {

    res.sendStatus(500)
    console.error(error)
    return
}};

export { signUp,signIn };