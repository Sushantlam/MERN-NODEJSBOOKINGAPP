const room = require("../models/room")
const hotels = require("../models/hotel")
const createError = require("../utils/error")


//yesma 1st ma k vako cha vaney room create garna ko lagi paila kun hotel ko garne vanera chahciha ra tyo pachi roomma ayeko req euta thau store garera save garincha
//room save garesi hotel lae trigger garera hotelid pass garera push garne mongodb ma ani mongo ma by default push vaney huncha

async function createRoom (req,res,next){

    const hotelId= req.params.hotelId
    const newRoom =  new room(req.body)

    try {
        const savedRoom= await newRoom.save() 
        try {
            await hotels.findByIdAndUpdate(hotelId, {$push: savedRoom._id})
            res.status(200).json(savedRoom)
            
        } catch (error) {
            next(createError(400, "Error"))
       
        }
       
        
    } catch (error) {
       next(createError(400, "Youre room is not updated"))
        
    }

}

async function updateroom(req, res) {
    try {
        const updatedroom = await room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedroom)

    } catch (error) {
        res.status(402).json({ error: error.message })

    }

}

async function getAllroom(req, res) {
    try {
        const allroom = await room.find()
        res.status(200).json(allroom)

    } catch (error) {
        res.status(402).json({ error: error.message })

    }

}

async function deleteById(req, res) {
    try {
        const deleteRoom = await room.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteRoom)

    } catch (error) {
        res.status(402).json({ error: error.message })

    }

}

async function getRoomById(req, res) {
    try {
        const getRoomById = await room.findById(req.params.id)
        res.status(200).json(getRoomById)

    } catch (error) {
        res.status(402).json({ error: error.message })

    }

}









module.exports= {createRoom, getAllroom, updateroom, deleteById, getRoomById}