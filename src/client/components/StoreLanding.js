import React, { Component } from 'react';
import '../css/landing.scss';
import axios from "axios";
import logo from "../assets/atKurb.png";
import * as _ from 'lodash';
import {auth} from "../auth/auth";
import {CUSTOMER_TOKEN_NAME, ROUTES, STORE_TOKEN_NAME} from "../utils/constants";
import {withRouter} from 'react-router-dom';
import {
    authenticateCustomer,
    authenticateStore,
    denyAuthenticationCustomer,
    denyAuthenticationStore
} from "../redux/actions/rootActions";
import { connect } from "react-redux";
import {AlertError, AlertSuccess, Button} from "./utils/Utils";

class StoreLanding extends Component {

    constructor() {
        super();
        this.state = {
            storeName: "",
            phone: "",
            email: "",
            password: "",
            isLogin: false,
            isLoadingScreen: true,
            apiInProgress: false
        }
    }

    componentDidMount() {
        // On Reload, if customerAuthToken is present, make fetch profile calls here to get required data else log them out and redirect to Landing Page
        const customerAuthToken = localStorage.getItem(CUSTOMER_TOKEN_NAME);
        const storeAuthToken = localStorage.getItem(STORE_TOKEN_NAME);

        if(!_.isEmpty(customerAuthToken)) {
            const {history, location} = this.props;
            let { from } = location.state || { from: { pathname: "/" } };
            auth.authenticateCustomer(() => {
                this.setState({isLoadingScreen: false}, () => {
                    history.replace(from);
                    this.props.authenticateCustomer();
                });
            });
        } else if(!_.isEmpty(storeAuthToken)) {
            const {history, location} = this.props;
            let { from } = location.state || { from: { pathname: "/" } };
            auth.authenticateStore(() => {
                this.setState({isLoadingScreen: false}, () => {
                    history.replace(from);
                    this.props.authenticateStore();
                });
            });
        } else {
            auth.logOutStore(() => {
                this.setState({isLoadingScreen: false}, () => {
                    this.props.denyAuthenticationStore();
                })
            });
        }
    }

    login() {
        const {email, password} = this.state;
        const {history} = this.props;
        const payload = {email, password};
        this.setState({apiInProgress: true});
        axios.post("/api/auth/business/login", payload).then((res) => {
            console.log(res.data);
            const {token} = res.data;
            if(!_.isEmpty(token)) {
                auth.authenticateStore(() => {
                    localStorage.setItem(STORE_TOKEN_NAME, token);
                    this.setState({apiInProgress: false});
                    this.props.authenticateStore();
                    history.push(ROUTES.STORE_LANDING);
                });
            }
        }).catch((err) => {
            this.setState({apiInProgress: false});
            console.log(err.response.data);
            const { message } = err.response.data;
            AlertError(message)
        })
    }

    register() {
        const {storeName, email, password, phone} = this.state;
        const payload = {storeName, phone, email, password};
        this.setState({apiInProgress: true});
        axios.post("/api/auth/business/register", payload).then((res) => {
            this.setState({apiInProgress: false});
            console.log(res);
            const {message} = res.data;
            AlertSuccess(message)
        }).catch((err) => {
            this.setState({apiInProgress: false});
            if(err.response.status === 500) {
                const { _message, errmsg } = err.response.data.error;
                AlertError(_message || errmsg)
            } else {
                const { message } = err.response.data;
                AlertError(message)
            }
        })
    }

    render() {
        const {storeName, phone, email, password, isLogin, isLoadingScreen, apiInProgress} = this.state;
        return (
            !isLoadingScreen &&
            <div className="landing-parent">
                <div className="brand-container">
                    <img className="brand-logo" src={logo} alt="atKurb"/>
                </div>
                <a className="registration-login-link fixed-top-left" onClick={() => this.props.history.push(ROUTES.LANDING)}>Click here if you wanna buy stuff</a>
                {
                    !isLogin &&
                    <div className="registration-login-container">
                        <div className="registration-login-header">
                            <span className="header-heading">Create a Store</span>
                        </div>
                        <input
                            className="text-input"
                            type="text"
                            onChange={(e) => this.setState({storeName: e.target.value})}
                            placeholder="Store Name"
                            value={storeName}
                        />
                        <input
                            className="text-input"
                            type="number"
                            onChange={(e) => this.setState({phone: e.target.value})}
                            placeholder="Phone"
                            value={phone}
                        />
                        <input
                            className="text-input"
                            type="text"
                            onChange={(e) => this.setState({email: e.target.value})}
                            placeholder="Email"
                            value={email}
                        />
                        <input
                            className="text-input"
                            type="password"
                            onChange={(e) => this.setState({password: e.target.value})}
                            placeholder="Password"
                            value={password}
                        />
                        <Button
                            className="button"
                            onClick={() => this.register()}
                            label="Register"
                            loading={apiInProgress}
                        />
                        <div className="registration-login-link-container">
                            <a className="registration-login-link" onClick={() => this.setState({isLogin: !isLogin})}>Login</a>
                        </div>
                    </div>
                }
                {
                    isLogin &&
                    <div className="registration-login-container">
                        <div className="registration-login-header">
                            <span className="header-heading">Store Login</span>
                        </div>
                        <input
                            className="text-input"
                            type="text"
                            onChange={(e) => this.setState({email: e.target.value})}
                            placeholder="Email"
                            value={email}
                        />
                        <input
                            className="text-input"
                            type="password"
                            onChange={(e) => this.setState({password: e.target.value})}
                            placeholder="Password"
                            value={password}
                        />
                        <Button
                            className="button"
                            onClick={() => this.login()}
                            label="Login"
                            loading={apiInProgress}
                        />
                        <div className="registration-login-link-container">
                            <a className="registration-login-link" onClick={() => this.setState({isLogin: !isLogin})}>Create an Account</a>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export const mapStateToProps = ({rootReducer}) => {
    return { rootReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        authenticateCustomer: () => dispatch(authenticateCustomer()),
        authenticateStore: () => dispatch(authenticateStore()),
        denyAuthenticationCustomer: () => dispatch(denyAuthenticationCustomer()),
        denyAuthenticationStore: () => dispatch(denyAuthenticationStore()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreLanding));
