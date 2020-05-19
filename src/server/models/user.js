import {Business} from "./business";
import {Order} from "./order";
import {Cart} from "./cart";

export const User = {
    id: "UUID",
    fullName: "String",
    phone: "String",
    dob: "String",
    sex: "String",
    email: "String",
    password: "String",
    associatedBusinesses: [Business],
    orders: [Order],
    cart: Cart
};
