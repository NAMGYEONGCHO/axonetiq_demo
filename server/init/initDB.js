const Seat = require('../models/Seat');
const User = require('../models/User');
const Flight = require('../models/Flight');

async function insertSeatData () {
    const data = await Seat.find();
    if(data.length !== 0) return;
    Seat.insertMany([
        {
            number: 1,
            status: false,
            bookedBy: null
        },
        {
            number: 2,
            status: false,
            bookedBy: null
        },
        {
            number: 3,
            status: false,
            bookedBy: null
        }
    ])
}

async function insertUserData () {
    const users = await User.find();
    if(users.length !== 0) return;
    User.insertMany([
        {
            name: 'john',
            tel: '23434512'
        },
        {
            name: 'Doe',
            tel: '11122234'
        }
    ])
}

async function insertFlightData () {
    const flights = await Flight.find();
    if(flights.length !== 0) return;
    Flight.insertMany([
        {
            flightNumber: 'FL001',
            airline: 'Airline 1',
            origin: 'City A',
            destination: 'City B',
            departureTime: new Date('2023-06-01T10:00:00'),
            arrivalTime: new Date('2023-06-01T12:00:00'),
            seats: ['6463542dfa5321566a258b29', '6463542dfa5321566a258b2a', '6463542dfa5321566a258b2b']
          }/* ,
          {
            flightNumber: 'FL002',
            airline: 'Airline 2',
            origin: 'City C',
            destination: 'City D',
            departureTime: new Date('2023-06-02T10:00:00'),
            arrivalTime: new Date('2023-06-02T12:00:00'),
            seats: ['6463542dfa5321566a258b32', '6463542dfa5321566a258b31']
          }, */
    ])
}

module.exports = { insertSeatData, insertUserData, insertFlightData };


