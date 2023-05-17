const Seat = require('../models/Seat');
const User = require('../models/User');

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

module.exports = { insertSeatData, insertUserData };


