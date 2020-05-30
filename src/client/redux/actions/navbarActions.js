import { AlertError } from "../../components/utils/Utils";
import axios from "axios/index";
import { CUSTOMER_TOKEN_NAME } from "../../utils/constants";
import * as _ from "lodash";

export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const UPDATE_CART = "UPDATE_CART";
export const GET_CART = "GET_CART";
export const GET_ASSOCIATED_BUSINESSES = "GET_ASSOCIATED_BUSINESSES";
export const UPDATE_STORE_CHECKOUT = "UPDATE_STORE_CHECKOUT";
export const PLACE_ORDER = "PLACE_ORDER";

export const getUserDetails = () => {
    const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.get(`/api/user`, config).then((res) => {
            dispatch({
                type: GET_USER_DETAILS,
                payload: res.data
            });
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to get cart items, please refresh")
        })
    }
};

export const updateCart = (payload) => {
    const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.post(`/api/cart/add`, payload, config).then((res) => {
            dispatch({
                type: UPDATE_CART,
                payload: res.data
            });
            console.log(res.data);
            return axios.post('/api/store', {storeIds: Object.keys(_.groupBy(payload, 'storeId'))}, config);
        }).then((res) => {
            dispatch({
                type: GET_ASSOCIATED_BUSINESSES,
                payload:  res.data
            })
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to update cart, please refresh")
        })
    }
};

export const getCart = () => {
    const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.get(`/api/cart`, config).then((res) => {
            dispatch({
                type: GET_CART,
                payload: res.data
            });
            const cart = res.data.cart;
            return axios.post('/api/store', {storeIds: Object.keys(_.groupBy(cart, 'storeId'))}, config);
        }).then((res) => {
            dispatch({
                type: GET_ASSOCIATED_BUSINESSES,
                payload:  res.data
            })
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to get cart items, please refresh")
        })
    }
};

export const checkOutStore = (storeId) => {
    const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.post(`/api/user/update/checkout`, {storeId}, config).then((res) => {
            dispatch({
                type: UPDATE_STORE_CHECKOUT,
                payload: storeId
            });
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to add items to checkout")
        })
    }
};

export const placeOrder = (payload) => {
    const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    console.log(payload)
    return dispatch => {
        axios.post(`/api/order/place`, payload, config).then((res) => {
            dispatch({
                type: PLACE_ORDER,
                payload: res.data
            });
            return axios.post('/api/store', {storeIds: Object.keys(_.groupBy(res.data.cart, 'storeId'))}, config);
        }).then((res) => {
            dispatch({
                type: GET_ASSOCIATED_BUSINESSES,
                payload:  res.data
            })
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to place order")
        })
    }
};
