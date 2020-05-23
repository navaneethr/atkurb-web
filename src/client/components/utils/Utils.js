import React, { Component } from 'react';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify';
import '../../css/common/utils.scss';
import { IoMdCamera } from "react-icons/io";
import Dropdown from 'react-dropdown';
import '../../css/common/dropdown.scss';
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

const override = css`
  display: block;
  margin: 0 auto;
`;

export function Loader({loading, color, size}) {
    return (
        <PulseLoader
            css={override}
            size={size}
            color={color}
            loading={loading}
        />
    )
}

export function Button({loading, label, className, ...props}) {
    className = `button ${className}`;
    return (
        <button {...props} className={className} disabled={loading}>
            {loading ? <Loader loading={loading} color="#f3f3f3" size={10}/> : label}
        </button>
    )
}

export function AlertError(message) {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function AlertSuccess(message) {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function AlertInfo(message) {
    toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function OrderContainer({date, itemsCount, cost, onViewCLick}) {
    return (
        <div className="store-order-container">
            <div className="store-order-information-container">
                <div className="store-order-detail">
                    <span className="detail-heading">Order Placed</span>
                    <span className="detail-info">{date}</span>
                </div>
                <div className="store-order-detail">
                    <span className="detail-heading">Items</span>
                    <span className="detail-info">{itemsCount}</span>
                </div>
            </div>
            <div className="store-order-information-container">
                <div className="store-order-detail store-order-cost">
                    <span className="detail-heading">Cost</span>
                    <span className="detail-info">{cost}</span>
                </div>
                <div className="store-order-detail store-order-button">
                    <Button label="View" onClick={() => onViewCLick()}/>
                </div>
            </div>
        </div>
    )
}

export function Select(props) {
    return (
        <Dropdown {...props}/>
    )
}

export function ItemContainer({name, onNameChange, category, onCategoryChange, unitPrice, onUnitPriceChange, quantity, onQuantityChange, unit, onUnitChange, stockSize, onStockSizeChange, description, onDescriptionChange}) {
    const categoryOptions = [
        'Vegetables', 'Fruits', 'Pantry', 'Dairy', 'Meat', 'Drinks & Beverages', 'Pharmacy', 'Nuts', 'Bakery', 'Wine, Beer & Spirits', 'Care', 'Snacks', 'Cookies'
    ];
    const unitOptions = [
        'mg', 'gm', 'kg', 'lb', 'unit', 'ml', 'l', 'gallon'
    ];
    return (
        <div className="add-item-container">
            <div className="item-image-container">
                <div className="camera-click-container">
                    <IoMdCamera className="icon-class" onClick={() => {}}/>
                </div>
            </div>
            <div className="item-inputs-container">
                <input className="text-input" type="text" placeholder="Name" value={name} onChange={(e) => {onNameChange(e.target.value)}}/>
                <Select options={categoryOptions} onChange={(value) => {onCategoryChange(value)}} value={category} placeholder="Category" />
                <input className="text-input" type="number" placeholder="Unit Price" value={unitPrice} onChange={(e) => {onUnitPriceChange(e.target.value)}}/>
                <input className="text-input" type="number" placeholder="Item Quantity" value={quantity} onChange={(e) => {onQuantityChange(e.target.value)}}/>
                <Select options={unitOptions} onChange={(value) => {onUnitChange(value)}} value={unit} placeholder="Unit" />
                <input className="text-input" type="number" placeholder="Stock" value={stockSize} onChange={(e) => {onStockSizeChange(e.target.value)}}/>
            </div>
            <div className="description-text-area-parent">
                <input className="text-area-input" type="text" placeholder="Description" value={description} onChange={(e) => {onDescriptionChange(e.target.value)}}/>
            </div>
        </div>
    )
}

export function Product({name, unit, unitPrice, quantity, onRemove, onAdd, requiredQuantity}) {
    return (
        <div className="shop-product">
            <div className="product-image-container">
                <div className="add-remove-bar">
                    <div className="add-remove-sub-container">
                        <IoIosRemoveCircle className="icon-class remove-icon" onClick={() => {onRemove()}}/>
                    </div>
                    <div className="add-remove-sub-container">
                        {requiredQuantity}
                    </div>
                    <div className="add-remove-sub-container">
                        <IoIosAddCircle className="icon-class" onClick={() => {onAdd()}}/>
                    </div>
                </div>

            </div>
            <div className="product-info-container">
                <div className="product-info-sub-container">
                    <div className="product-name">
                        <span>{name}</span>
                    </div>
                    <div className="product-quantity-unit">
                        <span>{`${quantity} ${unit}`}</span>
                        <span>${parseFloat(unitPrice).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
