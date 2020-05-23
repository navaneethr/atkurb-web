const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const Store = require('../models/store');
const Item = require('../models/item');

router.get('/all', authenticateToken, (req, res) => {
    Store.find()
        .then((data) => {
            data = data.map(({_id, storeName}) => ({_id, storeName}));
            res.status(200).json(data)
        })
        .catch(() => {

        })
});

router.get('/products', authenticateToken, (req, res) => {
    const {storeId} = req.query;
    console.log(storeId);
    Item.find({"storeId" : storeId}).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).send(err)
    });
});

module.exports = router;
