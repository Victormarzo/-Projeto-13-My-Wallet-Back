import mongo from '../db/db.js';

async function hasUser(req, res, next) {
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")

  try {
    let db = await mongo();
    
    const user = await db.collection('sessions').findOne({
      token,
    });

    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.token = user;
    
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export {hasUser};