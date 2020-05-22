import {CUSTOMER_TOKEN_NAME} from "../utils/constants";

export const auth = {
    isAuthenticatedCustomer: false,
    authenticateCustomer(cb) {
        auth.isAuthenticatedCustomer = true;
        setTimeout(cb, 100); // fake async
    },
    logOut(cb) {
        localStorage.removeItem(CUSTOMER_TOKEN_NAME);
        auth.isAuthenticatedCustomer = false;
        setTimeout(cb, 100);
    }
};
