import {Item} from "./item";
import {User} from "./user";

export const Order = {
    id: "UUID",
    items: [ { requiredQuantity: 0, item: Item } ],
    associatedUser: User,
    date: "Timestamp"
};
