import { UPDATE_CART } from "../actionTypes";

const initialState = {
    cart: []
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CART: {
            return {
                ...state,
                cart: action.payload
            };
        }
        default:
            return state;
    }
};

export default navbarReducer;
