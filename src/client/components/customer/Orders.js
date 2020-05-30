import React, { Component } from 'react';
import '../../css/customer/orders.scss';
import {getOrders} from "../../redux/actions/orderActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


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
        const {orders} = this.props.orderReducer;
        return (
            <div className="orders-parent">
                <div className="fixed-top-left">
                    <span className="orders-heading">Orders</span>
                </div>
                <div className="orders-container">
                    {
                        orders.map((order, i) => {
                            return (
                                <div className="order-parent" key={i}>
                                    <span>{order._id}</span>
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
