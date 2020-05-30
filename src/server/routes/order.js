const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const Order = require('../models/order');
const Store = require('../models/store');
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/place', authenticateToken, (req, res) => {
    const payload = req.body;
    console.log(payload.storeId);
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        storeId: payload.storeId,
        items: payload.items,
        associatedUser: payload.associatedUser,
        userPhone: payload.userPhone,
        userEmail: payload.userEmail,
        cost: {
            serviceFee: payload.cost.serviceFee,
            taxes: payload.cost.taxes,
            itemsCost: payload.cost.itemsCost,
            shopperTip: payload.cost.shopperTip
        },
        orderStatus: {
            pending: true,
            accepted: false,
            fulfilled: false
        }
    });
    order.save().then((data) => {
        console.log(data);
        const orderId = data._id;
        return Promise.all([
                Store.updateOne({_id: payload.storeId}, { $push: { orders: [orderId] }}),
                User.updateOne({_id: payload.associatedUser}, { $push: { orders: [orderId] }, $pullAll: {cart: payload.items }, $set: {checkOutStore: ""} })
        ]);
    }).then((data) => {
        console.log(data);
        return User.findOne({_id: payload.associatedUser});
    }).then((data) => {
        const {password, lastLogin, createdAt, ...rest} = data.toObject();
        res.status(200).json(rest);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

router.get('', authenticateToken, (req, res) => {
    User.findOne({_id: req.user.userId}).then((data) => {
        const {orders} = data.toObject();
        return Order.find({'_id': { $in: orders }})
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })

});

module.exports = router;
