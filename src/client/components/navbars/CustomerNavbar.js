import React, { Component } from 'react';
import '../../css/common/navbar.scss';
import { connect } from "react-redux";
import {addValue} from "../../redux/actions/homeActions";
import {ROUTES, CUSTOMER_TOKEN_NAME} from "../../utils/constants";
import {auth} from "../../auth/auth";
import { Link, withRouter } from "react-router-dom";
import {denyAuthenticationCustomer} from "../../redux/actions/rootActions";
import { IoMdCart, IoIosClose } from "react-icons/io";


class CustomerNavbar extends Component {

    constructor() {
        super();
        this.state = {
            openCart: false,
            openSidebar: false
        }
    }

    logout = () => {
        auth.logOutCustomer(() => {
            this.props.denyAuthenticationCustomer();
            localStorage.removeItem(CUSTOMER_TOKEN_NAME);
            this.props.history.push(ROUTES.LANDING);
        });
    };

    routerPush(route) {
        this.props.history.push(route)
    }

    render() {
        console.log(this.props);
        const { openCart, openSidebar } = this.state;
        return (
            <div className="navbar-parent">
                <div className="top-navbar">
                    <div className="left-navbar-container">

                    </div>
                    <div className="right-navbar-container">
                        <input className="text-input zip-code-input"/>
                        <IoMdCart className="icon-class" onClick={() => {this.setState({openCart: !openCart})}}/>
                        <span className="profile-parent" onClick={() => {this.setState({openSidebar: !openSidebar})}}>NK</span>
                    </div>
                </div>
                {
                    openCart &&
                        <div className="sidebar-parent">
                            <div>
                                <IoIosClose className="icon-class" onClick={() => {this.setState({openCart: false})}}/>
                            </div>
                        </div>
                }
                {
                    openSidebar &&
                    <div className="sidebar-parent">
                        <div>
                            <IoIosClose className="icon-class" onClick={() => {this.setState({openSidebar: false})}}/>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.PROFILE)}>Profile</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.ORDERS)}>Orders</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.BILLING)}>Billing</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.PAYMENTS)}>Payments</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={this.logout}>Logout</span>
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
        denyAuthenticationCustomer: () => dispatch(denyAuthenticationCustomer()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerNavbar));
