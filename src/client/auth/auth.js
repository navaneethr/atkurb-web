import {CUSTOMER_TOKEN_NAME, STORE_TOKEN_NAME} from "../utils/constants";

export const auth = {
    isAuthenticatedCustomer: false,
    isAuthenticatedStore: false,
    authenticateCustomer(cb) {
        auth.isAuthenticatedCustomer = true;
        setTimeout(cb, 100); // fake async
    },
    authenticateStore(cb) {
        auth.isAuthenticatedStore = true;
        setTimeout(cb, 100); // fake async
    },
    logOutCustomer(cb) {
        localStorage.removeItem(CUSTOMER_TOKEN_NAME);
        auth.isAuthenticatedCustomer = false;
        setTimeout(cb, 100);
    },
    logOutStore(cb) {
        localStorage.removeItem(STORE_TOKEN_NAME);
        auth.isAuthenticatedStore = false;
        setTimeout(cb, 100);
    }
};
