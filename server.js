const express= require("express")
const app = express()
const {connectMongoDb}= require("./connect")
const user = require("./routes/user")
const hotels = require("./routes/hotel")
const room = require("./routes/room")
const auth = require("./routes/auth")
const dotenv= require("dotenv")
const cors= require("cors")
const cookieParser = require("cookie-parser")

dotenv.config()
app.use(cors())
app.use(cookieParser())

// console.log("Mongodb connnected")
// app.listen(process.env.PORT || 5000 , (err)=>{
//     if(err) console.log(err);
//     console.log("Running at", process.env.PORT);
// })
// }).catch((e)=>{
// console.log(e)
// })

//middlewarre

app.use(express.json())


//connection of MongoDb
connectMongoDb(process.env.URI).then(()=>{
    console.log('MongoDb connected')
    app.listen(process.env.PORT , (err)=>{
        if (err) console.log(err)
        console.log("Sucessfully runiing at ", process.env.PORT)
    })
}).catch((error)=>{
    console.log(error)
})


app.get("/", (req,res)=>{
    res.send("Hello from server")
})

//routes

app.use("/user", user)
app.use("/room", room)
app.use("/hotels", hotels)
app.use("/auth", auth)

// app.listen(PORT, ()=>{
//     console.log(`Hello from server ${PORT}`)
// })