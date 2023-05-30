
const hotels = require("../models/hotel")

//creating hotel

async function createHotel(req, res) {
    const newHotel = new hotels(req.body)
    try {
        const savedNewHotel = await newHotel.save()
        res.status(201).json(savedNewHotel)

    } catch (error) {
        res.status(402).json({ error: error.message })
    }
}

async function updateHOtel(req, res) {
    try {
        const updatedHotel = await hotels.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)

    } catch (error) {
        res.status(402).json({ error: error.message })

    }

}

const getAllHotel = async (req, res, next) => {
    const { min , max, ...others} = req.query;
    console.log({others, min , max});
    try {
        const Hotels = await hotels.find({featured: req.query.featured, price: { $gt : min |1, $lt: max ||9999}}).limit(req.query.limit);
        res.status(200).json(Hotels);
    } catch (err) {
        next(err);
    }
};

async function getCityByCount(req, res, next) {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return hotels.countDocuments({ city })
        }))

        return res.status(201).json(list)

    } catch (error) {
        res.status(402).json("Bad request")
    }
}

async function getCity(req, res, next) {
    const { min , max, ...others} = req.query;
    console.log({others, min , max});
    
    try {
        const cities = await hotels.find({city: req.query.cities, price: { $gt : min |1, $lt: max ||9999}}).limit(req.query.limit)
        console.log(cities);
        return res.status(201).json(cities)

    } catch (error) {
        res.status(402).json("Bad request")
    }
}

async function getByType(req, res, next) {

    try {
        const countHotel = await hotels.countDocuments({ type: "Hotel" })
        const countApartment = await hotels.countDocuments({ type: "Apartment" })
        const countVilla = await hotels.countDocuments({ type: "Villa" })
        const countResort = await hotels.countDocuments({ type: "Resort" })


        return res.status(201).json([
            { type: "Hotel", count: countHotel },
            { type: "Apartment", count: countApartment },
            { type: "Villa", count: countVilla },
            { type: "Resort", count: countResort },

        ])

    } catch (error) {
        res.status(402).json("Bad request")
    }
}






module.exports = { createHotel, updateHOtel, getAllHotel, getCityByCount, getByType, getCity }