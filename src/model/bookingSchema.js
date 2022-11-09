const mongoose = require('mongoose')

const booking = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true, index: true, trim: true },
    context: { type: String, required: true, trim: true },
    sourceType: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    source: {
        name: { type: String, required: true, trim: true },
        address: {
            address: { type: String, required: true, trim: true },
            location: { type: String, required: true, trim: true },
            city: { type: String, required: true, trim: true },
            state: { type: String, required: true, trim: true },
            postalCode: { type: String, required: true, trim: true },
            country: { type: String, required: true, trim: true }
        },
        latitude: { type: String, required: true, trim: true },
        longitude: { type: String, required: true, trim: true },
    },

    destination: {
        name: { type: String, required: true, trim: true },
        address: {
            address: { type: String, required: true, trim: true },
            location: { type: String, required: true, trim: true },
            city: { type: String, required: true, trim: true },
            state: { type: String, required: true, trim: true },
            postalCode: { type: String, required: true, trim: true },
            country: { type: String, required: true, trim: true },
            coordinates: {
                latitude: { type: String, required: true, trim: true },
                longitude: { type: String, required: true, trim: true }
            }
        },
        
    },
    bookingTime: { type: Date, required: true },
    pickupTime: { type: Date, required: true }
})

module.exports = mongoose.model("Booking", booking)