const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SeatSchema = new Schema({
    number:{
        type: Number,
        required: true
    },
    status: {
        type:Boolean,
        required: true
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

module.exports = mongoose.model('Seat', SeatSchema)