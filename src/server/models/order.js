import {Item} from "./item";
import {User} from "./user";

export const Order = {
    _id: "",
    items: [],
    associatedUser: User,
    date: "",
    orderCompleteTS: "",
    cost: {
        serviceFee: "",
        taxes: "",
        itemsCost: "",
        shopperTip: ""
    }
};
