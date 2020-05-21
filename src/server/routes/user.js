
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticateToken = require('../utils/authenticateToken');

router.get('/', (req, res) => res.send({ user: "user" }));

router.post('/', authenticateToken, (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });
    console.log(req.body);
    user.save().then((data) => {
        console.log(data);
        res.send({"hello": data});
    }).catch((err) => {
        console.log(err)
    });
});

module.exports = router;
