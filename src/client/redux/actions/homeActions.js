import {ADD} from "../actionTypes";

export const addValue = payload => {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: ADD,
                payload
            })
        }, 2000)
    }
};
