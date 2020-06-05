import {
    GET_STORE_ORDERS,
    CHANGE_STORE_DETAILS,
    CHANGE_STORE_ADDRESS_DETAILS,
    GET_STORE_INFO,
    UPDATE_STORE_TIMES, UPDATE_STORE_DETAILS
} from "../actions/storeNavbarActions";


const initialState = {
    storeOrders: [],
    storeDetails: null,
};

const storeNavbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STORE_ORDERS: {
            return {
                ...state,
                storeOrders: action.payload
            };
        }
        case GET_STORE_INFO: {
            return {
                ...state,
                storeDetails: action.payload
            };
        }
        case UPDATE_STORE_TIMES: {
            return {
                ...state,
                storeDetails: {
                    ...state.storeDetails,
                    storeTimes: {
                        ...state.storeDetails.storeTimes,
                        [action.payload.accessor] : action.payload.value
                    }
                }
            };
        }
        case UPDATE_STORE_DETAILS: {
            return {
                ...state,
                storeDetails: {
                    ...action.payload
                }
            };
        }
        case CHANGE_STORE_DETAILS: {
            return {
                ...state,
                storeDetails: {
                    ...state.storeDetails,
                    [action.payload.accessor]: action.payload.value
                }
            };
        }
        case CHANGE_STORE_ADDRESS_DETAILS: {
            return {
                ...state,
                storeDetails: {
                    ...state.storeDetails,
                    address: {
                        ...state.storeDetails.address,
                        [action.payload.accessor]: action.payload.value
                    }
                }
            };
        }
        default:
            return state;
    }
};



export default storeNavbarReducer;
