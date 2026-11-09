const express = require('express')
const authRoutes = require('./modules/auth/auth.routes')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth",authRoutes)
module.exports = app
