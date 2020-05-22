import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import {AUTHENTICATE_CUSTOMER, AUTHENTICATE_STORE, DENY_AUTHENTICATION_STORE, DENY_AUTHENTICATION_CUSTOMER} from "../actionTypes";

const initialState = {
    isAuthenticatedCustomer: false,
    isAuthenticatedStore: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_CUSTOMER: {
            return {
                ...state,
                isAuthenticatedCustomer: true
            };
        }
        case AUTHENTICATE_STORE: {
            return {
                ...state,
                isAuthenticatedStore: true
            };
        }
        case DENY_AUTHENTICATION_CUSTOMER: {
            return {
                ...state,
                isAuthenticatedCustomer: false
            };
        }
        case DENY_AUTHENTICATION_STORE: {
            return {
                ...state,
                isAuthenticatedStore: false
            };
        }
        default:
            return state;
    }
};

export default combineReducers({ rootReducer, homeReducer });
