const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/user');
const Store = require('../models/store');

router.get('/', (req, res) => res.send({ auth: "auth" }));

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email})
        .exec()
        .then((user) => {
            if(user) {
                res.status(409).json({
                    message: "Mail Exists"
                })
            } else {
                console.log("Else 1");
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        fullName: req.body.fullName,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: hash
                    });
                    if(err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        console.log("ELSE 2");
                        user.save().then((data) => {
                            console.log(data);
                            res.status(200).json({
                                "message": "User Created"
                            });
                        }).catch((err) => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});
router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user);
            if (!user) {
                return res.status(401).json({
                    message: "User doesn't exist"
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    console.log("User", user);
                    const token = jwt.sign({fullName: user.fullName, email: user.email, userId: user._id}, process.env.ACCESS_TOKEN_SECRET);
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/business/register', (req, res) => {
    Store.findOne({ email: req.body.email})
        .exec()
        .then((store) => {
            if(store) {
                res.status(409).json({
                    message: "Mail Exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    const store = new Store({
                        _id: new mongoose.Types.ObjectId(),
                        storeName: req.body.storeName,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: hash
                    });
                    if(err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        store.save().then((data) => {
                            console.log(data);
                            res.status(200).json({
                                "message": "Store Created"
                            });
                        }).catch((err) => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});
router.post('/business/login', (req, res) => {
    Store.findOne({ email: req.body.email })
        .exec()
        .then(store => {
            if (!store) {
                return res.status(401).json({
                    message: "Store doesn't exist"
                });
            }
            bcrypt.compare(req.body.password, store.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    console.log("Store", store);
                    const token = jwt.sign({storeName: store.storeName, email: store.email, storeId: store._id}, process.env.ACCESS_TOKEN_SECRET);
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
