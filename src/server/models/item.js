const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = {
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    itemSize: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    qtyLeft: {
        type: Number,
        required: true,
    },
    storeId: {
        type: String,
        required: true,
    }
};

module.exports = mongoose.model('Item', ItemSchema);
