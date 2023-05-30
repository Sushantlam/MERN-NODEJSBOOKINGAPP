const createError= require("./error")
const jwt = require("jsonwebtoken")

//yesma chae user register cha ra login garda jwt token chae correet cha ki chaina vanda use huncha

function verifyToken (req,res, next){
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401, "You're not authenticated"))
    }
     //yesma user vaneko cha,jwtma sign huncha kheri use vako userid ra admin ho 
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err)  return next(createError(403, "Token isn't valid"))
        req.user = user
        // yedi kei error chaina vaney chae user lai req ma halera pathaune 
        next()
    
})}


//
function verifyUser(req,res, next){
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403, "You are not authorized"))
        }

    })

}
function verifyAdmin(req,res, next){
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403, "You are not admin"))
        }

    })

}




module.exports = {verifyToken, verifyUser, verifyAdmin}
