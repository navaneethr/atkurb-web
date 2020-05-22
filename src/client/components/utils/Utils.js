import React, { Component } from 'react';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify';
import '../../css/common/utils.scss';

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
