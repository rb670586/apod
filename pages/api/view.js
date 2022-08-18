import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

handler.get(async (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  try {
    const queryResult = await req.db.collection('users').find({ _id: ObjectID(req.user['_id']) }).toArray().then(result => {
      res.send(result)
    })
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
  }
});

export default handler;