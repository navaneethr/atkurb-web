import React, { Component } from 'react';
import '../../css/customer/home.scss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import {addValue} from "../../redux/actions/homeActions";
import axios from "axios";
import {CUSTOMER_TOKEN_NAME, ROUTES} from "../../utils/constants";
import {AlertError} from "../utils/Utils";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            searchStore: "",
            storesNearby: [],
            favStores: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem(CUSTOMER_TOKEN_NAME);
        const bearerToken = `Bearer ${token}`;
        axios.get("/api/store/all", { 'headers': { 'Authorization': bearerToken} }).then((res) => {
            console.log(res);
            this.setState({storesNearby: res.data});
        }).catch((error) => {
            console.log(error);
            AlertError("Failed to fetch stores, please retry");
        })
    }

    onStoreClick(id) {
        this.props.history.push(`${ROUTES.SHOP}/${id}`)
    }

    render() {
        console.log(this.props);
        const { number } = this.props.homeReducer;
        const {searchStore, storesNearby, favStores} = this.state;
        return (
            <div className="home-parent">
                {/*<span>RDX Boilerplate</span>
                <Button
                    onClick={() => this.props.addValue(1)}
                    label="Redux Thunk"
                    loading={false}
                />
                <span>{number}</span>*/}
                <input
                    className="text-input navbar-fixed-input"
                    type="text"
                    onChange={(e) => this.setState({searchStore: e.target.value})}
                    placeholder="Search for Stores"
                    value={searchStore}
                />
                <div className="stores-parent">
                    {
                        !_.isEmpty(favStores) &&
                            <div className="stores-section">
                            <div className="heading-container">
                                <span className="heading">Stores you frequently buy from</span>
                            </div>
                            <div className="stores-container">
                                {
                                    favStores.map((store) => {
                                        return (
                                            <div className="store-item">
                                                <div className="store-brand-container">
                                                    Store 1
                                                </div>
                                                <div className="store-info-container">
                                                    Dublin
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    <div className="stores-section">
                        <div className="heading-container">
                            <span className="heading">Stores Nearby</span>
                        </div>
                        <div className="stores-container">
                            {
                                storesNearby.map(({storeName, _id}, key) => {
                                    return (
                                        <div className="store-item" key={key} onClick={() => this.onStoreClick(_id)}>
                                            <div className="store-brand-container">
                                            </div>
                                            <div className="store-info-container">
                                                {storeName && (storeName.length > 15 ? storeName.substring(0, 15) + "..." : storeName)}
                                            </div>
                                        </div>
                                    )
                                })
                            }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
