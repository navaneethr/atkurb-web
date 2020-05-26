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
        type: Object,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    unitQuantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: Object,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    stockSize: {
        type: Number,
        required: true,
    },
    storeId: {
        type: String,
        required: true,
    }
};

module.exports = mongoose.model('Item', ItemSchema);
