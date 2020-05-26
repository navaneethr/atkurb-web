const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = {
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
    imgUrl: {
        type: String,
    },
    dairyFree: {
        type: Boolean,
    },
    glutenFree: {
        type: Boolean,
    }
};

module.exports = mongoose.model('Product', ProductSchema);
