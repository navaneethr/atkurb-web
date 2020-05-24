import React, { Component } from 'react';
import '../../css/customer/shop.scss';
import { Product } from "../utils/Utils";
import * as _ from 'lodash';
import { getProducts } from "../../redux/actions/shopActions";
import { updateCart } from "../../redux/actions/navbarActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class Shop extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            cart: []
        }
    }

    componentDidMount() {
        const { storeId } = this.props.match.params;
        console.log(this.props);
        const { getProducts } = this.props;
        getProducts(storeId);
    }

    getRequiredValue(prod) {
        const {cart} = this.props.navbarReducer;
        let requiredQty = "";

        if(_.isEmpty(_.find(cart, { 'id': prod._id }))) {
            requiredQty = 0;
        } else {
            requiredQty = _.find(cart, { 'id': prod._id }).quantity;
        }
        return requiredQty;
    }

    addItemToCart(prod) {
        const {cart} = this.props.navbarReducer;
        const { updateCart } = this.props;

        const newCart = _.cloneDeep(cart);
        // if the product is in the cart already
        if(!_.isEmpty(_.find(newCart, { id: prod._id }))) {
            // get the index of the product in the cart
            let index = _.findIndex(newCart, { id: prod._id });
            // get the product object
            let productToUpdate = _.find(newCart, { id: prod._id });
            // Update the product
            productToUpdate = {...productToUpdate, quantity: productToUpdate.quantity + 1};
            // we recheck if there is an object just to make sure before adding it to the state
            if(index > -1) {
                newCart.splice(index, 1, productToUpdate);
                // this.setState({cart: newCart});
                updateCart(newCart)
            }
        } else {
            // add product to cart
            const updatedCart = [...newCart, {id: prod._id, quantity: 1}];
            // this.setState({cart: updatedCart});
            updateCart(updatedCart)
        }
    }

    removeItemFromCart(prod) {
        const {cart} = this.props.navbarReducer;
        const { updateCart } = this.props;
        const newCart = _.cloneDeep(cart);
        // if the product is in the cart already
        if(!_.isEmpty(_.find(newCart, { id: prod._id }))) {
            // get the index of the product in the cart
            let index = _.findIndex(newCart, { id: prod._id });
            // get the product object
            let productToUpdate = _.find(newCart, { id: prod._id });
            // If the quantity is 1 we remove the product from the cart
            if(productToUpdate.quantity === 1) {
                // Remove the product
                _.remove(newCart, (item) => item.id === productToUpdate.id);
                // this.setState({cart: newCart});
                updateCart(newCart);
            } else {
                // We reduce the quantity
                productToUpdate = {...productToUpdate, quantity: productToUpdate.quantity - 1};
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
        const {products} = this.props.shopReducer;

        return (
            <div className="shop-parent">
                <div className="shop-container">
                    <div className="shop-header">
                        <span className="shop-heading">Anu Kirana Store</span>
                    </div>
                    <div className="products-container">
                        {
                            products.map((prod, i) => {
                                return (
                                    <Product
                                        key={i}
                                        name={prod.name}
                                        quantity={prod.quantity}
                                        unit={prod.unit.value}
                                        unitPrice={prod.unitPrice}
                                        onRemove={() => {this.removeItemFromCart(prod)}}
                                        onAdd={() => {this.addItemToCart(prod)}}
                                        requiredQuantity={this.getRequiredValue(prod)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = ({shopReducer, navbarReducer}) => {
    return { shopReducer, navbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (storeId) => dispatch(getProducts(storeId)),
        updateCart: (cartItems) => dispatch(updateCart(cartItems))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop))
