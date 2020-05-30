const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
