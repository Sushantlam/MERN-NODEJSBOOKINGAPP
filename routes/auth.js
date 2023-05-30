const express =require("express")
const router =express.Router()
const {userRegister, userLogIn}= require("../controllers/auth")

router.post("/register",userRegister)
router.post("/login",userLogIn)

module.exports= router