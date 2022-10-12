const mongoose = require('mongoose')
const express = require('express')
const app = express()
const helmet = require('helmet')
const config = require('config')
const cors = require('cors')
const morgan = require('morgan')
const https = require('https')
const path = require('path')
const fs = require('fs')

const userRoute = require('./Routes/UserRoute')
const authRoute = require('./Routes/auth')
const postRoute = require('./Routes/PostRoute')

mongoose
  .connect(
    'mongodb+srv://arunkarthik:7GWkWQNgZ3FBn2eC@cluster0.zwechjs.mongodb.net/?retryWrites=true&w=majorityp',
  )
  .then(() => console.log('Connected to Database'))
  .catch((er) => console.log('Could not connect', er))

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('common'))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

const port = process.env.PORT || 12000
app.listen(port, () => console.log(`Listening to port ${port}`))
