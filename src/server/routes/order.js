const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const Order = require('../models/order');
const Store = require('../models/store');
const User = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nkrameshwaram@gmail.com',
        pass: '@Spring2017'
    }
});

function generateHtmlEmail(items, fullName, cost) {
    const images = items.reduce((acc, curr) => { return acc + `<div style="border-radius: 4px; box-sizing: border-box; height: 80px; width: 80px; background: white; margin: 10px; padding: 20px;"><img style="width: 100%" src="${curr.imgUrl}"}/></div>`}, "");
    const totalCost = (parseFloat(cost.serviceFee) + parseFloat(cost.taxes) + parseFloat(cost.itemsCost) + parseFloat(cost.shopperTip)).toFixed(2);
    return `
        <div style="text-align: center; justify-content: center; align-items: center; color: #505050;">
              <img src="https://storage.googleapis.com/atkurb/atkurb.png" width="100"/>
              <div style="margin: 20px auto; font-size: 20px; font-weight: bold; color: #505050;">
                  We received your order ${fullName}
              </div>
              <div style=" box-sizing: border-box; background: #dedede; padding: 10px; border-radius: 4px; margin: 10px; display: flex; flex-wrap: wrap; max-width: 420px; margin: auto;">
              ${images}
              </div>
              <div style="margin: 20px auto; font-size: 20px; font-weight: bold; color: #505050;">
                Thank you for ordering AtKurb and keeping the community safe.
              </div>
              <div style="margin: 20px auto; font-size: 14px; color: #505050; font-weight: bold;">
                You can track your order at <a href="www.atkurb.com/orders">AtKurb</a>
              </div>
              <div style="margin: 20px auto; font-size: 14px; font-weight: bold; color: #505050;">
                Total Cost is ${"$"+totalCost}
              </div>
        </div>
    `
}



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
        const mailOptions = {
            from: 'nkrameshwaram@gmail.com',
            to: req.user.email,
            subject: 'Thank you for your Order - AtKurb',
            html: generateHtmlEmail(payload.items, req.user.fullName, payload.cost)
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return Promise.all([
                Store.updateOne({_id: payload.storeId}, { $push: { orders: [orderId] }}),
                User.updateOne({_id: payload.associatedUser}, { $push: { orders: [orderId] }, $pullAll: {cart: payload.items }, $set: {checkOutStore: ""} })
        ]);
    }).then((data) => {
        console.log("-------------------------");
        console.log(data);
        console.log("-------------------------");
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
        const storeIds = Object.keys(_.groupBy(data, 'storeId'))
        Store.find({'_id': { $in: storeIds }}).then((stores) => {
            stores = stores.map(({email, phone, storeName, _id}) => ({email, phone, storeName, _id}));
            res.status(200).json({items: data, storeDetails: stores});
        }).catch((err) => {
            res.status(500).json({
                error: err
            })
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })

});

router.get('/store', authenticateToken, (req, res) => {
    Store.findOne({_id: req.store.storeId}).then((data) => {
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
