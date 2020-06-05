const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = new Schema({
    line1: {
        type: String
    },
    line2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zip: {
        type: String
    },
});

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
    },
    address: {
        type: AddressSchema,
        default: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            country: "",
            zip: ""
        }
    }
});

module.exports = mongoose.model('Store', StoreSchema);


const x = {
    openTime: "",
    closeTime: "",
    pickupTimes: [
        {
            time: "10:00",
            pickupsAllotted: 5
        },
        {
            time: "12:00",
            pickupsAllotted: 5
        },
        {
            time: "14:00",
            pickupsAllotted: 5
        },
        {
            time: "16:00",
            pickupsAllotted: 5
        },
        {
            time: "18:00",
            pickupsAllotted: 5
        },
        {
            time: "20:00",
            pickupsAllotted: 5
        },
        {
            time: "21:00",
            pickupsAllotted: 5
        }
    ]
}
