const User = require("../models/user")
const bcrypt= require("bcryptjs")
const jwt = require("jsonwebtoken")

//To register newUser

async function userRegister(req, res) {

    var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.password, salt);

    try {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
    })
    await newUser.save()
    res.status(200).send(newUser)

    } catch (error) {
        res.status(400).send(error)
    }
}


//To Login with jwt token 

async function userLogIn(req, res) {
 try {
    const loginUser= await User.findOne({email: req.body.email})
    if(!loginUser) return res.status(402).send("user not found")

    const passwordUser = await bcrypt.compare(req.body.password, loginUser.password)
    if(!passwordUser) return res.status(401).send("Wrong password")

    const token = jwt.sign({id: loginUser._id, isAdmin: loginUser.isAdmin}, process.env.JWT )

    const {password, isAdmin, ...otherdetails} = loginUser._doc

    res.cookie("access_token", token,{
        httpOnly: true,
    }).status(200).json({...otherdetails})

    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports = {userRegister, userLogIn}