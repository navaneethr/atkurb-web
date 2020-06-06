import React, { Component, useState } from 'react';
import '../../css/customer/checkout.scss';
import {placeOrder} from "../../redux/actions/navbarActions";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {CUSTOMER_TOKEN_NAME, ROUTES} from "../../utils/constants";
import {AlertError, AlertInfo, AlertSuccess, Button, Loader} from "../utils/Utils";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_E9DhYZpvYfrwNAMKD4NbA3nB00tUNYLQLe");
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import poweredByStripe from '../../assets/poweredByStripe.png';
import axios from 'axios';
import moment from 'moment';

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            shopperTip: 0,
            pickupTime: null,
            instructions: ""
        }
    }

    componentDidMount() {

    }

    placeOrder(paid = false) {
        const {placeOrder, history} = this.props;
        const {cart, checkOutStore, cartStores, userDetails} = this.props.navbarReducer;
        const {shopperTip, pickupTime, instructions} = this.state;
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
            userFullName: userDetails.fullName,
            pickupTime: pickupTime,
            instructions: instructions,
            paid: paid,
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
        const {shopperTip, pickupTime, instructions} = this.state;
        const checkOutItems = cart.filter((item) => item.storeId === checkOutStore);
        let storeDetails = cartStores.filter(({_id}) => _id === checkOutStore);
        storeDetails = storeDetails.length > 0 ? storeDetails[0] : null;
        const storeName = storeDetails && storeDetails.storeName;
        const subTotal = checkOutItems.reduce((acc, item) => acc + (item.unitPrice*item.quantity), 0);
        const tax = subTotal*0.09;
        const serviceFee = 2.49;
        const grandTotal = subTotal + tax + serviceFee + parseFloat(_.isEmpty(shopperTip) || (shopperTip < 0) ? 0 : shopperTip);
        const storeTimes = storeDetails ? storeDetails.storeTimes : {};
        const startT = moment(storeTimes.openTime);
        const endT = moment(storeTimes.closeTime);
        console.log(startT, endT);
        let timesToPickup = [];
        let currTs = startT;
        if(storeDetails) {
            while (moment(currTs).isBefore(endT) && !moment(currTs).add(storeDetails.pickUpInterval, 'hours').isAfter(endT)) {
                currTs = startT.add(storeDetails.pickUpInterval, 'hours').format();
                timesToPickup.push(currTs);
            }
        }
        console.log(timesToPickup);
        return (
            <div className="checkout-parent">
                {
                    !_.isEmpty(checkOutStore) &&
                    <div className="fixed-top-left">
                        <span className="checkout-heading" onClick={() => {this.props.history.push(`${ROUTES.SHOP}/${checkOutStore}`)}}>Go back to {storeName}</span>
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
                                        <span className="address-line">{_.get(storeDetails, 'address.line1', '') + " " + _.get(storeDetails, 'address.line2', '')}</span>
                                        <span className="address-line">{_.get(storeDetails, 'address.city', '')}</span>
                                        <span className="address-line">{_.get(storeDetails, 'address.state', '')}</span>
                                        <span className="address-line">{_.get(storeDetails, 'address.zip', '')}</span>
                                    </div>
                                </div>
                                <div className="checkout-card-container checkout-card-other-info-container">
                                    <div className="checkout-info-header">Pickup Time</div>
                                    <div className="times-container">
                                        {
                                            timesToPickup.map((time, key) => {
                                                let className = `pickup-time-container ${moment(pickupTime).format('YYYY-MM-DDTHH:MM') === moment(time).format('YYYY-MM-DDTHH:MM') ? "active" : ""}`;
                                                return (
                                                    <div className={className} key={key} onClick={() => {this.setState({pickupTime: time})}}>
                                                        <div className="pickup-time">{moment(time).format("hh:mm A")}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="checkout-card-container checkout-card-other-info-container">
                                    <div className="checkout-info-header">Pickup Instructions</div>
                                    <div className="instructions-container">
                                        <textarea type="text" className="text-input" value= {instructions} onChange={(e) => {this.setState({instructions: e.target.value})}}/>
                                    </div>
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
                                        <span className="order-cost-child">$ <input type="number" min={0} value={shopperTip} onChange={(e) => this.setState({shopperTip: _.isNaN(e.target.value) ? 0 : parseFloat(e.target.value)})}/></span>
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
                                    <CheckoutForm
                                        onSuccessPayment={() => this.placeOrder(true)}
                                        pickupTime={pickupTime}
                                    />
                                </Elements>
                                <div className="checkout-button-container">
                                    <Button label="Order now & Pay at store" onClick={() => {pickupTime ? this.placeOrder() : AlertInfo("Make sure you pick a time slot")}}/>
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


const CheckoutForm = ({onSuccessPayment, pickupTime}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
    const config = {
        headers: {
            Authorization: AuthToken,
        }
    };


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        if(pickupTime) {
            setProcessing(true);
            console.log(processing);

            if (!stripe || !elements) {
                // Stripe.js has not loaded yet. Make sure to disable
                // form submission until Stripe.js has loaded.
                return;
            }

            const {data: clientSecret} = await axios.post('/api/order/pay', {amount: 1000}, config );

            // Get a reference to a mounted CardElement. Elements knows how
            // to find your CardElement because there can only ever be one of
            // each type of element.
            const cardElement = elements.getElement(CardElement);

            // Use your card Element with other Stripe.js APIs
            const { error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if(!error) {
                const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                });
                if(error) {
                    // Payment Failed
                    console.log(error)
                    AlertError("Payment Failed, Please Retry !");
                } else {
                    setProcessing(false);
                    AlertSuccess("Thank you for you Payment !");
                    console.log(paymentIntent);
                    onSuccessPayment();
                }
            } else {
                AlertError("Please enter the card details !");
                setProcessing(false);
            }
        } else {
            AlertInfo("Make sure you pick a time slot");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <CardElement />
            <div className="stripe-button-container">
                <Button type="submit" label="Pay Now" disabled={!stripe || processing} loading={processing}/>
                {
                    !processing && <img src={poweredByStripe} onClick={handleSubmit}/>
                }
            </div>
        </form>
    );
};
