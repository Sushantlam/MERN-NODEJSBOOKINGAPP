const users = require("../models/user")



async function updateuser(req, res) {
    try {
        const updatedUser = await users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(402).json({ error: error.message })

    }

}

async function getAlluser(req, res) {
    try {
        const alluser = await users.find()
        res.status(200).json(alluser)

    } catch (error) {
        res.status(402).json({ error: error.message })

    }

}




module.exports = {  updateuser, getAlluser}