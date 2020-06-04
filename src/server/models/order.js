const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = {
    _id: Schema.Types.ObjectId,
    storeId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    associatedUser: {
        type: String,
        required: true,
    },
    userPhone:  {
        type: String,
        required: true,
    },
    userEmail:  {
        type: String,
        required: true,
    },
    userFullName:  {
        type: String,
        required: true,
    },
    date:  {
        type: Date,
        default: Date.now
    },
    orderCompleteTS: {
        type: Date,
        default: null
    },
    orderAcceptedTS: {
        type: Date,
        default: null
    },
    cost: {
        type: Object,
        required: true,
        default: {
            serviceFee: "0",
            taxes: "0",
            itemsCost: "0",
            shopperTip: "0"
        }
    },
    orderStatus: {
        type: Object,
        required: true,
        default: {
            pending: false,
            accepted: false,
            fulfilled: false
        }
    }

};

module.exports = mongoose.model('Order', OrderSchema);
