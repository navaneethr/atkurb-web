import {GET_PRODUCT_SUGGESTIONS, UPDATE_SEARCH_VALUE, ADD_ITEMS_TO_LIST} from "../actions/storeInventoryActions";

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
        default:
            return state;
    }
};

export default storeInventoryReducer;
