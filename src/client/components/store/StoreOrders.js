import React, { Component } from 'react';
import '../../css/store/storeHome.scss';
import { connect } from "react-redux";
import {addValue} from "../../redux/actions/homeActions";
import {ROUTES, STORE_TOKEN_NAME} from "../../utils/constants";
import {OrderContainer} from "../utils/Utils";
import moment from 'moment';

class StoreOrders extends Component {

    constructor() {
        super();
        this.state = {
            searchStore: "",
            showCurrentOrders: true
        }
    }

    componentDidMount() {
        const token = localStorage.getItem(STORE_TOKEN_NAME);
        const bearerToken = `Bearer ${token}`;

    }

    render() {
        const {searchStore, showCurrentOrders} = this.state;
        const { storeOrders } = this.props.storeNavbarReducer;
        return (
            <div className="store-home-parent">
                <div className="store-home-container">
                    {
                        showCurrentOrders &&
                        <div className="store-orders-container">
                            <div className="store-orders-heading-container">
                                <span className="store-orders-heading">Current Orders</span>
                                <span className="store-orders-view-all" onClick={() => {this.setState({showCurrentOrders: !showCurrentOrders})}}>Show Past Orders</span>
                            </div>
                            <div className="store-orders">
                                {
                                    storeOrders.map((order, i) => {
                                        return (
                                            <OrderContainer
                                                key={i}
                                                date={moment(order.date).format('MMMM Do YYYY, h:mm:ss a')}
                                                itemsCount={order.items.length}
                                                cost={order.cost}
                                                onViewCLick={() => {}}
                                                orderStatus={order.orderStatus}
                                                userFullName={order.userFullName}
                                                userPhone={order.userPhone}
                                                userEmail={order.userEmail}
                                                onViewClick={() => this.props.history.push(`${ROUTES.STORE_ORDERS}/${order._id}`)}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {
                        !showCurrentOrders &&
                        <div className="store-orders-container">
                            <div className="store-orders-heading-container">
                                <span className="store-orders-heading">Past Orders</span>
                                <span className="store-orders-view-all" onClick={() => {this.setState({showCurrentOrders: !showCurrentOrders})}}>Show Current Orders</span>
                            </div>
                            <div className="store-orders">
                                <OrderContainer
                                    date={"18 May 2020, 12:14 PM"}
                                    itemsCount={"14"}
                                    cost={"$90.12"}
                                    onViewCLick={() => {}}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export const mapStateToProps = ({homeReducer, storeNavbarReducer}) => {
    return { homeReducer, storeNavbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        addValue: (payload) => dispatch(addValue(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreOrders)
