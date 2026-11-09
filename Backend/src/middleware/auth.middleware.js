const jwt = require('jsonwebtoken')
const userModel = require('../modules/auth/user.model')


async function protectRoute (req,res,next){
    try{let token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Please sign in or sign up. this is 401"
        })
    }
    let info = jwt.verify(token,process.env.JWT_SECRET)
    if(info){
        let user = await userModel.findOne({_id:info.userId})
        if (user){
            req.user = {username:user.username,email:user.email}
            next()
        }else{
            return res.status(401).json({
                message:"Please sign in or sign up it is also 401"
            })
        }
    }else{
        return res.status(401).json({
            message:"Please sign in or sign up this is 401"
        })
    }}catch(err){
        if (
            err.name === "JsonWebTokenError" ||
            err.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                message: "Please sign in. also 401"
            })
        }else{
            return res.status(500).json({
                message:err.message
            })
        }
    }
}

module.exports = protectRoute