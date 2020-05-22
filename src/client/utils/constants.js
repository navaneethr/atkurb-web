export const TABS = {
    LANDING: '',
    STORE_LANDING: 'store/register',
    HOME: 'home',
    ACCOUNT: 'account',
    ORDERS: 'orders',
    ADDRESS: 'address',
    BILLING: 'billing',
    PAYMENTS: 'payments',

    STORE_HOME: 'store/home'
};

export const ROUTES = {
    LANDING: `/${TABS.LANDING}`,
    STORE_LANDING: `/${TABS.STORE_LANDING}`,

    HOME: `/${TABS.HOME}`,
    ACCOUNT: `/${TABS.ACCOUNT}`,
    ORDERS: `/${TABS.ORDERS}`,
    ADDRESS: `/${TABS.ADDRESS}`,
    BILLING: `/${TABS.BILLING}`,
    PAYMENTS: `/${TABS.PAYMENTS}`,

    STORE_HOME: `/${TABS.STORE_HOME}`
};

export const CUSTOMER_TOKEN_NAME = "atKurbCustomerAuthToken";
export const STORE_TOKEN_NAME = "atKurbStoreAuthToken";
