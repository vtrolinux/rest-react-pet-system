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

//routes

app.listen(process.env.EXPRESS_PORT,()=>{
    console.log(`running on port ${process.env.EXPRESS_PORT}`)
})