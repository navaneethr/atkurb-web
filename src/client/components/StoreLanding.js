import React, { Component } from 'react';
import '../css/landing.scss';
import axios from "axios";
import logo from "../assets/atKurb.png";
import * as _ from 'lodash';
import {auth} from "../auth/auth";
import {ROUTES, CUSTOMER_TOKEN_NAME} from "../utils/constants";
import {withRouter} from 'react-router-dom';
import {authenticateCustomer, denyAuthentication} from "../redux/actions/rootActions";
import { connect } from "react-redux";
import {AlertError, AlertSuccess, Button} from "./utils/Utils";

class StoreLanding extends Component {

    constructor() {
        super();
        this.state = {
            fullName: "",
            phone: "",
            email: "",
            password: "",
            isLogin: true,
            isLoadingScreen: true,
            apiInProgress: false
        }
    }

    componentDidMount() {
        // On Reload, if authToken is present, make fetch profile calls here to get required data else log them out and redirect to Landing Page
        const authToken = localStorage.getItem(CUSTOMER_TOKEN_NAME);
        if(!_.isEmpty(authToken)) {
            console.log("Here");
            const {history, location} = this.props;
            let { from } = location.state || { from: { pathname: "/" } };
            auth.authenticateCustomer(() => {
                this.setState({isLoadingScreen: false}, () => {
                    history.replace(from);
                    this.props.authenticateCustomer();
                });
            });
        } else {
            auth.logOut(() => {
                this.setState({isLoadingScreen: false}, () => {
                    this.props.denyAuthentication();
                })
            });
        }
    }

    login() {
        const {email, password} = this.state;
        const {history} = this.props;
        const payload = {email, password};
        this.setState({apiInProgress: true});
        axios.post("/api/auth/login", payload).then((res) => {
            console.log(res.data);
            const {token} = res.data;
            if(!_.isEmpty(token)) {
                auth.authenticateCustomer(() => {
                    localStorage.setItem(CUSTOMER_TOKEN_NAME, token);
                    this.props.authenticateCustomer();
                    this.setState({apiInProgress: false});
                    history.push(ROUTES.HOME);
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
        const {fullName, email, password, phone} = this.state;
        const payload = {fullName, phone, email, password};
        this.setState({apiInProgress: true});
        axios.post("/api/auth/register", payload).then((res) => {
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
        const {fullName, phone, email, password, isLogin, isLoadingScreen, apiInProgress} = this.state;
        return (
            !isLoadingScreen &&
            <div className="landing-parent">
                {/*<span>RDX Boilerplate</span>
                <button onClick={() => this.props.addValue(1)}>Redux Thunk - Add</button>
                <span>{number}</span>*/}
                <div className="brand-container">
                    <img className="brand-logo" src={logo} alt="atKurb"/>
                </div>
                {
                    !isLogin &&
                    <div className="registration-login-container">
                        <div className="registration-login-header">
                            <span className="header-heading">Create an Account</span>
                        </div>
                        <input
                            className="text-input"
                            type="text"
                            onChange={(e) => this.setState({fullName: e.target.value})}
                            placeholder="Full Name"
                            value={fullName}
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
                            <span className="header-heading">Login</span>
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
        denyAuthentication: () => dispatch(denyAuthentication()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreLanding));
