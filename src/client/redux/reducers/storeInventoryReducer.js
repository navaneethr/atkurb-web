import {GET_PRODUCT_SUGGESTIONS, UPDATE_SEARCH_VALUE} from "../actions/storeInventoryActions";

const initialState = {
    searchValue: "",
    suggestedProducts: [],
    suggestedOptions: []
};

const storeInventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_SUGGESTIONS: {
            return {
                ...state,
                suggestedProducts: action.payload,
                suggestedOptions: action.payload.map(({name, _id}) => ({label: name, value: _id}))

            };
        }
        case UPDATE_SEARCH_VALUE: {
            return {
                ...state,
                searchValue: action.payload,
            };
        }
        default:
            return state;
    }
};

export default storeInventoryReducer;
