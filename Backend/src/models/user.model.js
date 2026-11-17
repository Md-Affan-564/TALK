const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true

    },
    profilePic:{
        type: String,
        required: false

    },
    },{
    timestamps: true
})

module.exports = mongoose.model("userModel",userSchema)