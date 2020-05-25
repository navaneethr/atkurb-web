import React, { Component } from 'react';
import '../../css/customer/shop.scss';
import { Product } from "../utils/Utils";
import * as _ from 'lodash';
import { getProducts, getStoreInfo, selectProductsCategory } from "../../redux/actions/shopActions";
import { updateCart } from "../../redux/actions/navbarActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import {categoryOptions} from "../../utils/constants";

class Shop extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            cart: []
        }
    }

    componentDidMount() {
        const { storeId, category } = this.props.match.params;
        console.log(this.props);
        const { getStoreInfo, selectProductsCategory } = this.props;
        // Select Products Category also fetches items
        selectProductsCategory({category: 'all', storeId});
        getStoreInfo(storeId);
        console.log(category);
    }

    getRequiredValue(prod) {
        const {cart} = this.props.navbarReducer;
        let requiredQty = "";

        if(_.isEmpty(_.find(cart, { _id: prod._id }))) {
            requiredQty = 0;
        } else {
            requiredQty = _.find(cart, { _id: prod._id }).quantity;
        }
        return requiredQty;
    }

    addItemToCart(prod) {
        const {cart} = this.props.navbarReducer;
        const { storeId } = this.props.match.params;
        const { updateCart } = this.props;

        const newCart = _.cloneDeep(cart);
        // if the product is in the cart already
        if(!_.isEmpty(_.find(newCart, { _id: prod._id }))) {
            // get the index of the product in the cart
            let index = _.findIndex(newCart, { _id: prod._id });
            // get the product object
            let productToUpdate = _.find(newCart, { _id: prod._id });
            // Update the product
            productToUpdate = {...productToUpdate, ...prod, quantity: parseInt(productToUpdate.quantity) + 1, storeId};
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

    selectCategory(category) {
        console.log(this.props);
        const { selectProductsCategory, history } = this.props;
        const { storeInfo } = this.props.shopReducer;
        selectProductsCategory({category, storeId: storeInfo._id});
    }

    render() {
        console.log(this.props);
        const {products, storeInfo, selectedCategory} = this.props.shopReducer;

        return (
            <div className="shop-parent">
                <div className="category-navbar">
                    {
                        [{label: "Show All", value: "all"}, ...categoryOptions].map(( {label, value}, i) => {
                            return (
                                <div className="category-option-parent" key={i}>
                                    <div className={`category-option ${(selectedCategory === value) && `category-option-active`}`} onClick={() => this.selectCategory(value)}>
                                        {label}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="shop-container">
                    <div className="shop-header">
                        <span className="shop-heading">{storeInfo && storeInfo.storeName}</span>
                    </div>
                    <div className="products-container">
                        {
                            products.map((prod, i) => {
                                return (
                                    <Product
                                        key={i}
                                        name={prod.name}
                                        quantity={prod.unitQuantity}
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
        updateCart: (cartItems) => dispatch(updateCart(cartItems)),
        getStoreInfo: (storeId) => dispatch(getStoreInfo(storeId)),
        selectProductsCategory: (payload) => dispatch(selectProductsCategory(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop))
