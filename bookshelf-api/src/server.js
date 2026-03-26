const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(routes)

app.listen(9000, () => {
  console.log('Backend running on http://localhost:9000')
})