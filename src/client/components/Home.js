import React, { Component } from 'react';
import '../css/home.scss';
import { connect } from "react-redux";
import {addValue} from "../redux/actions/homeActions";
import axios from "axios";

class Home extends Component {

    componentDidMount() {
        axios.get('/api/users').then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        console.log(this.props);
        const { number } = this.props.homeReducer;
        return (
            <div className="home-parent">
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
