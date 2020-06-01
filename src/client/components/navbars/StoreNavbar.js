import React, { Component } from 'react';
import '../../css/common/navbar.scss';
import { connect } from "react-redux";
import {ROUTES, STORE_TOKEN_NAME} from "../../utils/constants";
import {auth} from "../../auth/auth";
import { withRouter } from "react-router-dom";
import {denyAuthenticationStore} from "../../redux/actions/rootActions";
import { IoIosClose } from "react-icons/io";
import {getOrdersForStore} from "../../redux/actions/storeNavbarActions";
import io from 'socket.io-client';

const socket = io('http://localhost:5000');


class StoreNavbar extends Component {

    constructor() {
        super();
        this.state = {
            openCart: false,
            openSidebar: false
        }
    }

    componentDidMount() {
        const { getOrdersForStore } = this.props;
        getOrdersForStore();
        socket.on('hello', ({message}) => {
            console.log("Hello There", message);
        })
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
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.STORE_PROFILE)}>Profile</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.STORE_ORDERS)}>Orders</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.STORE_INVENTORY)}>Inventory</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.STORE_FINANCES)}>Finances</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.STORE_ANALYTICS)}>Analytics</span>
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
        getOrdersForStore: () => dispatch(getOrdersForStore()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreNavbar));
