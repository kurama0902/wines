import React from "react";

import './searched-products.css';

export const SearchedProductsPopup = ({searchedProducts}) => {

    let isVisible = searchedProducts.length > 0 ? true : false;

    return (
        <div className="popup-bg">
            <div className={`searched-items-wrap ${isVisible ? 'visible' : 'invisible'}`}>
            {(isVisible) ? searchedProducts.map(product => {
                return (
                    <div key={product.id} className="searched-item">
                        <img className="search-product-item-img" src={product.imgURL} alt={product.description}/>
                        <div className="name-and-price-wrap">
                            <p>{product.description}</p>
                            <b>${product.cost}</b>
                        </div>
                    </div>
                )
            }) : <></>}
        </div>
        </div>
    )
}