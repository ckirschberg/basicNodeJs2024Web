const express = require('express')
const router = express.Router()
const getDatabaseConnection = require('../utils.js')
const { MongoClient, ServerApiVersion } = require("mongodb");

const hostname = '127.0.0.1';
const port = 3000;
const dbName = "myDB"; // DRY - Don't Repeat Yourself
const messageCollection = "messages"; // DRY - Don't Repeat Yourself

const client = getDatabaseConnection();


// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', new Date().toString())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('Messages')
})
// define the about route
router.post('/', (req, res) => {
  console.log("req", req.body);
  createMessage(req.body).then((result) => {
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 201;
    res.end(JSON.stringify({ ...req.body, _id: result.insertedId }));
  });
})

async function createMessage(message) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      
      const result = await client.db(dbName).collection(messageCollection).insertOne(message);

      console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
      );
      console.log("result object", result);
      return result;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

module.exports = router