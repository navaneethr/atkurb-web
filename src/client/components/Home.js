import React, { Component } from 'react';
import '../css/home.scss';
import { connect } from "react-redux";
import {addValue} from "../redux/actions/homeActions";
import axios from "axios";
import {TOKEN_NAME} from "../utils/constants";
import {auth} from "../auth/auth";
import Navbar from "./Navbar";


class Home extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const token = localStorage.getItem(TOKEN_NAME);
        const bearerToken = `Bearer ${token}`;
        axios.get("/api/user", { 'headers': { 'Authorization': bearerToken} })
    }

    render() {
        console.log(this.props);
        const { number } = this.props.homeReducer;
        return (
            <div className="home-parent">
                {auth.isAuthenticated && <Navbar/>}
                <span>RDX Boilerplate</span>
                <button onClick={() => this.props.addValue(1)}>Redux Thunk - Add</button>
                <span>{number}</span>
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
