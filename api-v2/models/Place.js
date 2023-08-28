const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: String,
    area: String,
    address: {
        country: String,
        house: String,
        area: String,
        street: String,
        landmark: String,
        city: String,
        pin: String,
        state: String,
    },
    stats: {
        guests: Number,
        bedrooms: Number,
        beds: Number,
        bathrooms: Number,
    },
    perks: [String],
    photos: [String],
    title: String,
    highlights: [String],
    description: String,
    guestType: String,
    price: String,
    discounts: [String],
    lastStep: [String],
})

const PlaceModel = mongoose.model('Place', PlaceSchema)

module.exports = PlaceModel