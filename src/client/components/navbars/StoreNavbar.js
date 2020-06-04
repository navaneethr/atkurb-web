import React, { Component } from 'react';
import '../../css/common/navbar.scss';
import { connect } from "react-redux";
import {ROUTES, STORE_TOKEN_NAME} from "../../utils/constants";
import {auth} from "../../auth/auth";
import { withRouter } from "react-router-dom";
import {denyAuthenticationStore} from "../../redux/actions/rootActions";
import { IoIosClose, IoIosListBox, IoIosHome } from "react-icons/io";
import {getOrdersForStore, getStoreInfo} from "../../redux/actions/storeNavbarActions";
import io from 'socket.io-client';
import {AlertError, AlertSuccess, Button} from "../utils/Utils";
import axios from "axios";

const socket = io('http://localhost:5000');


class StoreNavbar extends Component {

    constructor() {
        super();
        this.state = {
            openList: false,
            openSidebar: false
        }
    }

    componentDidMount() {
        const { getOrdersForStore, getStoreInfo } = this.props;
        getStoreInfo();
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
        this.setState({openList: false, openSidebar: false})
    }

    addItems() {
        const { itemsToAdd } = this.props.storeInventoryReducer;

        const AuthToken =  `Bearer ${localStorage.getItem(STORE_TOKEN_NAME)}`;

        const config = {
            headers: {
                Authorization: AuthToken
            }
        };
        axios.post('/api/inventory/add', {items: itemsToAdd}, config).then((res) => {
            AlertSuccess("Added all the items to the Inventory");
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to add items to the Inventory");
        })
    }

    render() {
        console.log(this.props);
        const { openList, openSidebar } = this.state;
        const { itemsToAdd } = this.props.storeInventoryReducer;
        return (
            <div className="navbar-parent">
                <div className="top-navbar">
                    <div className="left-navbar-container">
                        <IoIosHome className="icon-class" onClick={() => {this.setState({openList: !openList})}}/>
                    </div>
                    <div className="right-navbar-container">
                        <div className="navbar-item">
                            <IoIosListBox className="icon-class" onClick={() => {this.setState({openList: !openList})}}/>
                            {!_.isEmpty(itemsToAdd) && <span className="cart-items-count" onClick={() => {this.setState({openList: !openList})}}>{itemsToAdd.length}</span>}
                        </div>
                        <span className="profile-parent" onClick={() => {this.setState({openSidebar: !openSidebar})}}>NK</span>
                    </div>
                </div>
                {
                    openList &&
                    <div className="sidebar-parent">
                        <div className="sidebar-icons-parent">
                            <IoIosClose className="icon-class" onClick={() => {this.setState({openList: false})}}/>
                        </div>
                        {
                            itemsToAdd.length < 1 &&
                            <div className="empty-cart-container">
                                <span>You do not items to add to your list</span>
                                <Button label="Add Now" onClick={() => { this.setState({openList: false}); this.routerPush(ROUTES.STORE_INVENTORY) }}/>
                            </div>
                        }
                        {
                            !_.isEmpty(itemsToAdd) &&
                            <div className="items-list-container">
                                <div className="list-item-header">
                                    <span className="list-item-heading">Items Added</span>
                                </div>
                                <div className="list-items">
                                    {
                                        itemsToAdd.map((item, key) => {
                                            return (
                                                <div key={key} className="list-item-container">{item.name}</div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="inventory-save-btn-container">
                                    <Button label="Save to Inventory" onClick={() => this.addItems()}/>
                                </div>
                            </div>
                        }
                    </div>
                }
                {
                    openSidebar &&
                    <div className="sidebar-parent">
                        <div className="sidebar-icons-parent">
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
                        {/*<div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.STORE_FINANCES)}>Finances</span>
                        </div>
                        <div className="menu-item">
                            <span className="menu-link" onClick={() => this.routerPush(ROUTES.STORE_ANALYTICS)}>Analytics</span>
                        </div>*/}
                        <div className="menu-item">
                            <span className="menu-link" onClick={this.logout}>Logout</span>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export const mapStateToProps = ({rootReducer, storeInventoryReducer, storeNavbarReducer}) => {
    return { rootReducer, storeInventoryReducer, storeNavbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        denyAuthenticationStore: () => dispatch(denyAuthenticationStore()),
        getOrdersForStore: () => dispatch(getOrdersForStore()),
        getStoreInfo: () => dispatch(getStoreInfo()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreNavbar));
