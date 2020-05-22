import React, { Component } from 'react';
import '../../css/store/storeHome.scss';
import { connect } from "react-redux";
import {addValue} from "../../redux/actions/homeActions";
import axios from "axios";
import {STORE_TOKEN_NAME} from "../../utils/constants";
import {Button, OrderContainer} from "../utils/Utils";

class StoreHome extends Component {

    constructor() {
        super();
        this.state = {
            searchStore: ""
        }
    }

    componentDidMount() {
        const token = localStorage.getItem(STORE_TOKEN_NAME);
        const bearerToken = `Bearer ${token}`;
    }

    render() {
        const {searchStore} = this.state;
        return (
            <div className="store-home-parent">
                <div className="store-home-container">
                    <div className="store-orders-container">
                        <div className="store-orders-heading-container">
                            <span className="store-orders-heading">Current Orders</span>
                            <span className="store-orders-view-all">View All</span>
                        </div>
                        <div className="store-orders">
                            <OrderContainer
                                date={"20 May 2020, 12:54 PM"}
                                itemsCount={"10"}
                                cost={"$50.45"}
                                onViewCLick={() => {}}
                            />
                        </div>
                    </div>
                    <div className="store-orders-container">
                        <div className="store-orders-heading-container">
                            <span className="store-orders-heading">Past Orders</span>
                            <span className="store-orders-view-all">View All</span>
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
                </div>
            </div>
        );
    }
}

export const mapStateToProps = ({homeReducer}) => {
    return { homeReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        addValue: (payload) => dispatch(addValue(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreHome)
