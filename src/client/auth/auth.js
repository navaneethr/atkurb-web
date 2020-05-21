export const auth = {
    isAuthenticated: false,
    authenticate(cb) {
        auth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    logOut(cb) {
        localStorage.removeItem('atKurbAuthToken');
        auth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};
