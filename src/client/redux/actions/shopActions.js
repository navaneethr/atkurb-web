import {GET_PRODUCTS, GET_STORE_INFO} from "../actionTypes";
import { AlertError } from "../../components/utils/Utils";
import axios from "axios/index";
import { CUSTOMER_TOKEN_NAME } from "../../utils/constants";

export const getProducts = (storeId) => {
    const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.get(`/api/store/products?storeId=${storeId}`, config).then((res) => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to load products, please refresh")
        })
    }
};

export const getStoreInfo = (storeId) => {
    const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.get(`/api/store?storeId=${storeId}`, config).then((res) => {
            dispatch({
                type: GET_STORE_INFO,
                payload: res.data
            });
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to update cart, please refresh")
        })
    }
};
