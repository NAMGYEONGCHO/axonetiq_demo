const express = require('express');
const router = express.Router();
const Seat = require('../models/Seat')
const User = require('../models/User')
/**
 * 
 */
router.get('', async (req, res) => {
    const locals = {
        title: "ticket book",
        description: "simple page"
    }

    try {
        const data = await Seat.find();
        const users = await User.find();
        res.render('index', { locals, data, users });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while retrieving data'); // Send an error response
    }
})



/* app.put('/bookings/:id', (req, res) => {
    // Get the id from the request parameters
    const id = req.params.id;
  
    // Get the new status from the request body
    const newStatus = req.body.status;
  
    // Connect to MongoDB and update the seat
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("tickets").updateOne({_id: new ObjectId(id)}, {$set: {status: newStatus}}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    });
  
    res.send('Seat updated');
  }); */

router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;

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