const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  airline: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  seats: [{
    type: Schema.Types.ObjectId, 
    ref: 'Seat'
  }]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Flight', FlightSchema);
