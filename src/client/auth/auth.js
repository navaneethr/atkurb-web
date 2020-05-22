export const auth = {
    isAuthenticatedCustomer: false,
    authenticateCustomer(cb) {
        auth.isAuthenticatedCustomer = true;
        setTimeout(cb, 100); // fake async
    },
    logOut(cb) {
        localStorage.removeItem('atKurbAuthToken');
        auth.isAuthenticatedCustomer = false;
        setTimeout(cb, 100);
    }
};
