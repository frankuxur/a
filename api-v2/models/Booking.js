const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    // user who booked
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
    guests: {
        adults: Number,
        children: Number,
        infants: Number,
        pets: Number,
    },
    bookedOn: Date,    
    checkIn: Date,
    checkOut: Date,
    price: Number,
    nights: Number,
    serviceFee: Number,
    feedback: {
        comment: String,
        rating: Number,
    }
})

const BookingModel = mongoose.model('Booking', BookingSchema)

module.exports = BookingModel