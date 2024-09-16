const { createServer } = require('node:http');
const { MongoClient, ServerApiVersion } = require("mongodb");

const hostname = '127.0.0.1';
const port = 3000;

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
  
  // Connect to MongoDB
  //if (req.method === "POST") 
  run().catch(console.dir);

    res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');



});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const myDB = client.db("myDB");
    const myColl = myDB.collection("pizzaMenu");
    const doc = { name: "Neapolitan pizza", shape: "round" };
    const result = await myColl.insertOne(doc);
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    );
    console.log("result object", result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}