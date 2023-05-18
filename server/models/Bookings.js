const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BookingsSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flightID: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    seatID:{
        type: String,
        ref: 'Seat',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    payment: {
        paymentProcessor: {
            type: String,
            required: true
        },
        paymentReference: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bookings', BookingsSchema);
