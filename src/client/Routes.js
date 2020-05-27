import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {auth} from "./auth/auth";
import {ROUTES} from "./utils/constants";
import {connect} from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/customer/Home";
import StoreLanding from "./components/store/StoreLanding";
import Landing from "./components/customer/Landing";
import CustomerNavbar from "./components/navbars/CustomerNavbar";
import StoreNavbar from "./components/navbars/StoreNavbar";
import Profile from "./components/customer/Profile";
import Orders from "./components/customer/Orders";
import Payments from "./components/customer/Payments";
import StoreHome from "./components/store/StoreHome";
import StoreInventory from "./components/store/StoreInventory";
import StoreProfile from "./components/store/StoreProfile";
import StoreAnalytics from "./components/store/StoreAnalytics";
import StoreFinances from "./components/store/StoreFinances";
import StoreOrders from "./components/store/StoreOrders";
import Shop from "./components/customer/Shop";
import Addresses from "./components/customer/Addresses";

class Routes extends Component {

    render() {
        const { isAuthenticatedCustomer, isAuthenticatedStore } = this.props.rootReducer;
        return (
            <Router>
                <div>
                    {(isAuthenticatedCustomer) && <CustomerNavbar/>}
                    {(isAuthenticatedStore) && <StoreNavbar/>}
                    <Switch>
                        {/*These Routes are only visible when the user is not authenticated*/}
                        <LoginRoute exact path={ROUTES.LANDING} component={Landing}/>
                        <LoginRoute exact path={ROUTES.STORE} component={StoreLanding}/>
                        <LoginRoute exact path={ROUTES.STORE_LANDING} component={StoreLanding}/>

                        {/*These Routes are only visible when the customer is authenticated*/}
                        <PrivateRouteCustomer exact path={ROUTES.HOME} component={Home}/>
                        <PrivateRouteCustomer exact path={ROUTES.PROFILE} component={Profile}/>
                        <PrivateRouteCustomer exact path={`${ROUTES.SHOP}/:storeId`} component={Shop}/>
                        <PrivateRouteCustomer exact path={`${ROUTES.SHOP}/:storeId/:category`} component={Shop}/>
                        <PrivateRouteCustomer exact path={ROUTES.ORDERS} component={Orders}/>
                        <PrivateRouteCustomer exact path={ROUTES.PAYMENTS} component={Payments}/>
                        <PrivateRouteCustomer exact path={ROUTES.ADDRESSES} component={Addresses}/>

                        {/*These Routes are only visible when the store is authenticated*/}
                        <PrivateRouteStore exact path={ROUTES.STORE_HOME} component={StoreHome}/>
                        <PrivateRouteStore exact path={ROUTES.STORE_INVENTORY} component={StoreInventory}/>
                        <PrivateRouteStore exact path={ROUTES.STORE_PROFILE} component={StoreProfile}/>
                        <PrivateRouteStore exact path={ROUTES.STORE_ANALYTICS} component={StoreAnalytics}/>
                        <PrivateRouteStore exact path={ROUTES.STORE_FINANCES} component={StoreFinances}/>
                        <PrivateRouteStore exact path={ROUTES.STORE_ORDERS} component={StoreOrders}/>

                        {/*This Route handles all other routes and sends them to Home if the user is authenticated or Landing page if he is not*/}
                        <Route component={Landing} />
                    </Switch>
                    <ToastContainer/>
                </div>
            </Router>
        );
    }
}

export const mapStateToProps = ({rootReducer}) => {
    return { rootReducer }
};

export default connect(mapStateToProps, null)(Routes);

function LoginRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={ props =>
                (!auth.isAuthenticatedCustomer && !auth.isAuthenticatedStore) ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: auth.isAuthenticatedCustomer ? ROUTES.HOME : ROUTES.STORE_HOME,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function PrivateRouteCustomer({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={ props =>
                auth.isAuthenticatedCustomer ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.LANDING,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function PrivateRouteStore({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={ props =>
                auth.isAuthenticatedStore ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.STORE_LANDING,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}
