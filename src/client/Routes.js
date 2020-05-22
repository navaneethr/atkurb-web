import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {auth} from "./auth/auth";
import Home from "./components/Home";
import StoreLanding from "./components/StoreLanding";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import {ROUTES, CUSTOMER_TOKEN_NAME} from "./utils/constants";
import {connect} from "react-redux";
import {denyAuthentication} from "./redux/actions/rootActions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from "./components/Account";
import Orders from "./components/Orders";
import Address from "./components/Address";
import Billing from "./components/Billing";
import Payments from "./components/Payments";

class Routes extends Component {

    render() {
        console.log("ROUTES", this.props);
        const { isAuthenticatedCustomer } = this.props.rootReducer;
        return (
            <Router>
                <div>
                    {isAuthenticatedCustomer && <Navbar/>}
                    <Switch>
                        <LoginRoute exact path={ROUTES.LANDING} component={Landing}/>

                        <LoginRoute exact path="/store" component={StoreLanding}/>
                        <LoginRoute path={ROUTES.STORE_LANDING} component={StoreLanding}/>
                        <PrivateRoute exact path={ROUTES.HOME} component={Home}/>
                        <PrivateRoute exact path={ROUTES.ACCOUNT} component={Account}/>
                        <PrivateRoute exact path={ROUTES.ORDERS} component={Orders}/>
                        <PrivateRoute exact path={ROUTES.ADDRESS} component={Address}/>
                        <PrivateRoute exact path={ROUTES.BILLING} component={Billing}/>
                        <PrivateRoute exact path={ROUTES.PAYMENTS} component={Payments}/>
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

export const mapDispatchToProps = (dispatch) => {
    return {
        denyAuthentication: () => dispatch(denyAuthentication()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

function LoginRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={ props =>
                !auth.isAuthenticatedCustomer ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.HOME,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function PrivateRoute({ component: Component, ...rest }) {
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
