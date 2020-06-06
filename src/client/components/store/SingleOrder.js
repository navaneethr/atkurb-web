import React, { Component } from 'react';
import '../../css/store/singleOrder.scss';
import moment from "moment/moment";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button} from "../utils/Utils";


class SingleOrder extends Component {

    constructor() {
        super();
    }

    render() {
        console.log(this.props);
        const {storeOrders} = this.props.storeNavbarReducer;
        const {orderId} = this.props.match.params;
        const order = _.find(storeOrders, {_id: orderId});
        console.log(order);
        return (
            <div className="single-order-parent">
                {
                    order &&
                    <div className="order-list">
                        <div className="shopping-list-header">
                            <span>Shopping List</span>
                        </div>
                        <div className="order-list-info">
                            <div className="info">
                                <span className="info-label">Customer Name</span>
                                <span>{order.userFullName}</span>
                                <span className="info-label">Customer Email</span>
                                <span>{order.userEmail}</span>
                                <span className="info-label">Customer Phone</span>
                                <span>{order.userPhone}</span>
                            </div>
                            <div className="info">
                                <span className="info-label">Service Fee</span>
                                <span>{order.cost.serviceFee.toFixed(2)}</span>
                                <span className="info-label">Items Cost</span>
                                <span>{order.cost.itemsCost.toFixed(2)}</span>
                                <span className="info-label">Shopper Tip</span>
                                <span>{order.cost.shopperTip.toFixed(2)}</span>
                                <span className="info-label">Tax</span>
                                <span>{order.cost.taxes.toFixed(2)}</span>
                                <span className="info-label">Order Paid</span>
                                <span>{order.paid ? "Yes" : "No"}</span>
                            </div>
                        </div>
                        <div className="order-list-info">
                            <div className="info center instructions">
                                <span className="info-label ">Instructions</span>
                                <span>{order.instructions}</span>
                            </div>
                        </div>
                        <div className="items-container">
                            {
                                order.items.map((item, i) => {
                                    return (
                                        <div className="item-container" key={i}>
                                            <div className="image-container">
                                                <img src={item.imgUrl} />
                                            </div>
                                            <div className="info">
                                                <span className="info-label">Name</span>
                                                <span>{item.name}</span>
                                                <span className="info-label">Category</span>
                                                <span>{item.category}</span>
                                            </div>
                                            <div className="info">
                                                <span className="info-label">Description</span>
                                                <span>{item.description}</span>
                                                <span className="info-label">Quantity</span>
                                                <span>{item.quantity} X {item.unitQuantity} {item.unit}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="button-container">
                            <Button label="Complete Order"/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export const mapStateToProps = ({ storeNavbarReducer }) => {
    return { storeNavbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingleOrder));
