import { ADD } from "../actionTypes";

const initialState = {
    number: 0
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD: {
            return {
                ...state,
                number: state.number + action.payload
            };
        }
        default:
            return state;
    }
};

export default homeReducer;
