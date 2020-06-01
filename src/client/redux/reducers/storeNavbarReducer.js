import {
    GET_STORE_ORDERS
} from "../actions/storeNavbarActions";


const initialState = {
    storeOrders: []
};

const storeNavbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STORE_ORDERS: {
            return {
                ...state,
                storeOrders: action.payload
            };
        }
        default:
            return state;
    }
};

export default storeNavbarReducer;
