require('express-group-routes')
require('dotenv').config()

const express = require('express')
const router = require('./src/routers')
const rateLimit = require("express-rate-limit");
const cors = require('cors')

const app = express()
const port = process.env.PORT || 1120
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(limiter);

app.use('/', router)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      message: 'You are not authorized.'
    })
  } else {
    next(err)
  }
})

app.listen(port, () => console.log(`server is listening to port : ${port}`))