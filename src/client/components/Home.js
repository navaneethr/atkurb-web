import React, { Component } from 'react';
import '../css/home.scss';
import { connect } from "react-redux";
import {addValue} from "../redux/actions/homeActions";
import axios from "axios";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            fullName: "",
            email: "",
            password: "",
        }
    }

    register() {
        const {fullName, email, password} = this.state;
        const payload = {fullName, email, password}
        axios.post("/api/auth/register", payload).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        console.log(this.props);
        const { number } = this.props.homeReducer;
        const {fullName, email, password} = this.state;
        return (
            <div className="home-parent">
                <span>RDX Boilerplate</span>
                <button onClick={() => this.props.addValue(1)}>Redux Thunk - Add</button>
                <span>{number}</span>
                <div>
                    <input type="text" onChange={(e) => this.setState({fullName: e.target.value})} value={fullName}/>
                    <input type="text" onChange={(e) => this.setState({email: e.target.value})} value={email}/>
                    <input type="password" onChange={(e) => this.setState({password: e.target.value})} value={password}/>
                    <button onClick={() => this.register()}>Register</button>
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
