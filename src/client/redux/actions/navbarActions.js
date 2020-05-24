import {UPDATE_CART} from "../actionTypes";

export const updateCart = (payload) => {
    return dispatch => {
        dispatch({
            type: UPDATE_CART,
            payload: payload
        })
    }
};
