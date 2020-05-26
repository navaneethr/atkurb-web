import { ADD, GET_STORES } from "../actions/homeActions";

const initialState = {
    number: 0,
    storesNearby: [],
    favStores: []
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD: {
            return {
                ...state,
                number: state.number + action.payload
            };
        }
        case GET_STORES: {
            return {
                ...state,
                storesNearby: action.payload
            };
        }
        default:
            return state;
    }
};

export default homeReducer;
