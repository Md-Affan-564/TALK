require('dotenv').config()


const app = require('./app')
const connectDB = require("./config/database")

const PORT = process.env.port || 5000
async function startServer (){
    await connectDB()
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`)
    })
}
startServer()