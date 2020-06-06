import React, { Component, useState } from 'react';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify';
import '../../css/common/utils.scss';
import { IoMdCamera } from "react-icons/io";
import Dropdown from 'react-dropdown';
import '../../css/common/dropdown.scss';
import { IoMdTrash, IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import {categoryOptions} from "../../utils/constants";
import LazyLoad from 'react-lazyload';

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

export function Button({loading, disabled, label, className, ...props}) {
    className = `button ${className}`;
    return (
        <button {...props} className={className} disabled={loading || disabled}>
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

export function OrderContainer({date, itemsCount, cost, onViewClick, orderStatus, userFullName, userEmail, userPhone}) {
    const status = !_.isEmpty(orderStatus) && Object.keys(orderStatus).filter((acc) => orderStatus[acc] === true)[0];
    console.log(cost);
    return (
        <div className="store-order-container">
            <Button label="View" onClick={onViewClick}/>
            <div className="store-order-information-container">
                {
                    !_.isEmpty(date) &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Order Placed</span>
                        <span className="detail-info">{date}</span>
                    </div>
                }
                {
                    itemsCount > 0 &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Items</span>
                        <span className="detail-info">{itemsCount}</span>
                    </div>
                }
                {
                    !_.isEmpty(status) &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Order Status</span>
                        <span className="detail-info">{status}</span>
                    </div>
                }
                {
                    !_.isEmpty(userFullName) &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Placed By</span>
                        <span className="detail-info">{userFullName && userFullName}</span>
                    </div>
                }
                {
                    !_.isEmpty(userEmail) &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Customer Email</span>
                        <span className="detail-info">{userEmail && userEmail}</span>
                    </div>
                }
                {
                    !_.isEmpty(userPhone) &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Customer Phone</span>
                        <span className="detail-info">{userPhone && userPhone}</span>
                    </div>
                }
                {
                    cost.itemsCost > 0 &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Cost</span>
                        <span className="detail-info">${cost.itemsCost.toFixed(2)}</span>
                    </div>
                }
                {
                    cost.serviceFee > 0 &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Service Fee</span>
                        <span className="detail-info">${cost.serviceFee.toFixed(2)}</span>
                    </div>
                }
                {
                    cost.taxes > 0 &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Tax</span>
                        <span className="detail-info">${cost.taxes.toFixed(2)}</span>

                    </div>
                }
                {
                    cost.shopperTip > 0 &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Shopper Tip</span>
                        <span className="detail-info">${cost.shopperTip.toFixed(2)}</span>
                    </div>
                }
                {
                    !_.isNaN(cost.shopperTip + cost.taxes + cost.serviceFee + cost.itemsCost) &&
                    <div className="store-order-detail">
                        <span className="detail-heading">Total</span>
                        <span className="detail-info">${(cost.shopperTip + cost.taxes + cost.serviceFee + cost.itemsCost).toFixed(2)}</span>
                    </div>
                }
            </div>
        </div>
    )
}

export function Select(props) {
    return (
        <Dropdown {...props}/>
    )
}



export function ItemContainer({imgUrl, name, onNameChange, category, onCategoryChange, unitPrice, onUnitPriceChange, unitQuantity, onQuantityChange, unit, onUnitChange, stockSize, onStockSizeChange, description, onDescriptionChange}) {
    const unitOptions = [
        'mg', 'gm', 'kg', 'lb', 'unit', 'ml', 'l', 'gallon', 'oz', 'dozen'
    ];
    return (
        <div className="add-item-container">
            <div className="item-image-container">
                <img src={imgUrl} />
                <div className="camera-click-container">
                    <IoMdCamera className="icon-class" onClick={() => {}}/>
                </div>
            </div>
            <div className="item-inputs-container">
                <input className="text-input" type="text" placeholder="Name" value={name} onChange={(e) => {onNameChange(e.target.value)}}/>
                <Select options={categoryOptions} onChange={(value) => {onCategoryChange(value)}} value={category} placeholder="Category" />
                <input className="text-input" type="number" placeholder="Unit Price" value={unitPrice} onChange={(e) => {onUnitPriceChange(e.target.value)}}/>
                <input className="text-input" type="number" placeholder="Unit Quantity" value={unitQuantity} onChange={(e) => {onQuantityChange(e.target.value)}}/>
                <Select options={unitOptions} onChange={(value) => {onUnitChange(value)}} value={unit} placeholder="Unit" />
                <input className="text-input" type="number" placeholder="Stock" value={stockSize} onChange={(e) => {onStockSizeChange(e.target.value)}}/>
            </div>
            <div className="description-text-area-parent">
                <input className="text-area-input" type="text" placeholder="Description" value={description} onChange={(e) => {onDescriptionChange(e.target.value)}}/>
            </div>
        </div>
    )
}

export function Product({name, unit, unitPrice, quantity, onRemove, onAdd, requiredQuantity, imgUrl}) {
    return (
        <div className="shop-product">
            <div className="product-image-container">
                <LazyLoad throttle={200} height={300}>
                    <img src={imgUrl}/>
                </LazyLoad>
                <div className="add-remove-bar">
                    {
                        parseInt(requiredQuantity) > 0 &&
                            <div className="add-remove-sub-container">
                                {
                                    ((parseInt(requiredQuantity) === 1) ?
                                        <IoMdTrash className="icon-class remove-icon" onClick={() => {onRemove()}}/> :
                                        <IoIosRemoveCircle className="icon-class remove-icon" onClick={() => {onRemove()}}/>)
                                }
                            </div>
                    }

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

export function CartItem({prod, removeItem, addItem}) {
    return (
        <div className="cart-card-container">
            <div className="cart-image-info-container">
                <div className="cart-item-image">
                    <img src={prod.imgUrl}/>
                </div>
                <div className="cart-item-info-container">
                    <span className="cart-item-info-span">{prod.name}</span>
                    <span className="cart-item-info-span">{prod.quantity} X {prod.unitQuantity} {prod.unit}</span>
                    <span className="cart-item-info-span">${(parseFloat(prod.quantity) * parseFloat(prod.unitPrice)).toFixed(2)}</span>
                </div>
            </div>
            <div className="cart-add-remove-parent">
                <div className="cart-add-remove-container">
                    {
                        parseInt(prod.quantity) > 0 &&
                            <div className="add-remove-sub-container">
                                {
                                    ((parseInt(prod.quantity) === 1) ?
                                        <IoMdTrash className="icon-class remove-icon" onClick={() => {removeItem(prod)}}/> :
                                        <IoIosRemoveCircle className="icon-class remove-icon" onClick={() => {removeItem(prod)}}/>)
                                }
                            </div>
                    }
                    <div className="add-remove-sub-container">
                        {prod.quantity}
                    </div>
                    <div className="add-remove-sub-container">
                        <IoIosAddCircle className="icon-class" onClick={() => {
                            addItem(prod)
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AsyncInput = ({onChange, ...props}) => {
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, 500);

        return () => clearTimeout(timeout)
    }, [value]);

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...props}
        />
    )
}


export const Radio = ({options, onClick, value, label}) => {
    return (
        <div className="radio-container">
            <span className="radio-label">
                {label}
            </span>
            <div className="radio-parent">
                {
                    options.map((option, key) => {
                        const className = (option.value === value) ? "radio-child active" : "radio-child";
                        return (
                            <div key={key} className={className} onClick={() => onClick(option.value)}>
                                {option.label}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
