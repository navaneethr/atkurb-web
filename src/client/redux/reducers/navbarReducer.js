import {GET_ASSOCIATED_BUSINESSES, GET_CART, UPDATE_CART, UPDATE_STORE_CHECKOUT} from "../actions/navbarActions";


const initialState = {
    cart: [],
    cartStores: [],
    checkOutStore: null
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
                cart: action.payload.cart,
                checkOutStore: action.payload.checkOutStore
            };
        }
        case GET_ASSOCIATED_BUSINESSES: {
            return {
                ...state,
                cartStores: action.payload
            };
        }
        case UPDATE_STORE_CHECKOUT: {
            return {
                ...state,
                checkOutStore: action.payload
            };
        }
        default:
            return state;
    }
};

export default navbarReducer;
