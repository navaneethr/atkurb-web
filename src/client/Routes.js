import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {auth} from "./auth/auth";
import Home from "./components/Home";
import Landing from "./components/Landing";
import {ROUTES} from "./utils/constants";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <LoginRoute exact path={ROUTES.LANDING} component={Landing}/>
                    <PrivateRoute exact path={ROUTES.HOME} component={Home}/>
                    <Route component={Landing} />
                </Switch>
            </Router>
        );
    }
}

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
