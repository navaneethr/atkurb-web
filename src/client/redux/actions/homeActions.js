import {AlertError} from "../../components/utils/Utils";
import axios from "axios/index";
import {CUSTOMER_TOKEN_NAME} from "../../utils/constants";

export const ADD = "ADD";
export const GET_STORES = "GET_STORES";

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

export const getStores = () => {
    return dispatch => {

        const token = localStorage.getItem(CUSTOMER_TOKEN_NAME);
        const bearerToken = `Bearer ${token}`;

        axios.get("/api/store/all", { 'headers': { 'Authorization': bearerToken} }).then((res) => {
            dispatch({
                type: GET_STORES,
                payload: res.data
            })
        }).catch((error) => {
            console.log(error);
            AlertError("Failed to fetch stores, please retry");
        })
    }
};
