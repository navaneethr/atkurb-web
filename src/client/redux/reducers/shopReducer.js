import { GET_PRODUCTS } from "../actionTypes";

const initialState = {
    products: []
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            };
        }
        default:
            return state;
    }
};

export default shopReducer;
