import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import {AUTHENTICATE, DENY_AUTHENTICATION} from "../actionTypes";

const initialState = {
    isAuthenticated: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                ...state,
                isAuthenticated: true
            };
        }
        case DENY_AUTHENTICATION: {
            return {
                ...state,
                isAuthenticated: false
            };
        }
        default:
            return state;
    }
};

export default combineReducers({ rootReducer, homeReducer });
