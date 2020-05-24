import { GET_PRODUCTS } from "../actionTypes";
import { AlertError } from "../../components/utils/Utils";
import axios from "axios/index";
import { CUSTOMER_TOKEN_NAME } from "../../utils/constants";

const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
const config = {
    headers: {
        Authorization: AuthToken,
    }
};

export const getProducts = (storeId) => {
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

