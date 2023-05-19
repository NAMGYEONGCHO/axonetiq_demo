const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Seat = require('../models/Seat')
const User = require('../models/User')
const Bookings = require('../models/Bookings')
const { insertSeatData, insertUserData, insertFlightData } = require('../init/initDB'); 

/**
 * get Data for iniitial page load 
 */
router.get('', async (req, res) => {

    try {
        // Get seat data
        const data = await Seat.find();
        
        // Get user data
        const users = await User.find();
        // Assume you have a specific userID

        // Get bookings for a specific user
        const bookings = await Bookings.find({isActive: true}).populate('userID').populate('flightID').populate('seatID');

        res.render('index', { data, users, bookings });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while retrieving data'); // Send an error response
    }
})

// ticket-booking\server\routes\main.js
router.get('/bookings', async (req, res) => {
    try {
        // Get bookings for a specific user
        const bookings = await Bookings.find({isActive: true}).populate('userID').populate('flightID').populate('seatID');
        res.json({ bookings });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while retrieving bookings'); // Send an error response
    }
})

/**
 * Initiate DB
 */
insertSeatData();
insertUserData();
insertFlightData ();

router.post('/book', async (req, res) => {
    const { seatId, userId, action } = req.body;
   
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const seat = await Seat.findById(seatId).session(session);
        //if seat is occipied by others.
        if (seat.status && (seat.bookedBy.toString() !== userId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: 'Seat is already booked.' });
        }

        if(action === 'cancel') {
            // perform cancel operation here
            if(seat.bookedBy.toString() === userId) {
                seat.status = false;
                seat.bookedBy = null;
                await seat.save({session});

                // Find the booking and deactivate it
                const booking = await Bookings
                    .findOne({ seatID: seatId, userID: userId, isActive: true })
                    .sort({createdAt: 'desc'})
                    .session(session);
                
                if (booking) {
                    booking.isActive = false;
                    await booking.save({session});
                }

                await session.commitTransaction();
                session.endSession();
                return res.json({ success: true, message: 'Seat booking cancelled successfully.' });
            }
        } else {
            // perform book operation here
            seat.status = true;
            seat.bookedBy = userId;
            await seat.save({session});

            // Create new booking
            const bookings = new Bookings({
                userID: userId,
                seatID: seatId,
                flightID: '6465102d13cd7c0b27dd4dcb',// at the moment, assuming we have only one air plane. reason for hard coded
                isActive: true,
                bookingTime: new Date(),
                payment: {
                    paymentProcessor: 'paymentProcessor_1',
                    paymentReference: 'paymentReference_1'
                }
            });
            
            // Save the booking to the database
            await bookings.save();

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

