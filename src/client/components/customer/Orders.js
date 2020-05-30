import React, { Component } from 'react';
import '../../css/customer/orders.scss';
import {getOrders} from "../../redux/actions/orderActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button} from "../utils/Utils";
import {ROUTES} from "../../utils/constants";
import moment from "moment";


class Orders extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const {getOrders} = this.props;
        getOrders();
    }

    render() {
        console.log(this.props);
        const {orders, orderRelatedStores} = this.props.orderReducer;
        const completeOrders = orders.map((order) => {
            const storeDetails = _.find(orderRelatedStores, {'_id': order.storeId});
            return {...order, storeDetails}
        });
        console.log(completeOrders);
        return (
            <div className="orders-parent">
                <div className="fixed-top-left">
                    <span className="orders-heading">Orders</span>
                </div>
                <div className="orders-container">
                    {
                        orders.length < 1 &&
                            <div className="empty-order-container">
                                <span>You do not have any orders</span>
                                <Button label="Shop Now" onClick={() => {this.props.history.push(ROUTES.HOME)}}/>
                            </div>
                    }
                    {
                        completeOrders.map((order, i) => {
                            const {itemsCost, serviceFee, shopperTip, taxes} = order.cost;
                            const cost = parseFloat(itemsCost) + parseFloat(serviceFee) + parseFloat(shopperTip) + parseFloat(taxes);
                            return (
                                <div className="order-container" key={i}>
                                    <div className="order-parent">
                                        <div className="order-label-value">
                                            <span className="label">Order ID</span>
                                            <span className="value">{order._id}</span>
                                        </div>
                                        <div className="order-label-value">
                                            <span className="label">Store Name</span>
                                            <span className="value">{order.storeDetails.storeName}</span>
                                        </div>
                                        <div className="order-label-value">
                                            <span className="label">Store Phone</span>
                                            <span className="value">{order.storeDetails.phone}</span>
                                        </div>
                                        <div className="order-label-value">
                                            <span className="label">Order Placed</span>
                                            <span className="value">{moment(order.date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                        </div>
                                        <div className="order-label-value">
                                            <span className="label">Item Count</span>
                                            <span className="value">{order.items.length}</span>
                                        </div>
                                        <div className="order-label-value">
                                            <span className="label">Total</span>
                                            <span className="value">{parseFloat(cost).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="order-items-container">
                                        {
                                            order.items.map((item, i) => {
                                                return (
                                                    <div key={i} className="order-image-container">
                                                        <img src={item.imgUrl} />
                                                    </div>
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
        );
    }
}

export const mapStateToProps = ({ orderReducer, navbarReducer }) => {
    return { orderReducer, navbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: () => dispatch(getOrders()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));
