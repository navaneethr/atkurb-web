import { GET_PRODUCTS, GET_STORE_INFO } from "../actionTypes";

const initialState = {
    products: [],
    storeInfo: null
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            };
        }
        case GET_STORE_INFO: {
            return {
                ...state,
                storeInfo: action.payload
            };
        }
        default:
            return state;
    }
};

export default shopReducer;
