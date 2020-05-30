const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const User = require('../models/user');

router.get('/', authenticateToken, (req, res) => {
    User.findOne({_id: req.user.userId}).then((data) => {
        const {password, lastLogin, createdAt, ...rest} = data.toObject();
        res.status(200).json({...rest})
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', authenticateToken, (req, res) => {
    res.status(200).json({
        user: req.user
    })
});

router.post('/update/checkout', authenticateToken, (req, res) => {
    const {storeId} = req.body;
    User.findOneAndUpdate({_id: req.user.userId}, {'checkOutStore': storeId}).then((data) => {
        const {password, lastLogin, createdAt, ...rest} = data.toObject();
        res.status(200).json({
            user: {...rest}
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;
