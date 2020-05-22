import React, { Component } from 'react';
import '../css/home.scss';
import { connect } from "react-redux";
import {addValue} from "../redux/actions/homeActions";
import axios from "axios";
import {CUSTOMER_TOKEN_NAME} from "../utils/constants";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            searchStore: ""
        }
    }

    componentDidMount() {
        const token = localStorage.getItem(CUSTOMER_TOKEN_NAME);
        const bearerToken = `Bearer ${token}`;
        axios.get("/api/user", { 'headers': { 'Authorization': bearerToken} })
    }

    render() {
        console.log(this.props);
        const { number } = this.props.homeReducer;
        const {searchStore} = this.state;
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
                    <div className="stores-section">
                        <div className="heading-container">
                            <span className="heading">Stores you frequently buy from</span>
                        </div>
                        <div className="stores-container">
                            <div className="store-item">
                                <div className="store-brand-container">
                                    Store 1
                                </div>
                                <div className="store-info-container">
                                    Dublin
                                </div>
                            </div>
                            <div className="store-item">
                                <div className="store-brand-container">
                                    Store 1
                                </div>
                                <div className="store-info-container">
                                    Dublin
                                </div>
                            </div>
                            <div className="store-item">
                                <div className="store-brand-container">
                                    Store 1
                                </div>
                                <div className="store-info-container">
                                    Dublin
                                </div>
                            </div>
                            <div className="store-item">
                                <div className="store-brand-container">
                                    Store 1
                                </div>
                                <div className="store-info-container">
                                    Dublin
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stores-section">
                        <div className="heading-container">
                            <span className="heading">Stores Nearby</span>
                        </div>
                        <div className="stores-container">
                            <div className="store-item">
                                <div className="store-brand-container">
                                    Store 1
                                </div>
                                <div className="store-info-container">
                                    Dublin
                                </div>
                            </div>
                            <div className="store-item">
                                <div className="store-brand-container">
                                    Store 1
                                </div>
                                <div className="store-info-container">
                                    Dublin
                                </div>
                            </div>
                            <div className="store-item">
                                <div className="store-brand-container">
                                    Store 1
                                </div>
                                <div className="store-info-container">
                                    Dublin
                                </div>
                            </div>
                            <div className="store-item">
                                <div className="store-brand-container">
                                    Store 1
                                </div>
                                <div className="store-info-container">
                                    Dublin
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
