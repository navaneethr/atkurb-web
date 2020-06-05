import React, { Component } from 'react';
import '../../css/customer/profile.scss';
import {Button, Radio} from "../utils/Utils";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {saveUserPersonalDetails, updateUserPersonalDetails} from "../../redux/actions/navbarActions";
import moment from 'moment';
import {updateStoreDetails} from "../../redux/actions/storeNavbarActions";


class Profile extends Component {

    constructor() {
        super();
    }

    onInputChange(accessor, value) {
        const { updateUserPersonalDetails } = this.props;
        updateUserPersonalDetails({accessor, value})
    }

    render() {
        const {fullName, phone, email, dateOfBirth, gender} = this.props.navbarReducer.userDetails ? this.props.navbarReducer.userDetails : {fullName: "", phone: "", email: "", dateOfBirth: "", gender: ""};
        const { saveUserPersonalDetails } = this.props;

        return (
            <div className="account-parent">
                <div className="view-edit-account-container">
                    <div className="account-header">
                        <span className="account-heading">Account</span>
                    </div>
                    <div className="account-form">
                        <div className="account-label-input">
                            <span className="account-label">Full Name</span>
                            <input className="text-input" value={fullName} onChange={(e) => this.onInputChange("fullName", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Phone</span>
                            <input className="text-input" value={phone} onChange={(e) => this.onInputChange("phone", e.target.value)}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Email</span>
                            <input className="text-input" value={email} onChange={(e) => this.onInputChange("email", e.target.value)} disabled={true}/>
                        </div>
                        <div className="account-label-input">
                            <span className="account-label">Date of Birth</span>
                            <input className="text-input" type="date" value={moment(dateOfBirth).format('YYYY-MM-DD')} onChange={(e) => this.onInputChange("dateOfBirth", moment(e.target.value).format())}/>
                        </div>
                        <Radio
                            options={[{label: "Male", value: "male"}, {label: "Female", value: "female"}, {label: "Other", value: "other"}]}
                            value={gender}
                            onClick={(value) => this.onInputChange("gender", value)}
                            label="Gender"
                        />
                        <div className="account-label-input">
                            <span className="account-label"></span>
                            <Button label="Update" onClick={() => saveUserPersonalDetails({fullName, phone, dateOfBirth, gender})}/>
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
        updateUserPersonalDetails: (payload) => dispatch(updateUserPersonalDetails(payload)),
        saveUserPersonalDetails: (payload) => dispatch(saveUserPersonalDetails(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));
