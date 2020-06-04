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

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        default: null
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
    cart: {
        type: Array
    },
    associatedBusinesses: {
        type: Array
    },
    dateOfBirth: {
        type : Date,
        default: null
    },
    createdAt: {
        type : Date,
        default: Date.now
    },
    lastLogin: {
        type : Date,
        default: null
    },
    checkOutStore: {
        type: String, // Store Id
        default: null
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

module.exports = mongoose.model('User', UserSchema);

/*export const User = {
    id: String,
    fullName: String,
    phone: String,
    dob: String,
    sex: String,
    email: String,
    password: String,
    associatedBusinesses: [Business],
    orders: [Order],
    cart: Cart
};*/
