import React, { Component } from 'react';
import '../../css/customer/addresses.scss';
import {Button} from "../utils/Utils";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {saveUserAddressDetails, updateUserAddressDetails} from "../../redux/actions/navbarActions";


class Addresses extends Component {

    constructor() {
        super();
    }

    onInputChange(accessor, value) {
        const { updateUserAddressDetails } = this.props;
        updateUserAddressDetails({accessor, value})
    }

    render() {
        const {line1, line2, city, state, country, zip} = this.props.navbarReducer.userDetails.address ? this.props.navbarReducer.userDetails.address : {line1: "", line2: "", city: "", state: "", country: "", zip: ""};
        const { saveUserAddressDetails } = this.props;

        return (
            <div className="addresses-parent">
                <div className="address-container">
                    <div className="address-header">
                        <span className="address-heading">Update your Address</span>
                    </div>
                    <div className="address-form">
                        <div className="address-label-input">
                            <span className="address-label">Line 1</span>
                            <input className="text-input" type="text" value={line1} onChange={(e) => this.onInputChange("line1", e.target.value)}/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">Line 2</span>
                            <input className="text-input" type="text" value={line2} onChange={(e) => this.onInputChange("line2", e.target.value)}/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">City</span>
                            <input className="text-input" type="text" value={city} onChange={(e) => this.onInputChange("city", e.target.value)}/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">State</span>
                            <input className="text-input" type="text" value={state} onChange={(e) => this.onInputChange("state", e.target.value)}/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">Country</span>
                            <input className="text-input" type="text" value={country} onChange={(e) => this.onInputChange("country", e.target.value)}/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label">Zipcode</span>
                            <input className="text-input" type="text" value={zip} onChange={(e) => this.onInputChange("zip", e.target.value)}/>
                        </div>
                        <div className="address-label-input">
                            <span className="address-label"></span>
                            <Button label="Save" onClick={() => saveUserAddressDetails({line1, line2, city, state, country, zip})}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = ({ navbarReducer }) => {
    return { navbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        updateUserAddressDetails: (payload) => dispatch(updateUserAddressDetails(payload)),
        saveUserAddressDetails: (payload) => dispatch(saveUserAddressDetails(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Addresses));
