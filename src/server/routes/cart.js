const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const User = require('../models/user');

router.get('/', authenticateToken, (req, res) => {
    const {userId} = req.user;
    User.findOne({_id: userId}).then(user => {
        res.status(200).json(user.cart);

    }).catch((err) => {
        res.status(500).json(err)
    });
});

router.post('/add', authenticateToken, (req, res) => {
    console.log(req.user);
    const {userId} = req.user;
    User.update({_id: userId}, {$set: {cart: req.body}}).then((data) => {
        return User.findOne({_id: userId}).then(user => {
            res.status(200).json(user.cart);
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
});

module.exports = router;
