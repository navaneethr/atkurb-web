import {AlertError, AlertSuccess} from "../../components/utils/Utils";
import axios from "axios/index";
import {CUSTOMER_TOKEN_NAME, STORE_TOKEN_NAME} from "../../utils/constants";
import * as _ from "lodash";
import {UPDATE_USER_DETAILS, UPDATE_USER_PERSONAL_DETAILS} from "./navbarActions";
export const GET_STORE_ORDERS = "GET_STORE_ORDERS";
export const CHANGE_STORE_DETAILS = "CHANGE_STORE_DETAILS";
export const UPDATE_STORE_DETAILS = "UPDATE_STORE_DETAILS";
export const CHANGE_STORE_ADDRESS_DETAILS = "CHANGE_STORE_ADDRESS_DETAILS";
export const GET_STORE_INFO = "GET_STORE_INFO";

export const getOrdersForStore = () => {
    const AuthToken =  `Bearer ${localStorage.getItem(STORE_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.get(`/api/order/store`, config).then((res) => {
            dispatch({ type: GET_STORE_ORDERS, payload: res.data });
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to get store orders, please refresh and retry")
        })
    }
};

export const getStoreInfo = () => {
    const AuthToken =  `Bearer ${localStorage.getItem(STORE_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.get(`/api/store/info`, config).then((res) => {
            dispatch({ type: GET_STORE_INFO, payload: res.data });
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to get store details, please refresh and retry")
        })
    }
};

export const saveStoreDetails = (payload) => {
    const AuthToken =  `Bearer ${localStorage.getItem(STORE_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.post('/api/store/update/details', payload, config).then((res) => {
            dispatch({ type: UPDATE_STORE_DETAILS, payload: res.data });
            AlertSuccess("Updated Store Details Successfully");
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to save details")
        })
    }
};

export const updateStoreDetails = (payload) => {
    return dispatch => {
        dispatch({
            type: CHANGE_STORE_DETAILS,
            payload
        })
    }
};

export const updateStoreAddressDetails = (payload) => {
    return dispatch => {
        dispatch({
            type: CHANGE_STORE_ADDRESS_DETAILS,
            payload
        })
    }
};
