import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import {AUTHENTICATE_CUSTOMER, DENY_AUTHENTICATION} from "../actionTypes";

const initialState = {
    isAuthenticatedCustomer: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_CUSTOMER: {
            return {
                ...state,
                isAuthenticatedCustomer: true
            };
        }
        case DENY_AUTHENTICATION: {
            return {
                ...state,
                isAuthenticatedCustomer: false
            };
        }
        default:
            return state;
    }
};

export default combineReducers({ rootReducer, homeReducer });
