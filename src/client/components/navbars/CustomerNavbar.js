import React, { Component } from 'react';
import '../../css/common/navbar.scss';
import { connect } from "react-redux";
import {addValue} from "../../redux/actions/homeActions";
import {ROUTES, CUSTOMER_TOKEN_NAME} from "../../utils/constants";
import {auth} from "../../auth/auth";
import { Link, withRouter } from "react-router-dom";
import {denyAuthenticationCustomer} from "../../redux/actions/rootActions";
import {getCart, updateCart} from "../../redux/actions/navbarActions";
import { IoMdCart, IoIosClose, IoIosResize, IoMdExit, IoIosCard, IoMdPin, IoMdListBox, IoMdPerson } from "react-icons/io";
import {CartItem} from "../utils/Utils";
import {RiStore2Line} from "react-icons/ri";
import * as _ from "lodash";

class CustomerNavbar extends Component {

    constructor() {
        super();
        this.state = {
            openCart: false,
            openSidebar: false,
            openCartExpanded: false
        }
    }

    componentDidMount() {
        const {getCart} = this.props;
        getCart();
    }

    componentDidUpdate() {
        const {openCart, openSidebar} = this.state;
        if(openCart || openSidebar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
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

    openCart() {
        const { openCart } = this.state;
        this.setState({openCart: !openCart, openSidebar: false})
    }

    addItemToCart(prod) {
        const {cart} = this.props.navbarReducer;
        console.log(prod);
        const { updateCart } = this.props;

        const newCart = _.cloneDeep(cart);
        // if the product is in the cart already
        if(!_.isEmpty(_.find(newCart, { _id: prod._id }))) {
            // get the index of the product in the cart
            console.log(1);
            let index = _.findIndex(newCart, { _id: prod._id });
            console.log(2);
            // get the product object
            let productToUpdate = _.find(newCart, { _id: prod._id });
            console.log(3);
            // Update the product
            productToUpdate = {...productToUpdate, ...prod, quantity: parseInt(productToUpdate.quantity) + 1};
            console.log(4);
            // we recheck if there is an object just to make sure before adding it to the state
            if(index > -1) {
                newCart.splice(index, 1, productToUpdate);
                // this.setState({cart: newCart});
                console.log(newCart);
                updateCart(newCart);
            }
        } else {
            // add product to cart
            const updatedCart = [...newCart, {...prod, quantity: 1}];
            // this.setState({cart: updatedCart});
            console.log(updatedCart);
            updateCart(updatedCart);
        }
    }

    removeItemFromCart(prod) {
        const {cart} = this.props.navbarReducer;
        const { updateCart } = this.props;
        console.log(this.props);
        const newCart = _.cloneDeep(cart);
        // if the product is in the cart already
        if(!_.isEmpty(_.find(newCart, { _id: prod._id }))) {
            // get the index of the product in the cart
            let index = _.findIndex(newCart, { _id: prod._id });
            // get the product object
            let productToUpdate = _.find(newCart, { _id: prod._id });
            // If the quantity is 1 we remove the product from the cart
            if(parseInt(productToUpdate.quantity) === 1) {
                // Remove the product
                _.remove(newCart, (item) => item._id === productToUpdate._id);
                // this.setState({cart: newCart});
                updateCart(newCart);
            } else {
                // We reduce the quantity
                productToUpdate = {...productToUpdate, quantity: parseInt(productToUpdate.quantity) - 1};
                if(index > -1) {
                    newCart.splice(index, 1, productToUpdate);
                    // this.setState({cart: newCart});
                    updateCart(newCart);
                }
            }
        }

    }

    render() {
        console.log(this.props);
        const { openCart, openSidebar, openCartExpanded } = this.state;
        const {cart, cartStores} = this.props.navbarReducer;
        const cartItemsByStore = _.groupBy(cart, 'storeId');
        console.log(cartStores, cartItemsByStore);
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
                        <div className={`sidebar-parent ${openCartExpanded && "sidebar-parent-expanded"}`}>
                            <div className="sidebar-icons-parent">
                                <IoIosClose className="icon-class" onClick={() => {this.setState({openCart: false})}}/>
                                <IoIosResize className="icon-class icon-class-resize" onClick={() => {this.setState({openCartExpanded: !openCartExpanded})}}/>
                            </div>
                            <div className="cart-container">
                                {
                                    cartStores.length > 1 &&
                                        <div className="one-plus-store-warning">
                                            <span>You have products in the cart from more than one store</span>
                                        </div>
                                }
                                    {
                                        // Important Code - DON'T DELETE THE CODE BELOW - WILL BREAK THINGS
                                        (cartStores.length === Object.keys(cartItemsByStore).length) && cartStores.map((store, i) => {
                                            console.log(store);
                                            return (
                                                <div className="single-store-container" key={i}>
                                                    <div className="store-name-container">
                                                        <span>{store.storeName}</span>
                                                    </div>
                                                    <div className="cart-sub-container">
                                                        {
                                                            cartItemsByStore[store._id].map((prod, i) => {
                                                                return (
                                                                    <CartItem
                                                                        key={i}
                                                                        prod={prod}
                                                                        addItem={(prod) => this.addItemToCart(prod)}
                                                                        removeItem={(prod) => this.removeItemFromCart(prod)}
                                                                    />
                                                                )
                                                            })
                                                        }
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
                        <div className="sidebar-icons-parent">
                            <IoIosClose className="icon-class" onClick={() => {this.setState({openSidebar: false})}}/>
                        </div>
                        <div className="menu-item" onClick={() => this.routerPush(ROUTES.HOME)}>
                            <RiStore2Line className="icon-class"/>
                            <span className="menu-link">Stores</span>
                        </div>
                        <div className="menu-item" onClick={() => this.routerPush(ROUTES.PROFILE)}>
                            <IoMdPerson className="icon-class"/>
                            <span className="menu-link">Profile</span>
                        </div>
                        <div className="menu-item" onClick={() => this.openCart()}>
                            <IoMdCart className="icon-class"/>
                            <span className="menu-link">Cart</span>
                        </div>
                        <div className="menu-item" onClick={() => this.routerPush(ROUTES.ORDERS)}>
                            <IoMdListBox className="icon-class"/>
                            <span className="menu-link">Orders</span>
                        </div>
                        <div className="menu-item">
                            <IoMdPin className="icon-class" onClick={() => this.routerPush(ROUTES.ADDRESSES)}/>
                            <span className="menu-link">Addresses</span>
                        </div>
                        <div className="menu-item" onClick={() => this.routerPush(ROUTES.PAYMENTS)}>
                            <IoIosCard className="icon-class"/>
                            <span className="menu-link">Payments</span>
                        </div>
                        <div className="menu-item" onClick={this.logout}>
                            <IoMdExit className="icon-class"/>
                            <span className="menu-link">Logout</span>
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
        updateCart: (cartItems) => dispatch(updateCart(cartItems)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerNavbar));
