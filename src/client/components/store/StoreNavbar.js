import React, { Component } from 'react';
import '../../css/navbar.scss';
import { connect } from "react-redux";
import {ROUTES, STORE_TOKEN_NAME} from "../../utils/constants";
import {auth} from "../../auth/auth";
import { withRouter } from "react-router-dom";
import {denyAuthenticationStore} from "../../redux/actions/rootActions";
import { IoMdCart, IoIosClose } from "react-icons/io";


class StoreNavbar extends Component {

    constructor() {
        super();
        this.state = {
            openCart: false,
            openSidebar: false
        }
    }

    logout = () => {
        auth.logOutStore(() => {
            this.props.denyAuthenticationStore();
            localStorage.removeItem(STORE_TOKEN_NAME);
            this.props.history.push(ROUTES.STORE_LANDING);
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
                        <span className="profile-parent" onClick={() => {this.setState({openSidebar: !openSidebar})}}>NK</span>
                    </div>
                </div>
                {
                    openSidebar &&
                    <div className="sidebar-parent">
                        <div>
                            <IoIosClose className="icon-class" onClick={() => {this.setState({openSidebar: false})}}/>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.ACCOUNT)}>Account</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.ORDERS)}>Orders</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.ADDRESS)}>Address</span>
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
        denyAuthenticationStore: () => dispatch(denyAuthenticationStore()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreNavbar));
