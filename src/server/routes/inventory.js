const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const Item = require('../models/item');
const Store = require('../models/store');

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
            console.log("Multiple documents inserted to Collection", data);
            const items = data.ops.map(({productDateStoreId, _id}) => ({productDateStoreId, itemId: _id}));
            Store.updateOne({_id: storeId}, { $push: { items: items }}).then(() => {
                res.status(200).json({
                    user: req.user,
                    items: data
                })
            }).catch(() => {
                res.status(500).json({
                    error: err
                })
            });
        }
    });

});

module.exports = router;
