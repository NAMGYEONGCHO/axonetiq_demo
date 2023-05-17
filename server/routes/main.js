const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Seat = require('../models/Seat')
const User = require('../models/User')
const { insertSeatData, insertUserData } = require('../init/initDB'); 

/**
 * get Data for iniitial page load 
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

/**
 * Initiate DB
 */
insertSeatData();
insertUserData();

router.post('/book', async (req, res) => {
    const { seatId, userId, action } = req.body;
   
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const seat = await Seat.findById(seatId).session(session);
        //if seat is occipied by others.
        if (seat.status && (seat.bookedBy !== userId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: 'Seat is already booked.' });
        }

        if(action === 'cancel') {
            // perform cancel operation here
            if(seat.bookedBy === userId) {
                seat.status = false;
                seat.bookedBy = null;
                await seat.save({session});
                await session.commitTransaction();
                session.endSession();
                return res.json({ success: true, message: 'Seat booking cancelled successfully.' });
            }
        } else {
            // perform book operation here
            seat.status = true;
            seat.bookedBy = userId;
            await seat.save({session});
            await session.commitTransaction();
            session.endSession();
            return res.json({ success: true, message: 'Seat booked successfully.' });
        
        }
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error(err);
        res.json({ success: false });
    }
});

//For testing route
router.get('/about', (req, res) => {
    res.render('about');
})

//init tables for the first time


module.exports = router;

