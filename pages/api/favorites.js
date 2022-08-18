import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware


handler.post(async (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  try {
    res = await req.db.collection('users').updateOne(
      { _id: ObjectID(req.body['userID'])},
      { $push: { favorites: req.body['photoID'] } }
    );
    console.log(`Updated ${res.result.n} documents`);
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
  }
});




export default handler;