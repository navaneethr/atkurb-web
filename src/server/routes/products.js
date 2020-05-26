const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authenticateToken');
const Product = require('../models/products');

router.get('', authenticateToken, (req, res) => {
    let {searchValue} = req.query;
    Product.find({"name": new RegExp(".*"+searchValue+".*", "i")}).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    });
});

router.post('/add', authenticateToken, (req, res) => {
    const payload = req.body;
    Product.collection.insert(payload, function (err, data) {
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
