const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
//config
app.use(express.json())

//solve cors
app.use(cors({credentials: true, origin:`http://localhost:${process.env.CORS_FRONT_PORT}`}))

app.use(express.static('public'))
//import routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const petROutes = require('./routes/petRoutes')
//routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/pets', petROutes)

app.listen(process.env.EXPRESS_PORT,()=>{
    console.log(`running on port ${process.env.EXPRESS_PORT}`)
})