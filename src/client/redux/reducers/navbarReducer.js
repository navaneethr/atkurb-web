import {GET_CART, UPDATE_CART} from "../actions/navbarActions";


const initialState = {
    cart: [],
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
        default:
            return state;
    }
};

export default navbarReducer;
