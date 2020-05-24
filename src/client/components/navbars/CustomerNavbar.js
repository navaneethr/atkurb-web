import React, { Component } from 'react';
import '../../css/common/navbar.scss';
import { connect } from "react-redux";
import {addValue} from "../../redux/actions/homeActions";
import {ROUTES, CUSTOMER_TOKEN_NAME} from "../../utils/constants";
import {auth} from "../../auth/auth";
import { Link, withRouter } from "react-router-dom";
import {denyAuthenticationCustomer} from "../../redux/actions/rootActions";
import {getCart, getCompleteCart} from "../../redux/actions/navbarActions";
import { IoMdCart, IoIosClose } from "react-icons/io";


class CustomerNavbar extends Component {

    constructor() {
        super();
        this.state = {
            openCart: false,
            openSidebar: false
        }
    }

    componentDidMount() {
        const {getCart} = this.props;
        getCart();
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

    openCart() {
        const { openCart } = this.state;
        this.setState({openCart: !openCart, openSidebar: false}, () => {
            const {openCart} = this.state;
            const { getCompleteCart } = this.props;
            console.log(openCart);
            if(openCart) {
                // Fetch Products
                getCompleteCart();
            }
        })
    }

    render() {
        console.log(this.props);
        const { openCart, openSidebar } = this.state;
        const {cart, completeCart} = this.props.navbarReducer;
        return (
            <div className="navbar-parent">
                <div className="top-navbar">
                    <div className="left-navbar-container">

                    </div>
                    <div className="right-navbar-container">
                        <input className="text-input zip-code-input"/>
                        <div className="navbar-item">
                            <IoMdCart className="icon-class" onClick={() => {this.openCart()}}/>
                            {!_.isEmpty(cart) && <span className="cart-items-count" onClick={() => {this.openCart()}}>{cart.length}</span>}
                        </div>
                        <span className="profile-parent" onClick={() => {this.setState({openSidebar: !openSidebar})}}>NK</span>
                    </div>
                </div>
                {
                    openCart &&
                        <div className="sidebar-parent">
                            <div>
                                <IoIosClose className="icon-class" onClick={() => {this.setState({openCart: false})}}/>
                            </div>
                            <div className="cart-container">
                                {
                                    completeCart.map((prod, i) => {
                                        return (
                                            <div className="cart-card-container" key={i}>
                                                <div>
                                                    <span>
                                                         {prod.name}
                                                    </span>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
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
                            <span className="menu-link" onClick={() => this.openCart()}>Cart</span>
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

export const mapStateToProps = ({rootReducer, navbarReducer}) => {
    return { rootReducer, navbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        denyAuthenticationCustomer: () => dispatch(denyAuthenticationCustomer()),
        getCart: () => dispatch(getCart()),
        getCompleteCart: () => dispatch(getCompleteCart())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerNavbar));
