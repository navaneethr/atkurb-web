import React, { Component } from 'react';
import '../../css/customer/checkout.scss';
import {checkOutStore} from "../../redux/actions/navbarActions";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {ROUTES} from "../../utils/constants";
import {Button} from "../utils/Utils";


class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            shoppersTip: 0
        }
    }

    componentDidMount() {

    }

    render() {
        const {cart, checkOutStore, cartStores} = this.props.navbarReducer;
        const {shoppersTip} = this.state;
        const checkOutItems = cart.filter((item) => item.storeId === checkOutStore);
        let storeDetails = cartStores.filter(({_id}) => _id === checkOutStore);
        storeDetails = storeDetails.length > 0 ? storeDetails[0] : null;
        const storeName = storeDetails && storeDetails.storeName;
        const subTotal = cart.reduce((acc, item) => acc + (item.unitPrice*item.quantity), 0);
        const tax = subTotal*0.09;
        const serviceFee = 2.49;
        const grandTotal = subTotal + tax + serviceFee + parseFloat(_.isEmpty(shoppersTip) || (shoppersTip < 0) ? 0 : shoppersTip);
        return (
            <div className="checkout-parent">
                <div className="fixed-top-left">
                    <span className="checkout-heading" onClick={() => this.props.history.push(`${ROUTES.SHOP}/${checkOutStore}`)}>Got back to {storeName}</span>
                </div>
                <div className="checkout-container">
                    <div className="checkout-header">
                        <span className="checkout-heading">Checkout</span>
                    </div>
                    <div className="info-checkout-container">
                        <div className="info-only-container">
                            <div className="checkout-card-container">
                                {
                                    checkOutItems.map((item, i) => {
                                        return (
                                            <div key={i} className="checkout-item-parent">
                                                <img src={item.imgUrl} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="checkout-card-container checkout-card-address-container">
                                <div className="checkout-address-header">Pickup Address</div>
                                <div className="checkout-pickup-address">
                                    <span className="address-line">{storeName}</span>
                                    <span className="address-line">129 West Brooks St</span>
                                    <span className="address-line">New Orleans, LA</span>
                                    <span className="address-line">70124</span>
                                </div>
                            </div>
                            <div className="checkout-card-container checkout-card-other-info-container">
                                <div className="checkout-info-header">Pickup Time</div>
                            </div>
                            <div className="checkout-card-container checkout-card-other-info-container">
                                <div className="checkout-info-header">Pickup Instructions</div>
                            </div>
                            <div className="checkout-card-container checkout-card-other-info-container">
                                <div className="checkout-info-header">Your Contact Information</div>
                            </div>
                            <div className="checkout-card-container checkout-card-other-info-container">
                                <div className="checkout-info-header">Payment</div>
                            </div>
                        </div>
                        <div className="checkout-only-container">
                            <div className="order-cost-parent">
                                <div className="order-cost-section">
                                    <span className="order-cost-child">Subtotal</span>
                                    <span className="order-cost-child">{`$${subTotal.toFixed(2)}`}</span>
                                </div>
                                <div className="order-cost-section">
                                    <span className="order-cost-child">Service Fee</span>
                                    <span className="order-cost-child">{`$${serviceFee.toFixed(2)}`}</span>
                                </div>
                                <div className="order-cost-section">
                                    <span className="order-cost-child">Sales Tax</span>
                                    <span className="order-cost-child">{`$${tax.toFixed(2)}`}</span>
                                </div>
                                <div className="order-cost-section">
                                    <span className="order-cost-child">Shopper's Tip</span>
                                    <span className="order-cost-child">$ <input type="number" min={0} value={shoppersTip} onChange={(e) => this.setState({shoppersTip: e.target.value})}/></span>
                                </div>
                            </div>
                            <div className="order-cost-parent">
                                <div className="order-cost-section">
                                    <span className="order-cost-child">Total</span>
                                    <span className="order-cost-child">${grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="checkout-button-container">
                                <Button label="Place Order"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = ({rootReducer, navbarReducer}) => {
    return { rootReducer, navbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        checkOutStore: (storeId) => dispatch(checkOutStore(storeId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
