import {GET_ORDERS, FETCH_ORDERS_IN_PROGRESS} from "../actions/orderActions";

const initialState = {
    orders: [],
    orderRelatedStores: [],
    fetchingOrdersInProgress: false
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
        case FETCH_ORDERS_IN_PROGRESS: {
            return {
                ...state,
                fetchingOrdersInProgress: action.payload
            };
        }
        default:
            return state;
    }
};

export default orderReducer;
