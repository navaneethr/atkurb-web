import { GET_PRODUCTS, GET_STORE_INFO, UPDATE_PRODUCTS_CATEGORY } from "../actions/shopActions";

const initialState = {
    products: [],
    storeInfo: null,
    selectedCategory: "all"
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
        case UPDATE_PRODUCTS_CATEGORY: {
            return {
                ...state,
                selectedCategory: action.payload.category,
                products: action.payload.products
            };
        }
        default:
            return state;
    }
};

export default shopReducer;
