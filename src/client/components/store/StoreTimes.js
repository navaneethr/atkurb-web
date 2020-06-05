import React, { Component } from 'react';
import '../../css/store/storeTimes.scss';
import moment from "moment/moment";
import {saveStoreDetails, updateStoreDetails, updateStoreAddressDetails, updateStoreTimes} from "../../redux/actions/storeNavbarActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Radio} from "../utils/Utils";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';


class StoreTimes extends Component {

    constructor() {
        super();
    }

    onTimeChange(accessor, value) {
        const { saveStoreDetails, updateStoreTimes } = this.props;
        console.log(value);
        updateStoreTimes({accessor, value});
    }

    render() {
        const { updateStoreDetails, saveStoreDetails } = this.props;
        const { storeDetails } = this.props.storeNavbarReducer;
        const {openTime, closeTime} = _.get(storeDetails, 'storeTimes', {openTime: null, closeTime: null});
        const  storeOpen = _.get(storeDetails, 'storeOpen', null);
        const  pickUpInterval = _.get(storeDetails, 'pickUpInterval', null);
        const  fulfillmentCapacity = _.get(storeDetails, 'fulfillmentCapacity', null);

        return (
            <div className="store-times-parent">
                <div className="store-open-container">
                    <Radio
                        options={[{label: "Open", value: true}, {label: "Close", value: false}]}
                        value={storeOpen}
                        onClick={(value) => {updateStoreDetails({accessor: 'storeOpen', value})}}
                        label="Store Open Status"
                    />
                </div>
                <Button label="Update Store Status" onClick={() => saveStoreDetails({storeOpen})}/>
                <div className="times-selection">
                    <div className="time-picker-with-label">
                        <span className="label">Open Time</span>
                        <TimePicker
                            showSecond={false}
                            hourStep={1}
                            minuteStep={15}
                            use12Hours={true}
                            popupClassName="time-popup"
                            value={openTime ? moment(openTime) : null}
                            onChange={(value) => {this.onTimeChange('openTime', value)}}
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
                            value={closeTime ? moment(closeTime) : null}
                            onChange={(value) => {this.onTimeChange('closeTime', value)}}
                        />
                    </div>
                    <Button label="Save Open/Close Times" onClick={() => saveStoreDetails({storeTimes: {openTime, closeTime} })}/>
                </div>
                <div className="pickup-interval-container">
                    <Radio
                        options={[{label: "1", value: 1}, {label: "2", value: 2}, {label: "3", value: 3}, {label: "4", value: 4}]}
                        value={pickUpInterval}
                        onClick={(value) => {updateStoreDetails({accessor: 'pickUpInterval', value})}}
                        label="Pickup Interval in Hours"
                    />
                </div>
                <div className="pickup-interval-container">
                    <Radio
                        options={[{label: "5", value: 5}, {label: "10", value: 10}, {label: "15", value: 15}, {label: "20", value: 20}]}
                        value={fulfillmentCapacity}
                        onClick={(value) => {updateStoreDetails({accessor: 'fulfillmentCapacity', value})}}
                        label="Order fulfilment for each time slot"
                    />
                </div>
                <Button label="Save Pickup Interval & Order Fulfilment" onClick={() => saveStoreDetails({pickUpInterval, fulfillmentCapacity})}/>
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
        saveStoreDetails: (payload) => dispatch(saveStoreDetails(payload)),
        updateStoreTimes: (payload) => dispatch(updateStoreTimes(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreTimes));
