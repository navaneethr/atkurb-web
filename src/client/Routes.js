import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {auth} from "./auth/auth";
import Home from "./components/customer/Home";
import StoreLanding from "./components/StoreLanding";
import Landing from "./components/customer/Landing";
import CustomerNavbar from "./components/customer/CustomerNavbar";
import StoreNavbar from "./components/store/StoreNavbar";
import {ROUTES} from "./utils/constants";
import {connect} from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from "./components/customer/Account";
import Orders from "./components/customer/Orders";
import Address from "./components/customer/Address";
import Billing from "./components/customer/Billing";
import Payments from "./components/customer/Payments";
import StoreHome from "./components/store/StoreHome";

class Routes extends Component {

    render() {
        const { isAuthenticatedCustomer, isAuthenticatedStore } = this.props.rootReducer;
        return (
            <Router>
                <div>
                    {(isAuthenticatedCustomer) && <CustomerNavbar/>}
                    {(isAuthenticatedStore) && <StoreNavbar/>}
                    <Switch>
                        <LoginRoute exact path={ROUTES.LANDING} component={Landing}/>
                        <LoginRoute exact path={ROUTES.STORE_LANDING} component={StoreLanding}/>

                        <PrivateRouteCustomer exact path={ROUTES.HOME} component={Home}/>
                        <PrivateRouteCustomer exact path={ROUTES.ACCOUNT} component={Account}/>
                        <PrivateRouteCustomer exact path={ROUTES.ORDERS} component={Orders}/>
                        <PrivateRouteCustomer exact path={ROUTES.ADDRESS} component={Address}/>
                        <PrivateRouteCustomer exact path={ROUTES.BILLING} component={Billing}/>
                        <PrivateRouteCustomer exact path={ROUTES.PAYMENTS} component={Payments}/>

                        <PrivateRouteStore exact path={ROUTES.STORE_HOME} component={StoreHome}/>

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
