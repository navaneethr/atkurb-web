import React, { Component } from 'react';
import '../../css/common/navbar.scss';
import { connect } from "react-redux";
import {addValue} from "../../redux/actions/homeActions";
import {ROUTES, CUSTOMER_TOKEN_NAME} from "../../utils/constants";
import {auth} from "../../auth/auth";
import { Link, withRouter } from "react-router-dom";
import {denyAuthenticationCustomer} from "../../redux/actions/rootActions";
import {getCart, updateCart} from "../../redux/actions/navbarActions";
import { IoMdCart, IoIosClose, IoIosAddCircle, IoIosRemoveCircle  } from "react-icons/io";
import {CartItem} from "../utils/Utils";

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
            console.log(openCart);
            if(openCart) {
                // Fetch Products
            }
        })
    }

    addItemToCart(prod) {
        const {cart} = this.props.navbarReducer;
        const { storeId } = this.props.match.params;
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
            productToUpdate = {...productToUpdate, ...prod, quantity: parseInt(productToUpdate.quantity) + 1, storeId};
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
            const updatedCart = [...newCart, {...prod, quantity: 1, storeId}];
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
        const { openCart, openSidebar } = this.state;
        const {cart} = this.props.navbarReducer;
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
                                    cart.map((prod, i) => {
                                        console.log("prod", prod);
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
        updateCart: (cartItems) => dispatch(updateCart(cartItems)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerNavbar));
