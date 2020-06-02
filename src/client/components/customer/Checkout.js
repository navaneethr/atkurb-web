import React, { Component } from 'react';
import '../../css/customer/checkout.scss';
import {placeOrder} from "../../redux/actions/navbarActions";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {ROUTES} from "../../utils/constants";
import {Button, Loader} from "../utils/Utils";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_E9DhYZpvYfrwNAMKD4NbA3nB00tUNYLQLe");
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import poweredByStripe from '../../assets/poweredByStripe.png';


class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            shopperTip: 0
        }
    }

    componentDidMount() {

    }

    placeOrder() {
        const {placeOrder, history} = this.props;
        const {cart, checkOutStore, cartStores, userDetails} = this.props.navbarReducer;
        const {shopperTip} = this.state;
        const checkOutItems = cart.filter((item) => item.storeId === checkOutStore);
        let storeDetails = cartStores.filter(({_id}) => _id === checkOutStore);
        storeDetails = storeDetails.length > 0 ? storeDetails[0] : null;
        const subTotal = checkOutItems.reduce((acc, item) => acc + (item.unitPrice*item.quantity), 0);
        const tax = subTotal*0.09;
        const serviceFee = 2.49;
        const payload = {
            storeId: storeDetails._id,
            items: checkOutItems,
            associatedUser: userDetails._id,
            userPhone: userDetails.phone,
            userEmail: userDetails.email,
            cost: {
                serviceFee: serviceFee,
                taxes: tax,
                itemsCost: subTotal,
                shopperTip: shopperTip,
            },
            orderStatus: {
                pending: true,
                accepted: false,
                fulfilled: false
            }
        };

        placeOrder(payload, history);
        // Add the payload to orders table then take the order id and push it to user's orders and business orders array
        // Then remove added items from the cart
    }

    render() {
        const {cart, checkOutStore, cartStores, fetchInProgress} = this.props.navbarReducer;
        const {shopperTip} = this.state;
        const checkOutItems = cart.filter((item) => item.storeId === checkOutStore);
        let storeDetails = cartStores.filter(({_id}) => _id === checkOutStore);
        storeDetails = storeDetails.length > 0 ? storeDetails[0] : null;
        const storeName = storeDetails && storeDetails.storeName;
        const subTotal = checkOutItems.reduce((acc, item) => acc + (item.unitPrice*item.quantity), 0);
        const tax = subTotal*0.09;
        const serviceFee = 2.49;
        const grandTotal = subTotal + tax + serviceFee + parseFloat(_.isEmpty(shopperTip) || (shopperTip < 0) ? 0 : shopperTip);
        return (
            <div className="checkout-parent">
                {
                    !_.isEmpty(checkOutStore) &&
                    <div className="fixed-top-left">
                        <span className="checkout-heading" onClick={() => this.props.history.push(`${ROUTES.SHOP}/${checkOutStore}`)}>Got back to {storeName}</span>
                    </div>
                }
                {
                    fetchInProgress &&
                    <div className="warning-checkout-parent">
                        <Loader loading={fetchInProgress} color="#295454" size={15}/>
                    </div>
                }
                {
                    !fetchInProgress && !_.isEmpty(checkOutItems) &&
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
                                        <span className="order-cost-child">$ <input type="number" min={0} value={shopperTip} onChange={(e) => this.setState({shopperTip: e.target.value})}/></span>
                                    </div>
                                </div>
                                <div className="order-cost-parent">
                                    <div className="order-cost-section">
                                        <span className="order-cost-child">Total</span>
                                        <span className="order-cost-child">${grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Elements
                                    stripe={stripePromise}
                                >
                                    <CheckoutForm/>
                                </Elements>
                                <div className="checkout-button-container">
                                    <Button label="Order now & Pay at store" onClick={() => {this.placeOrder()}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !fetchInProgress && _.isEmpty(checkOutItems) &&
                    <div className="warning-checkout-parent">
                        You either do not have anything in your cart or you din't checkout the cart items
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
        checkOutStore: (storeId) => dispatch(checkOutStore(storeId)),
        placeOrder: (order, history) => dispatch(placeOrder(order, history)),
        getCart: () => dispatch(getCart()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <CardElement />
            <div className="stripe-button-container">
                <Button type="submit" label="Pay Now" disabled={!stripe}/>
                <img src={poweredByStripe} onClick={handleSubmit}/>
            </div>
        </form>
    );
};
