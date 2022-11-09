const mongoose = require('mongoose')

const vendor = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    vehicleModel: {
        type: String,
        required: true,
        trim: true
    }


})


module.exports = mongoose.model("Vendor", vendor)