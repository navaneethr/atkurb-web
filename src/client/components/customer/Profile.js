import React, { Component } from 'react';
import '../../css/customer/profile.scss';
import {Button} from "../utils/Utils";


class Profile extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="account-parent">
                <div className="view-edit-account-container">
                    <div className="account-header">
                        <span className="account-heading">Account</span>
                    </div>
                    <div className="account-form">
                        <div className="account-label-input">
                            <span className="account-label">Full Name</span>
                            <input className="text-input"/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Phone</span>
                            <input className="text-input"/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Email</span>
                            <input className="text-input"/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Password</span>
                            <input className="text-input"/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Date of Birth</span>
                            <input className="text-input"/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Sex</span>
                            <input className="text-input"/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label"></span>
                            <Button label="Update"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
