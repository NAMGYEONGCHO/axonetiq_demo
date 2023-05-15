const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    const locals = {
        title: "ticket book",
        description: "simple page"
    }
    res.render('index');
})

router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;