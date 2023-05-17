const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BookingsSchema = new Schema({
    UserID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    FlightID: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    SeatID:{
        type: String,
        required: true
    },
    Payment: {
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

module.exports = mongoose.model('Booking', BookingsSchema);
