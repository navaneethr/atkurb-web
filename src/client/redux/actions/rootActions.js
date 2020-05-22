import {
    AUTHENTICATE_CUSTOMER,
    AUTHENTICATE_STORE,
    DENY_AUTHENTICATION_CUSTOMER,
    DENY_AUTHENTICATION_STORE
} from "../actionTypes";

export const authenticateCustomer = payload => {
    return dispatch => {
        dispatch({
            type: AUTHENTICATE_CUSTOMER
        })
    }
};

export const authenticateStore = payload => {
    return dispatch => {
        dispatch({
            type: AUTHENTICATE_STORE
        })
    }
};

export const denyAuthenticationCustomer = payload => {
    return dispatch => {
        dispatch({
            type: DENY_AUTHENTICATION_CUSTOMER
        })
    }
};

export const denyAuthenticationStore = payload => {
    return dispatch => {
        dispatch({
            type: DENY_AUTHENTICATION_STORE
        })
    }
};
