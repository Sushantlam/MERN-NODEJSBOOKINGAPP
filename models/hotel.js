const mongoose = require("mongoose")
 

const hotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true,
       },
       featured:{
        type: Boolean,
        default:false

       },
       price:{
        type: Number,
        required: true,
       },
    rooms:{
        type: [String]
    },
    rating:{
        type: String,
        required: true
    },
    
})

const hotels= mongoose.model("hotels", hotelSchema)

module.exports= hotels