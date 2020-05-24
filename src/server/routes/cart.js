const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const User = require('../models/user');
const Item = require('../models/item');
const _ = require('lodash');

router.get('/', authenticateToken, (req, res) => {
    const {userId} = req.user;
    User.findOne({_id: userId}).then(user => {
        res.status(200).json(user.cart);

    }).catch((err) => {
        res.status(500).json(err)
    });
});

router.get('/complete', authenticateToken, (req, res) => {
    const {userId} = req.user;
    User.findOne({_id: userId}).then(user => {
        let cart = user.cart;
        let productIds = cart.map(({productId}) => productId);
        return Item.find( { _id : { $in : productIds } } ).then((items) => {
            let completeProducts = cart.map((cartProd) => {
                const itemsObj = items.filter((item) => item._id.equals(cartProd.productId))[0];
                console.log("itemsObj", {...itemsObj.toObject(), ...cartProd.toObject()});
                return {...itemsObj.toObject(), ...cartProd.toObject()};
            });
            console.log("completeProducts", completeProducts);
            res.status(200).json(completeProducts);
        })
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
