import React, { Component } from 'react';
import '../../css/store/storeInventory.scss';
import {AlertError, AlertSuccess, Button, ItemContainer} from "../utils/Utils";
import * as _ from 'lodash';
import axios from "axios";
import {STORE_TOKEN_NAME} from "../../utils/constants";

const Item = {
    name: "",
    description: "",
    category: "",
    unitPrice: "",
    unitQuantity: "",
    unit: "",
    photo: "",
    stockSize: ""
};

class StoreInventory extends Component {

    constructor() {
        super();
        this.state = {
            showAddItems: false,
            item: Item,
            items: [],
            requiredFields: ["name", "category", "unitPrice", "unitQuantity", "unit", "stockSize"]
        };
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

    renderAddItems() {
        const {items} = this.state;
        const {name, category, unitPrice, unitQuantity, unit, stockSize, description} = this.state.item;
        return(
            <div className="store-items-container">
                <div>
                    <ItemContainer
                        name={name}
                        onNameChange={(value) => this.changeItemState("name", value)}
                        category={category}
                        onCategoryChange={(value) => this.changeItemState("category", value)}
                        unitPrice={unitPrice}
                        onUnitPriceChange={(value) => this.changeItemState("unitPrice", value)}
                        quantity={unitQuantity}
                        onQuantityChange={(value) => this.changeItemState("unitQuantity", value)}
                        unit={unit}
                        onUnitChange={(value) => this.changeItemState("unit", value)}
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
                    {showAddItems && <Button label="Close" onClick={() => this.setState({showAddItems: false})}/>}
                </div>
                {showAddItems && this.renderAddItems()}
                {!showAddItems && this.renderInventory()}
            </div>
        );
    }
}

export default StoreInventory;
