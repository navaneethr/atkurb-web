/*import {Order} from "./order";*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    _id: Schema.Types.ObjectId,
    storeName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    items: {
        type: [Object]
    },
    orders: {
        type: Array
    }
});

module.exports = mongoose.model('Store', StoreSchema);


/*export const Store = {
    id: "UUID",
    name: "String",
    phone: "String",
    email: "String",
    password: "String",
    addressLine1: "String",
    addressLine2: "String",
    city: "String",
    state: "String",
    country: "String",
    zip: "String",
    orders: [Order]
};*/
