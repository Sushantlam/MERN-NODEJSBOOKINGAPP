const express =require("express")
const router =express.Router()
const { updateuser, getAlluser } = require("../controllers/user")
const { verifyToken, verifyAdmin, verifyUser } = require("../utils/user")

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("You're logged in")})

router.get("/checkauthentication/:id", verifyUser, (req,res,next)=>{
        res.send(`You're logged in as id`)})

router.get("/checkAdmin/:id", verifyAdmin, (req,res,next)=>{
        res.send("You're logged in as Admin and you can delete and update user")})

    
router.get("/",updateuser)

router.put("/:id",getAlluser)

module.exports= router
