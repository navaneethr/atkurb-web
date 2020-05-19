import React, { Component } from 'react';
import '../css/home.scss';
import { connect } from "react-redux";
import {addValue} from "../redux/actions/homeActions";

class Home extends Component {
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
