import React, { Component } from 'react';
import '../../css/store/storeProfile.scss';
import moment from "moment/moment";
import {saveStoreDetails, updateStoreDetails, updateStoreAddressDetails} from "../../redux/actions/storeNavbarActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button} from "../utils/Utils";


class StoreProfile extends Component {

    constructor() {
        super();
    }

    onInputChange(accessor, value) {
        const { updateStoreDetails } = this.props;
        updateStoreDetails({accessor, value})
    }

    onAddressChange(accessor, value) {
        const { updateStoreAddressDetails } = this.props;
        updateStoreAddressDetails({accessor, value})
    }

    render() {
        const { saveStoreDetails } = this.props;
        const {storeName, phone, email} = this.props.storeNavbarReducer.storeDetails ? this.props.storeNavbarReducer.storeDetails : {storeName: "", phone: "", email: ""};
        const {line1, line2, city, state, country, zip} = this.props.storeNavbarReducer.storeDetails ? this.props.storeNavbarReducer.storeDetails.address : {line1: "", line2: "", city: "", state: "", country: "", zip: ""};

        return (
            <div className="store-profile-parent">
                <div className="view-edit-account-container">
                    <div className="account-header">
                        <span className="account-heading">Store Details</span>
                    </div>
                    <div className="account-form">
                        <div className="account-label-input">
                            <span className="account-label">Store Name</span>
                            <input className="text-input" type="text" value={storeName} onChange={(e) => this.onInputChange("storeName", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Phone</span>
                            <input className="text-input" type="text" value={phone} onChange={(e) => this.onInputChange("phone", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Email</span>
                            <input className="text-input" type="text" value={email} onChange={(e) => this.onInputChange("email", e.target.value)} disabled={true}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Line 1</span>
                            <input className="text-input" type="text" value={line1} onChange={(e) => this.onAddressChange("line1", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Line 2</span>
                            <input className="text-input" type="text" value={line2} onChange={(e) => this.onAddressChange("line2", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">City</span>
                            <input className="text-input" type="text" value={city} onChange={(e) => this.onAddressChange("city", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">State</span>
                            <input className="text-input" type="text" value={state} onChange={(e) => this.onAddressChange("state", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Country</span>
                            <input className="text-input" type="text" value={country} onChange={(e) => this.onAddressChange("country", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Zipcode</span>
                            <input className="text-input" type="text" value={zip} onChange={(e) => this.onAddressChange("zip", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label"></span>
                            <Button label="Update" onClick={() => saveStoreDetails({storeName, phone, address: this.props.storeNavbarReducer.storeDetails.address})}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = ({ storeNavbarReducer }) => {
    return { storeNavbarReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        updateStoreDetails: (payload) => dispatch(updateStoreDetails(payload)),
        updateStoreAddressDetails: (payload) => dispatch(updateStoreAddressDetails(payload)),
        saveStoreDetails: (payload) => dispatch(saveStoreDetails(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreProfile));
