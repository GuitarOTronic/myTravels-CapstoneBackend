require('dotenv').load()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 2999
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')


const userRouter = require('./routes/users-router.js')
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/users', userRouter)


app.use((req, res) => {
  const status = 404;
  const message = `Could not find that`
  res.status(status).json({status, message})
})

app.use((error, req, res, next) => {
  console.log('In internal error', error.message);
  const message = error.message || 'Internal error'
  const status = error.status || 500
  res.status(status).json({message})
})

app.listen(port, () => {
  console.log('Listening on port: ', port);
})
