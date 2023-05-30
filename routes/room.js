const express =require("express")
const { createRoom, getAllroom, updateroom, getRoomById, deleteById } = require("../controllers/room")
const { verifyAdmin, verifyUser } = require("../utils/user")
const router =express.Router()

router.post("/:hotelId", verifyUser, createRoom)

router.put("/:id", verifyAdmin, updateroom)

router.get("/:id", getRoomById)

router.delete("/:id", deleteById)

router.get("/", getAllroom)

module.exports= router