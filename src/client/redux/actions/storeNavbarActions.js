import { AlertError } from "../../components/utils/Utils";
import axios from "axios/index";
import {STORE_TOKEN_NAME} from "../../utils/constants";
import * as _ from "lodash";
export const GET_STORE_ORDERS = "GET_STORE_ORDERS";

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
