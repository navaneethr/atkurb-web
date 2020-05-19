const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', (req, res) => res.send({ user: "user" }));

router.post('/', (req, res) => {
    const user = new User({
        fullName: req.body.fullName,
        phone: req.body.phone,
    });
    console.log(req.body);

    user.save();


});

module.exports = router;
