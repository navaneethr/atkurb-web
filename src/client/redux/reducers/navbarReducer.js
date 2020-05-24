import {GET_CART, GET_COMPLETE_CART, UPDATE_CART} from "../actionTypes";

const initialState = {
    cart: [],
    completeCart: []
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CART: {
            return {
                ...state,
                cart: action.payload
            };
        }
        case GET_CART: {
            return {
                ...state,
                cart: action.payload
            };
        }
        case GET_COMPLETE_CART: {
            return {
                ...state,
                completeCart: action.payload
            };
        }
        default:
            return state;
    }
};

export default navbarReducer;
