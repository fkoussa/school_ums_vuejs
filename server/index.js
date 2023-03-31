const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/api/test', (req, res) => {
  res.send('Hello from Express!')
})

app.listen(3000, () => {
  console.log('Express server running on port 3000')
})
