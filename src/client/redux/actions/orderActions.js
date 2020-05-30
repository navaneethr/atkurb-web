import {AlertError} from "../../components/utils/Utils";
import axios from "axios/index";
import {CUSTOMER_TOKEN_NAME} from "../../utils/constants";

export const GET_ORDERS = "GET_ORDERS";
export const FETCH_ORDERS_IN_PROGRESS = "FETCH_ORDERS_IN_PROGRESS";

export const getOrders = () => {
    return dispatch => {

        const token = localStorage.getItem(CUSTOMER_TOKEN_NAME);
        const bearerToken = `Bearer ${token}`;
        dispatch({
            type: FETCH_ORDERS_IN_PROGRESS,
            payload: true
        });
        axios.get("/api/order", { 'headers': { 'Authorization': bearerToken} }).then((res) => {
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            });
            dispatch({
                type: FETCH_ORDERS_IN_PROGRESS,
                payload: false
            });
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: FETCH_ORDERS_IN_PROGRESS,
                payload: false
            });
            AlertError("Failed to fetch orders, please reload and retry");
        })
    }
};

export const fetchOrdersInProgress = (payload) => {
    return dispatch => {
        dispatch({
            type: FETCH_ORDERS_IN_PROGRESS,
            payload: payload
        })
    }
};
