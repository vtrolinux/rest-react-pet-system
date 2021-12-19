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
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
//routes
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.listen(process.env.EXPRESS_PORT,()=>{
    console.log(`running on port ${process.env.EXPRESS_PORT}`)
})