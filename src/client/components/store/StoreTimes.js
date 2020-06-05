import React, { Component } from 'react';
import '../../css/store/storeTimes.scss';
import moment from "moment/moment";
import {saveStoreDetails, updateStoreDetails, updateStoreAddressDetails} from "../../redux/actions/storeNavbarActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button} from "../utils/Utils";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';


class StoreTimes extends Component {

    constructor() {
        super();
    }

    render() {
        const { saveStoreDetails } = this.props;
        const { storeTimes } = this.props.storeNavbarReducer;
        const weekArray = Object.keys(storeTimes);

        return (
            <div className="store-times-parent">
                <div className="times-selection">
                    <div className="times-selection-child">
                    {
                        weekArray.map((day, i) => (
                            <div className="store-times" key={i}>
                                <div className="store-day">
                                    <span className="day">{day.substring(0,3)}</span>
                                </div>
                                <div className="time-picker-with-label">
                                    <span className="label">Open Time</span>
                                    <TimePicker
                                        showSecond={false}
                                        hourStep={1}
                                        minuteStep={15}
                                        use12Hours={true}
                                        popupClassName="time-popup"
                                    />
                                </div>
                                <div className="time-picker-with-label">
                                    <span className="label">Close Time</span>
                                    <TimePicker
                                        showSecond={false}
                                        hourStep={1}
                                        minuteStep={15}
                                        use12Hours={true}
                                        popupClassName="time-popup"
                                    />
                                </div>
                            </div>
                        ))
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreTimes));
