import React, { Component } from 'react';
import '../css/landing.scss';
import axios from "axios";
import logo from "../assets/atKurb.png";
import * as _ from 'lodash';
import {auth} from "../auth/auth";
import {ROUTES, TOKEN_NAME} from "../utils/constants";
import {withRouter} from 'react-router-dom';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            fullName: "",
            email: "",
            password: "",
            isLogin: true,
            isLoadingScreen: true
        }
    }

    componentDidMount() {
        // On Reload, if authToken is present, make fetch profile calls here to get required data else log them out and redirect to Landing Page
        const authToken = localStorage.getItem(TOKEN_NAME);
        if(!_.isEmpty(authToken)) {
            console.log("Here");
            const {history, location} = this.props;
            let { from } = location.state || { from: { pathname: "/" } };
            auth.authenticate(() => { this.setState({isLoadingScreen: false}, () => { history.replace(from) }); });
        } else {
            auth.logOut(() => this.setState({isLoadingScreen: false}));
        }
    }

    login() {
        const {email, password} = this.state;
        const {history} = this.props;
        const payload = {email, password};
        axios.post("/api/auth/login", payload).then((res) => {
            console.log(res.data);
            const {token} = res.data;
            if(!_.isEmpty(token)) {
                auth.authenticate(() => {
                    localStorage.setItem(TOKEN_NAME, token);
                    history.push(ROUTES.HOME);
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    register() {
        const {fullName, email, password} = this.state;
        const payload = {fullName, email, password};
        axios.post("/api/auth/register", payload).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const {fullName, email, password, isLogin, isLoadingScreen} = this.state;
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
                        <button
                            className="button"
                            onClick={() => this.register()}
                        >
                            Register
                        </button>
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
                        <button
                            className="button"
                            onClick={() => this.login()}
                        >
                            Login
                        </button>
                        <div className="registration-login-link-container">
                            <a className="registration-login-link" onClick={() => this.setState({isLogin: !isLogin})}>Create an Account</a>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(Landing);
