import { AlertError } from "../../components/utils/Utils";
import axios from "axios/index";
import { CUSTOMER_TOKEN_NAME } from "../../utils/constants";
import * as _ from "lodash";

export const UPDATE_CART = "UPDATE_CART";
export const GET_CART = "GET_CART";
export const GET_ASSOCIATED_BUSINESSES = "GET_ASSOCIATED_BUSINESSES";

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
            return axios.post('/api/store', {storeIds: Object.keys(_.groupBy(res.data, 'storeId'))}, config);
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
