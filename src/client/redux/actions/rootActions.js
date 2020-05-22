import {AUTHENTICATE_CUSTOMER, DENY_AUTHENTICATION} from "../actionTypes";

export const authenticateCustomer = payload => {
    return dispatch => {
        dispatch({
            type: AUTHENTICATE_CUSTOMER
        })
    }
};

export const denyAuthentication = payload => {
    return dispatch => {
        dispatch({
            type: DENY_AUTHENTICATION
        })
    }
};
