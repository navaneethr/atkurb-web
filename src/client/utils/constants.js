export const TABS = {
    LANDING: '',
    STORE: 'store',
    STORE_LANDING: 'store/register',

    HOME: 'home',
    PROFILE: 'profile',
    SHOP: 'shop',
    ORDERS: 'orders',
    PAYMENTS: 'payments',
    ADDRESSES: 'addresses',

    STORE_HOME: 'store/home',
    STORE_PROFILE: 'store/profile',
    STORE_ORDERS: 'store/orders',
    STORE_FINANCES: 'store/finances',
    STORE_ANALYTICS: 'store/analytics',
    STORE_INVENTORY: 'store/inventory',
};

export const ROUTES = {
    LANDING: `/${TABS.LANDING}`,
    STORE: `/${TABS.STORE}`,
    STORE_LANDING: `/${TABS.STORE_LANDING}`,

    HOME: `/${TABS.HOME}`,
    PROFILE: `/${TABS.PROFILE}`,
    SHOP: `/${TABS.SHOP}`,
    ORDERS: `/${TABS.ORDERS}`,
    PAYMENTS: `/${TABS.PAYMENTS}`,

    STORE_HOME: `/${TABS.STORE_HOME}`,
    STORE_PROFILE: `/${TABS.STORE_PROFILE}`,
    STORE_ORDERS: `/${TABS.STORE_ORDERS}`,
    STORE_FINANCES: `/${TABS.STORE_FINANCES}`,
    STORE_ANALYTICS: `/${TABS.STORE_ANALYTICS}`,
    STORE_INVENTORY: `/${TABS.STORE_INVENTORY}`,
    ADDRESSES: `/${TABS.ADDRESSES}`,
};

export const categoryOptions = [
    {label:"Vegetables",value:"vegetables"},
    {label:"Fruits",value:"fruits"},
    {label:"Pantry",value:"pantry"},
    {label:"Dairy & Eggs",value:"dairyAndEggs"},
    {label:"Meat",value:"meat"},
    {label:"Drinks & Beverages",value:"drinksAndBeverages"},
    {label:"Nuts",value:"nuts"},
    {label:"Bakery",value:"bakery"},
    {label:"Wine, Beer & Spirits",value:"windBeerAndSpirits"},
    {label:"Pharmacy & Health",value:"pharmacyAndHealth"},
    {label:"Snacks",value:"snacks"},
    {label:"Cookies",value:"cookies"},
    {label:"Others",value:"others"}
];

export const CUSTOMER_TOKEN_NAME = "atKurbCustomerAuthToken";
export const STORE_TOKEN_NAME = "atKurbStoreAuthToken";
