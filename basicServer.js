const { createServer } = require('node:http');
const { MongoClient, ServerApiVersion } = require("mongodb");

const hostname = '127.0.0.1';
const port = 3000;
const dbName = "myDB"; // DRY - Don't Repeat Yourself
const messageCollection = "pizzaMenu"; // DRY - Don't Repeat Yourself


//Set up connection to MongoDB
// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017"; // default mongodb 27017 port number
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

const server = createServer((req, res) => {
  // console.log(req);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  
  // Connect to MongoDB
  if (req.method === "POST") {
    let body = '';

    req.on("data", chunk => {
      body += chunk.toString();
    })

    req.on("end", () => {
      console.log("body", body);
      const data = JSON.parse(body);
      console.log("saving data", data);
    
      createMessage(data).then((result) => {
        console.log("result", result);
        const createdMessage = data;
        createdMessage._id = result.insertedId;

        
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        res.end(JSON.stringify(createdMessage));
        return;
      });
    })
  } else if (req.method === "GET") {

    getMessages().then((messages) => {
      
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(messages));
      return;
    });


    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({ a: 1 }));
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


async function getMessages() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const messages = await client.db(dbName).collection(messageCollection).find().toArray();
    console.log("result object", messages);
    
    return messages;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}

async function createMessage(data) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const myDB = client.db(dbName);
    const myColl = myDB.collection(messageCollection);
    // const doc = { name: "Neapolitan pizza", shape: "round" };
    const result = await myColl.insertOne(data);
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