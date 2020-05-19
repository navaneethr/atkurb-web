/*import {Business} from "./business";
import {Order} from "./order";
import {Cart} from "./cart";*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
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
