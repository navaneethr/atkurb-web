import React, { Component } from 'react';
import '../../css/common/home.scss';
import { connect } from "react-redux";
import {addValue} from "../../redux/actions/homeActions";
import axios from "axios";
import {STORE_TOKEN_NAME} from "../../utils/constants";

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
            <div className="home-parent">
                Store Home
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