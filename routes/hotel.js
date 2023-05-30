const express =require("express")
const router =express.Router()
const { createHotel, updateHOtel, getAllHotel, getCityByCount, getByType } = require("../controllers/hotels")

router.route("/").post(createHotel).get(getAllHotel)

router.route("/:id").put(updateHOtel)

router.get("/countByCity", getCityByCount)

router.get("/getByType", getByType)

module.exports= router
