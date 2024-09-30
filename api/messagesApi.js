const express = require('express')
const router = express.Router()
const getDatabaseConnection = require('../utils.js')
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require('mongoose');
const Message = require('../schemas/Message.js'); // Message is a mongoose model

const hostname = '127.0.0.1';
const port = 3000;
const dbName = "myDB"; // DRY - Don't Repeat Yourself
const messageCollection = "messages"; // DRY - Don't Repeat Yourself

const client = getDatabaseConnection();

mongoose.connect('mongodb://127.0.0.1:27017/myDB');

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', new Date().toString())
  
  next()
}
router.use(timeLog)

router.get('/', async (req, res) => {
  const messages = await Message.find({});
  res.status(200).json(messages);

  // getMessages().then((messages) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.statusCode = 200;
  //   console.log("messages", messages);
    
  //   res.end(JSON.stringify(messages));
  // });
})

router.post('/', async (req, res) => {
  try {
    // if (req.body.text !== "" && req.body.email !== "") { //manual validation
      console.log("req", req.body);
      const message = new Message({
        text: req.body.text,
        timestamp: new Date()
      });

      const result = await message.save();
      console.log("result", result);
      
      res.status(201).json(result);
    // }
  } catch (error) {
    console.log("error", error);
    
    res.status(500).json({ error });
  }
})

async function getMessages() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const messages = await client.db(dbName).collection(messageCollection).find().toArray();
    console.log("result object", messages);
    
    return messages;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
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