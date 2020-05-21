import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {auth} from "./auth/auth";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import {ROUTES, TOKEN_NAME} from "./utils/constants";
import {connect} from "react-redux";
import {denyAuthentication} from "./redux/actions/rootActions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Routes extends Component {

    render() {
        console.log("ROUTES", this.props);
        const { isAuthenticated } = this.props.rootReducer;
        return (
            <Router>
                <div>
                    {isAuthenticated && <Navbar/>}
                    <Switch>
                        <LoginRoute exact path={ROUTES.LANDING} component={Landing}/>
                        <PrivateRoute exact path={ROUTES.HOME} component={Home}/>
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
                !auth.isAuthenticated ? (
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
                auth.isAuthenticated ? (
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
