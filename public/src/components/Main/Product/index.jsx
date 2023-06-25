import React from "react";
import { HeartSVG } from "../HeartSVG";
import { LockSVG } from "../LockSVG";

import './product.css'

export const Product = ({id, cl, cost, year, avaliableAmount, fixedPrice, quality, description, imgURL}) => {

    return (
        <a href="/" className="product-wrap">
            <div className="picture-and-description">
                <img className="wine-img" src={imgURL} alt="" />
                <div className="description-info">
                    <p className="description">{description}</p>
                    <p className="year">{year}</p>
                </div>
                <button className="heart-btn">
                    <HeartSVG />
                </button>
            </div>
            <div className="price-and-quality">
                <div className="price-and-avalability">
                    <p className="availability">{avaliableAmount}</p>
                    <p className="price">{cost} / {cl}</p>
                </div>
                <div className="quality-and-price-state">
                    <p className="quality">{quality}</p>
                    <p className="price-state"><LockSVG/>{fixedPrice}</p>
                </div>
            </div>
            <button className="buy-btn" id={id}>Buy</button>
        </a>
    )
}