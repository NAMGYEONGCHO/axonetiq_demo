const express = require('express');
const router = express.Router();
const Seat = require('../models/Seat')
const User = require('../models/User')
/**
 * 
 */
router.get('', async (req, res) => {

    try {
        // Get seat data
        const data = await Seat.find();
        // Get user data
        const users = await User.find();
        res.render('index', { data, users });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while retrieving data'); // Send an error response
    }
})

router.post('/book', async (req, res) => {
    const { seatId, userId, action } = req.body;

    try {
        const seat = await Seat.findById(seatId);
        
        if(action === 'cancel') {
            // perform cancel operation here
            if(seat.bookedBy === userId) {
                seat.status = false;
                seat.bookedBy = null;
            }
        } else {
            // perform book operation here
            seat.status = true;
            seat.bookedBy = userId;
        }
        await seat.save();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

//For testing route
router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;

//init tables for the first time
/* function insertSeatData () {
    Seat.insertMany([
        {
            number: 1,
            status: false
        },
        {
            number: 2,
            status: false
        },
        {
            number: 3,
            status: false
        }
    ])
}

insertSeatData(); */

/* function insertUserData () {
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

insertUserData(); */