
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');

router.get('/', authenticateToken, (req, res) => {
    res.send({ user: req.user });
});

router.post('/', authenticateToken, (req, res) => {
    res.status(200).json({
        user: req.user
    })
});

module.exports = router;
