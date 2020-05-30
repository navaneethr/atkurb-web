import {GET_ORDERS} from "../actions/orderActions";

const initialState = {
    orders: [],
    orderRelatedStores: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS: {
            return {
                ...state,
                orders: action.payload.items,
                orderRelatedStores: action.payload.storeDetails
            };
        }
        default:
            return state;
    }
};

export default orderReducer;
