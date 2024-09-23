const express = require('express')
var cors = require('cors')
const app = express()
const port = 3003

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World! This is so much better now!')
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