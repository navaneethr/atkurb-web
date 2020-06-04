import {
    GET_ASSOCIATED_BUSINESSES,
    GET_CART,
    UPDATE_CART,
    UPDATE_STORE_CHECKOUT,
    PLACE_ORDER,
    GET_USER_DETAILS,
    CHECKOUT_PAGE_IN_PROGRESS,
    UPDATE_USER_ADDRESS_DETAILS,
    UPDATE_USER_PERSONAL_DETAILS,
    UPDATE_USER_DETAILS
} from "../actions/navbarActions";


const initialState = {
    cart: [],
    cartStores: [],
    checkOutStore: null,
    userDetails: null,
    fetchInProgress: false
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DETAILS: {
            return {
                ...state,
                userDetails: action.payload
            };
        }
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
        case CHECKOUT_PAGE_IN_PROGRESS: {
            return {
                ...state,
                fetchInProgress: action.payload
            };
        }
        case PLACE_ORDER: {
            console.log(action.payload);
            const {cart} = action.payload;
            return {
                ...state,
                cart: cart,
                checkOutStore: null,
                userDetails: action.payload
            };
        }
        case UPDATE_USER_ADDRESS_DETAILS: {
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    address: {
                        ...state.userDetails.address,
                        [action.payload.accessor]: action.payload.value
                    }
                }
            };
        }
        case UPDATE_USER_PERSONAL_DETAILS: {
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    [action.payload.accessor]: action.payload.value
                }
            };
        }
        case UPDATE_USER_DETAILS: {
            return {
                ...state,
                userDetails: action.payload
            };
        }
        default:
            return state;
    }
};

export default navbarReducer;
