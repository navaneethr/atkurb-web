import React, { Component } from 'react';
import '../../css/customer/addresses.scss';
import {Button} from "../utils/Utils";


class Addresses extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="addresses-parent">
                <div className="address-container">
                    <div className="address-header">
                        <span className="address-heading">Update your Address</span>
                    </div>
                    <div className="address-form">
                        <div className="address-label-input">
                            <span className="address-label">Line 1</span>
                            <input className="text-input"/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">Line 2</span>
                            <input className="text-input"/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">City</span>
                            <input className="text-input"/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">State</span>
                            <input className="text-input"/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">Zipcode</span>
                            <input className="text-input"/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label"></span>
                            <Button label="Save"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Addresses;
