const express = require('express')
const router = express.Router()
const {register,login,logout,getMe} = require('./auth.controller')
const protectRoute = require('../../middleware/auth.middleware')



router.post("/register",register)
router.post("/login",login)
router.get("/me",protectRoute,getMe)
router.post("/logout",logout)
module.exports = router