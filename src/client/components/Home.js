import React, { Component } from 'react';
import '../css/home.scss';
import { connect } from "react-redux";
import {addValue} from "../redux/actions/homeActions";
import axios from "axios";
import {TOKEN_NAME} from "../utils/constants";
import {Button} from "./utils/Utils";

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
                <span>RDX Boilerplate</span>
                <Button
                    onClick={() => this.props.addValue(1)}
                    label="Redux Thunk"
                    loading={true}
                />
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
