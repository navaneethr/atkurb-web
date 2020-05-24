import React, { Component } from 'react';
import '../../css/customer/home.scss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addValue, getStores } from "../../redux/actions/homeActions";
import { ROUTES } from "../../utils/constants";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            searchStore: "",
            storesNearby: [],
            favStores: []
        }
    }

    componentDidMount() {
        const { getStores } = this.props;
        getStores();
    }

    onStoreClick(id) {
        this.props.history.push(`${ROUTES.SHOP}/${id}`)
    }

    render() {
        console.log(this.props.homeReducer);
        const { storesNearby, favStores } = this.props.homeReducer;
        const {searchStore} = this.state;
        return (
            <div className="home-parent">
                <input
                    className="text-input navbar-fixed-input"
                    type="text"
                    onChange={(e) => this.setState({searchStore: e.target.value})}
                    placeholder="Search for Stores"
                    value={searchStore}
                />
                <div className="stores-parent">
                    {
                        !_.isEmpty(favStores) &&
                            <div className="stores-section">
                            <div className="heading-container">
                                <span className="heading">Stores you frequently buy from</span>
                            </div>
                            <div className="stores-container">
                                {
                                    favStores.map((store) => {
                                        return (
                                            <div className="store-item">
                                                <div className="store-brand-container">
                                                    Store 1
                                                </div>
                                                <div className="store-info-container">
                                                    Dublin
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    <div className="stores-section">
                        <div className="heading-container">
                            <span className="heading">Stores Nearby</span>
                        </div>
                        <div className="stores-container">
                            {
                                storesNearby.map(({storeName, _id}, key) => {
                                    return (
                                        <div className="store-item" key={key} onClick={() => this.onStoreClick(_id)}>
                                            <div className="store-brand-container">
                                            </div>
                                            <div className="store-info-container">
                                                {storeName && (storeName.length > 15 ? storeName.substring(0, 15) + "..." : storeName)}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
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
        addValue: (payload) => dispatch(addValue(payload)),
        getStores: () => dispatch(getStores())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
