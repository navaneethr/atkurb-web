
import {STORE_TOKEN_NAME} from "../../utils/constants";
import axios from "axios";

export const GET_PRODUCT_SUGGESTIONS = "GET_PRODUCT_SUGGESTIONS";
export const UPDATE_SEARCH_VALUE = "UPDATE_SEARCH_VALUE";

export const getSuggestedProducts = (searchValue) => {
    const AuthToken =  `Bearer ${localStorage.getItem(STORE_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };
    return dispatch => {
        axios.get(`/api/products?searchValue=${searchValue}`, config).then((res) => {
            dispatch({
                type: GET_PRODUCT_SUGGESTIONS,
                payload: res.data
            });
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to fetch suggestions, please refresh")
        })
    }
};

export const updateSearchValue = (searchValue) => {
    return dispatch => {
        dispatch({
            type: UPDATE_SEARCH_VALUE,
            payload: searchValue
        });
    }
};
