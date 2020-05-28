const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const Store = require('../models/store');
const Item = require('../models/item');
const _ = require('lodash');

router.get('/all', authenticateToken, (req, res) => {
    Store.find()
        .then((data) => {
            data = data.map(({_id, storeName}) => ({_id, storeName}));
            res.status(200).json(data)
        })
        .catch(() => {

        })
});

router.post('/', authenticateToken, (req, res) => {
    const storeIds = req.body.storeIds;
    console.log(storeIds);
    Store.find({'_id': {$in: storeIds}})
        .then((data) => {
            console.log(data);
            data = data.map(({_id, storeName, phone, email}) => ({_id, storeName, phone, email}));
            res.status(200).json(data)
        })
        .catch(() => {
            res.status(500).send(err);
        })
});

router.get('/', authenticateToken, (req, res) => {
    const {storeId} = req.query;
    Store.findOne({_id: storeId})
        .then((data) => {
            const {storeName, phone, email, _id} = data;
            res.status(200).json({storeName, phone, email, _id})
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get('/products', authenticateToken, (req, res) => {
    const {storeId, category} = req.query;
    console.log(storeId, category);
    if(_.isEmpty(category) || category === "all") {
        Item.find({"storeId" : storeId}).then((data) => {
            console.log(data);
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).send(err)
        });
    } else {
        Item.find({"storeId" : storeId, "category": category}).then((data) => {
            console.log(data);
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).send(err)
        });
    }
});

module.exports = router;
