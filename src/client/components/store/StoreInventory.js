import React, { Component } from 'react';
import '../../css/store/storeInventory.scss';
import {AlertError, AlertInfo, AlertSuccess, AsyncInput, Button, CartItem, ItemContainer} from "../utils/Utils";
import * as _ from 'lodash';
import axios from "axios";
import {STORE_TOKEN_NAME} from "../../utils/constants";
import {getSuggestedProducts, addItemsToList} from "../../redux/actions/storeInventoryActions";
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
            item: _.cloneDeep(Item),
            items: [],
            requiredFields: ["name", "category", "unitPrice", "unitQuantity", "unit", "stockSize"],
            showMenu: false
        };
        this.setMenuRef = this.setMenuRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount() {
        const {getSuggestedProducts} = this.props;
        getSuggestedProducts();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    setMenuRef(node) {
        this.menuRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.menuRef && !this.menuRef.contains(event.target)) {
            this.setState({showMenu: false})
        }
    }

    changeItemState(accessor, value) {
        const {item} = this.state;
        let newItem = _.cloneDeep(item);
        newItem = {...newItem, [accessor]: value};
        this.setState({item: newItem});
    }

    addToList() {
        const {item, requiredFields} = this.state;
        const {itemsToAdd} = this.props.storeInventoryReducer;
        const {addItemsToList} = this.props;
        const validationSuccess = requiredFields.every((accessor) => !_.isEmpty(item[accessor]) );
        const {imgUrl, name, category, unitPrice, unitQuantity, unit, stockSize, description} = this.state.item;
        console.log(validationSuccess);
        if(validationSuccess) {
            let newItems = _.cloneDeep(itemsToAdd);
            newItems = [...newItems, item];
            if(itemsToAdd.every((it) => it.name !== item.name)) {
                addItemsToList(newItems);
                this.setState({item: Item});

            } else {
                // Item Already in the List
                AlertInfo("Item already in the List")
            }
        } else {
            AlertError("Make sure all the fields are filled")
        }
    }

    addFromSuggestedProducts(prod) {
        console.log(prod);
        const itemObj = {
            ...Item,
            category: prod.category,
            description: prod.description,
            imgUrl: prod.imgUrl,
            name: prod.name,
            productDateStoreId: prod._id,
        };
        console.log(itemObj);
        this.setState({item: itemObj, showMenu: false});
    }

    renderAddItems() {
        const {showMenu} = this.state;
        const {getSuggestedProducts} = this.props;
        const {suggestedProducts} = this.props.storeInventoryReducer;
        return(
            <div className="store-items-container">
                <div className="add-item-parent">
                    <div className="search-products-container">
                        <div className="async-input-container">
                            <AsyncInput
                                className="text-input"
                                type="text"
                                onChange={(value) => getSuggestedProducts(value)}
                                placeholder="Search Products to Add .."
                                onFocus={() => {this.setState({showMenu: true})}}
                            />
                        </div>
                        {
                            showMenu &&
                            <div className="suggested-products-parent" ref={this.setMenuRef}>
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
                        }
                    </div>
                    <ItemContainer
                        imgUrl={this.state.item.imgUrl}
                        name={this.state.item.name}
                        onNameChange={(value) => this.changeItemState("name", value)}
                        category={this.state.item.category}
                        onCategoryChange={({value}) => this.changeItemState("category", value)}
                        unitPrice={this.state.item.unitPrice}
                        onUnitPriceChange={(value) => this.changeItemState("unitPrice", value)}
                        unitQuantity={this.state.item.unitQuantity}
                        onQuantityChange={(value) => this.changeItemState("unitQuantity", value)}
                        unit={this.state.item.unit}
                        onUnitChange={({value}) => this.changeItemState("unit", value)}
                        stockSize={this.state.item.stockSize}
                        onStockSizeChange={(value) => this.changeItemState("stockSize", value)}
                        description={this.state.item.description}
                        onDescriptionChange={(value) => this.changeItemState("description", value)}
                    />
                    <div className="add-items-button-container">
                        <Button label="Add to List" onClick={() => this.addToList()}/>
                    </div>
                </div>
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
        console.log("STATE", this.state);
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
        getSuggestedProducts: (payload = "") => dispatch(getSuggestedProducts(payload)),
        addItemsToList: (payload = "") => dispatch(addItemsToList(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreInventory))
