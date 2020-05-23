const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const Item = require('../models/item');

router.get('/', authenticateToken, (req, res) => {
    res.send({ user: req.user });
});

router.post('/add', authenticateToken, (req, res) => {
    const {items} = req.body;
    const {storeId} = req.store;
    const payload = items.map((item) => ({...item, storeId}));
    Item.collection.insert(payload, function (err, data) {
        if (err){
            res.status(500).json({
                error: err
            })
        } else {
            console.log("Multiple documents inserted to Collection");
            res.status(200).json({
                user: req.user,
                items: data
            })
        }
    });

});

module.exports = router;
