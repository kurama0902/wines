import React from 'react';

import './busket-product.css';

// finish the basket logic

export const Product = ({cl, cost, description, imgURL, type, fixedPrice}) => {
	return (
		<div className="product-wrapper">
			<div className="product">
				<img className="product-img" src={imgURL} alt="" />
				<div className="name-and-price">
					<p className="product-name">{description}</p>
					<p className="wine-type">Type {type}</p>
					<div className="price-wrap">
						<p>{fixedPrice ? 'Fixed price' : 'Non fixed price'}</p>
						<p className="price">€{cost} / {cl}cl</p>
					</div>
					<div className="amount-wrap">
						<p>Amount</p>
						<select name="" id="">
							<option value="10">10</option>
						</select>
					</div>
					<div className="shipping-wrap">
						<p>Shipping</p>
						<p>{cost >= 180 ? 'Free' : '10$'}</p>
					</div>
					<div className="subtotal-wrap">
						<p>Subtotal</p>
						<p className="subtotal">€297,00</p>
					</div>
				</div>
			</div>
			<button className="delete-product">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18 6L6 18M6 6L18 18"
						stroke="#434960"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
};
