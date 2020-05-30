import {AlertError} from "../../components/utils/Utils";
import axios from "axios/index";
import {CUSTOMER_TOKEN_NAME} from "../../utils/constants";

export const GET_ORDERS = "GET_ORDERS";

export const getOrders = () => {
    return dispatch => {

        const token = localStorage.getItem(CUSTOMER_TOKEN_NAME);
        const bearerToken = `Bearer ${token}`;

        axios.get("/api/order", { 'headers': { 'Authorization': bearerToken} }).then((res) => {
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error);
            AlertError("Failed to fetch orders, please reload and retry");
        })
    }
};
