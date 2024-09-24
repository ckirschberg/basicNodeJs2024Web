const { MongoClient, ServerApiVersion } = require("mongodb");

const getDatabaseConnection = () => {
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
    return client;
}

module.exports = getDatabaseConnection