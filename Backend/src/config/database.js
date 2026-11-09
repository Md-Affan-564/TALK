const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DATABASE CONNECTED SUCCESSFULLY")
    }catch(err){
        console.log("SOMETHING WENT WRONG",err.message)
        process.exit(1)
    }

}
module.exports = connectDB