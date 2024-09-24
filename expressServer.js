const express = require('express')
var cors = require('cors')
const messagesApi = require('./api/messagesApi.js')

const app = express()
const port = 3003

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use('/messages', messagesApi)

app.get('/', (req, res) => {
  res.send('Hello World! This is so much better now!')
})

app.get('/traveldestinations', (req, res) => {
    res.send("Getting all travel destinations")
});

app.post("/traveldestinations", (req, res) => {
    console.log("req", req.body);

     // TODO: Send back the created object or at least the new id
    res.send("Creating new travel destination")
})

app.put("/traveldestinations/:travelDestinationId", (req, res) => {
    console.log("req", req.body);
    console.log("params", req.params);
    res.send("Updating travel destination")
})

app.get('/:id', (req, res) => {
    console.log("params", req.params);
    
    res.send('Hello World! This is so much better now!')
  })

  app.get('/messages/:id', (req, res) => {
    console.log("params", req.params);
    
    res.send('Hello World! This is so much better now!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})