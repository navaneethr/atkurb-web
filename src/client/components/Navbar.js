import React, { Component } from 'react';
import '../css/navbar.scss';
import { connect } from "react-redux";
import {addValue} from "../redux/actions/homeActions";
import {ROUTES, TOKEN_NAME} from "../utils/constants";
import {auth} from "../auth/auth";
import { Link, withRouter } from "react-router-dom";


class Navbar extends Component {

    constructor() {
        super();
    }

    logout = () => {
        auth.logOut(() => {
            localStorage.removeItem(TOKEN_NAME);
            this.props.history.push(ROUTES.LANDING);
        });
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <Link to={ROUTES.HOME}>Home</Link>
                <a onClick={this.logout}>Logout</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
