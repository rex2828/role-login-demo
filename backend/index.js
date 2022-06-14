const express = require('express')
const connectDb = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const authRoutes = require('./routes/auth')

connectDb()
dotenv.config()
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))

app.use(express.json())
app.use('/api',authRoutes)

app.listen(8080)