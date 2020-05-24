import { UPDATE_CART, GET_CART, GET_COMPLETE_CART } from "../actionTypes";
import { AlertError } from "../../components/utils/Utils";
import axios from "axios/index";
import { CUSTOMER_TOKEN_NAME } from "../../utils/constants";

const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
const config = {
    headers: {
        Authorization: AuthToken,
    }
};

export const updateCart = (payload) => {
    return dispatch => {
        axios.post(`/api/cart/add`, payload, config).then((res) => {
            dispatch({
                type: UPDATE_CART,
                payload: res.data
            })
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to update cart, please refresh")
        })
    }
};

export const getCart = () => {
    return dispatch => {
        axios.get(`/api/cart`, config).then((res) => {
            dispatch({
                type: GET_CART,
                payload: res.data
            })
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to get cart items, please refresh")
        })
    }
};

export const getCompleteCart = () => {
    return dispatch => {
        axios.get(`/api/cart/complete`, config).then((res) => {
            dispatch({
                type: GET_COMPLETE_CART,
                payload: res.data
            })
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to get cart items, please refresh")
        })
    }
};
