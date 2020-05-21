import {AUTHENTICATE, DENY_AUTHENTICATION} from "../actionTypes";

export const authenticate = payload => {
    return dispatch => {
        dispatch({
            type: AUTHENTICATE
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
