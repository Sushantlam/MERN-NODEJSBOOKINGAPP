const mongoose = require("mongoose")
 
const roomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
       
    },
    desc: {
        type: String,
        required: true,
},
    roomsNumber: 
        [{number: Number, unavailableDate: [Date]}]},

        {timestamps: true})

const room= mongoose.model("rooms", roomSchema)

module.exports= room