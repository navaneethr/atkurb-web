import React, { Component } from 'react';
import '../../css/store/storeInventory.scss';
import {AlertError, AlertSuccess, AsyncInput, Button, CartItem, ItemContainer} from "../utils/Utils";
import * as _ from 'lodash';
import axios from "axios";
import {STORE_TOKEN_NAME} from "../../utils/constants";
import {getSuggestedProducts} from "../../redux/actions/storeInventoryActions";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

const Item = {
    name: "",
    description: "",
    category: "",
    unitPrice: "",
    unitQuantity: "",
    unit: "",
    imgUrl: "",
    stockSize: ""
};

class StoreInventory extends Component {

    constructor() {
        super();
        this.state = {
            showAddItems: true,
            item: Item,
            items: [],
            requiredFields: ["name", "category", "unitPrice", "unitQuantity", "unit", "stockSize"],
        };
    }

    componentDidMount() {
        const {getSuggestedProducts} = this.props;
        getSuggestedProducts();
    }

    changeItemState(accessor, value) {
        const {item} = this.state;
        let newItem = _.cloneDeep(item);
        newItem = {...newItem, [accessor]: value};
        this.setState({item: newItem});
    }

    addToList() {
        const {item, requiredFields, items} = this.state;
        const validationSuccess = requiredFields.every((accessor) => !_.isEmpty(item[accessor]) );
        console.log(validationSuccess);
        if(validationSuccess) {
            let newItems = _.cloneDeep(items);
            newItems = [...newItems, item];
            if(items.every((it) => it.name !== item.name)) {
                this.setState({items: newItems});
            } else {
                // Item Already in the List
            }
        } else {

        }
    }

    addItems() {
        const {item, requiredFields, items} = this.state;
        const AuthToken =  `Bearer ${localStorage.getItem(STORE_TOKEN_NAME)}`;

        const config = {
            headers: {
                Authorization: AuthToken
            }
        };
        axios.post('/api/inventory/add', {items}, config).then((res) => {
            AlertSuccess("Added all the items to the Inventory");
        }).catch((err) => {
            console.log(err);
            AlertError("Failed to add items to the Inventory");
        })
    }

    addFromSuggestedProducts(prod) {
        console.log(prod);
        const itemObj = {
            ...Item,
            category: prod.category,
            description: prod.description,
            imgUrl: prod.imgUrl,
            name: prod.name,
            productDateStoreId: prod._id
        };
        console.log(itemObj);
        this.setState({item: itemObj});
    }

    renderAddItems() {
        const {items} = this.state;
        const {getSuggestedProducts} = this.props;
        const {suggestedProducts} = this.props.storeInventoryReducer;
        const {imgUrl, name, category, unitPrice, unitQuantity, unit, stockSize, description} = this.state.item;
        return(
            <div className="store-items-container">
                <div className="search-products-container">
                    <div className="async-input-container">
                        <AsyncInput
                            className="text-input"
                            type="text"
                            onChange={(value) => getSuggestedProducts(value)}
                            placeholder="Search Products to Add .."
                        />
                    </div>
                    <div className="suggested-products-parent">
                        {
                            suggestedProducts.map((prod, i) => {
                                return (
                                    <div key={i} className="suggested-product">
                                        <div className="suggested-product-img">
                                            <img src={prod.imgUrl} />
                                        </div>
                                        <div className="suggested-info-and-btn">
                                            <div className="suggested-product-info">
                                                <span className="suggested-product-name">{prod.name}</span>
                                                <span className="suggested-product-desc">{prod.description}</span>
                                            </div>
                                            <div className="suggested-product-btn">
                                                <Button label="Select" onClick={() => {this.addFromSuggestedProducts(prod)}}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <ItemContainer
                        imgUrl={imgUrl}
                        name={name}
                        onNameChange={(value) => this.changeItemState("name", value)}
                        category={category}
                        onCategoryChange={({value}) => this.changeItemState("category", value)}
                        unitPrice={unitPrice}
                        onUnitPriceChange={(value) => this.changeItemState("unitPrice", value)}
                        quantity={unitQuantity}
                        onQuantityChange={(value) => this.changeItemState("unitQuantity", value)}
                        unit={unit}
                        onUnitChange={({value}) => this.changeItemState("unit", value)}
                        stock={stockSize}
                        onStockSizeChange={(value) => this.changeItemState("stockSize", value)}
                        description={description}
                        onDescriptionChange={(value) => this.changeItemState("description", value)}
                    />
                    <div className="add-items-button-container">
                        <Button label="Add to List" onClick={() => this.addToList()}/>
                    </div>
                </div>
                {
                    !_.isEmpty(items) &&
                    <div className="items-list-container">
                        <div className="list-item-header">
                            <span className="list-item-heading">Items Added</span>
                        </div>
                        <div className="list-items">
                            {
                                items.map((item, key) => {
                                    return (
                                        <div key={key} className="list-item-container">{item.name}</div>
                                    )
                                })
                            }
                        </div>
                        <div className="inventory-save-btn-container">
                            <Button label="Save to Inventory" onClick={() => this.addItems()}/>
                        </div>
                    </div>
                }
            </div>
        )
    }

    renderInventory() {
        return (
            <div className="store-inventory-container">
            </div>
        )
    }

    render() {
        const {showAddItems} = this.state;
        return (
            <div className="store-inventory-parent">
                <div className="store-inventory-header">
                    <span className="store-inventory-heading">{showAddItems ? "Add Items" : "Inventory"}</span>
                    {!showAddItems && <Button label="Add Items" onClick={() => this.setState({showAddItems: true})}/>}
                    {showAddItems && <Button label="My Inventory" onClick={() => this.setState({showAddItems: false})}/>}
                </div>
                {showAddItems && this.renderAddItems()}
                {!showAddItems && this.renderInventory()}
            </div>
        );
    }
}

export const mapStateToProps = ({storeInventoryReducer}) => {
    return { storeInventoryReducer }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getSuggestedProducts: (payload = "") => dispatch(getSuggestedProducts(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreInventory))
