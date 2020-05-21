const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/user');


const firebaseConfig = {
    apiKey: "AIzaSyCEbw0BUv5jpWSZd0PlKk-upafDYdkBMuI",
    authDomain: "atkurb-95fd3.firebaseapp.com",
    databaseURL: "https://atkurb-95fd3.firebaseio.com",
    projectId: "atkurb-95fd3",
    storageBucket: "atkurb-95fd3.appspot.com",
    messagingSenderId: "579822281058",
    appId: "1:579822281058:web:d54da086d46af1659d0c3b",
    measurementId: "G-XWWNSQFM3D"
};

firebase.initializeApp(firebaseConfig);

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

router.post("/login", (req, res, next) => {
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
                    const token = jwt.sign({email: user.email, userId: user._id}, process.env.ACCESS_TOKEN_SECRET);
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
