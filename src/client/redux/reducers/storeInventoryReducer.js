import {GET_PRODUCT_SUGGESTIONS, UPDATE_SEARCH_VALUE, ADD_ITEMS_TO_LIST, ADD_ITEMS_TO_INVENTORY} from "../actions/storeInventoryActions";

const initialState = {
    searchValue: "",
    suggestedProducts: [],
    itemsToAdd: []
};

const storeInventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_SUGGESTIONS: {
            return {
                ...state,
                suggestedProducts: action.payload
            };
        }
        case UPDATE_SEARCH_VALUE: {
            return {
                ...state,
                searchValue: action.payload,
            };
        }
        case ADD_ITEMS_TO_LIST: {
            return {
                ...state,
                itemsToAdd: action.payload,
            };
        }
        case ADD_ITEMS_TO_INVENTORY: {
            return {
                ...state,
                itemsToAdd: [],
            };
        }
        default:
            return state;
    }
};

export default storeInventoryReducer;
