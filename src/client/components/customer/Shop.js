import React, { Component } from 'react';
import '../../css/customer/shop.scss';
import axios from 'axios';
import {CUSTOMER_TOKEN_NAME} from "../../utils/constants";
import {AlertError} from "../utils/Utils";


class Shop extends Component {

    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        const AuthToken =  `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_NAME)}`;
        const { storeId } = this.props.match.params;
        console.log(this.props);
        const config = {
            headers: {
                Authorization: AuthToken,
            }
        };

        axios.get(`/api/store/products?storeId=${storeId}`, config).then((res) => {
            this.setState({products: res.data})
        }).catch((err) => {
            AlertError("Failed to load products, please refresh")
        })
    }

    render() {
        const {products} = this.state;
        return (
            <div className="shop-parent">
                <div className="shop-container">
                    <div className="shop-header">
                        <span className="shop-heading">Anu Kirana Store</span>
                    </div>
                    <div className="products-container">
                        {
                            products.map((prod, key) => {
                                return (
                                    <div className="shop-product" key={key}>
                                        <div className="product-image-container">

                                        </div>
                                        <div className="product-info-container">
                                            {prod.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;
