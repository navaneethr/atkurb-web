import {
    GET_STORE_ORDERS,
    CHANGE_STORE_DETAILS,
    CHANGE_STORE_ADDRESS_DETAILS,
    GET_STORE_INFO
} from "../actions/storeNavbarActions";


const initialState = {
    storeOrders: [],
    storeDetails: null,
    storeTimes: {
        sunday: {
            openTime: "10:00:43",
            closeTime: ""
        },
        monday: {
            openTime: "",
            closeTime: ""
        },
        tuesday: {
            openTime: "",
            closeTime: ""
        },
        wednesday: {
            openTime: "",
            closeTime: ""
        },
        thursday: {
            openTime: "",
            closeTime: ""
        },
        friday: {
            openTime: "",
            closeTime: ""
        },
        saturday: {
            openTime: "",
            closeTime: ""
        },
    }
};

const storeNavbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STORE_ORDERS: {
            return {
                ...state,
                storeOrders: action.payload
            };
        }
        case GET_STORE_INFO: {
            return {
                ...state,
                storeDetails: action.payload
            };
        }
        case CHANGE_STORE_DETAILS: {
            return {
                ...state,
                storeDetails: {
                    ...state.storeDetails,
                    [action.payload.accessor]: action.payload.value
                }
            };
        }
        case CHANGE_STORE_ADDRESS_DETAILS: {
            return {
                ...state,
                storeDetails: {
                    ...state.storeDetails,
                    address: {
                        ...state.storeDetails.address,
                        [action.payload.accessor]: action.payload.value
                    }
                }
            };
        }
        default:
            return state;
    }
};



export default storeNavbarReducer;
