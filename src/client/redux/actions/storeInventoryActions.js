
import {STORE_TOKEN_NAME} from "../../utils/constants";
import axios from "axios";
import {AlertError, AlertSuccess} from "../../components/utils/Utils";

export const GET_PRODUCT_SUGGESTIONS = "GET_PRODUCT_SUGGESTIONS";
export const UPDATE_SEARCH_VALUE = "UPDATE_SEARCH_VALUE";
export const ADD_ITEMS_TO_LIST = "ADD_ITEMS_TO_LIST";
export const ADD_ITEMS_TO_INVENTORY = "ADD_ITEMS_TO_INVENTORY";

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

export const addItemsToList = (item) => {
    return dispatch => {
        dispatch({
            type: ADD_ITEMS_TO_LIST,
            payload: item
        });
    }
};

export const addItemsToInventory = (items) => {
    return dispatch => {
        const AuthToken =  `Bearer ${localStorage.getItem(STORE_TOKEN_NAME)}`;

        const config = {
            headers: {
                Authorization: AuthToken
            }
        };
        axios.post('/api/inventory/add', {items}, config).then((res) => {
            dispatch({
                type: ADD_ITEMS_TO_INVENTORY,
                payload: items
            });
            AlertSuccess("Added all the items to the Inventory");
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to add items to the Inventory");
        })
    }
};
