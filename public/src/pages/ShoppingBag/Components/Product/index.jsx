import React, { useState } from 'react';

import './busket-product.css';

export const Product = ({
	id,
	avaliableAmount,
	cl,
	cost,
	description,
	imgURL,
	type,
	fixedPrice,
	deleteBusketItem,
	total,
	setTotal,
	productsQuant,
	setProductsQuant,
	order,
}) => {
	const shippingCost = cost >= 180 ? 0 : 10;
	let [subtotal, setSubtotal] = useState(cost + shippingCost);
	let [quantity, setQuantity] = useState(1);
	const [isDeliting, setIsDeliting] = useState(false);

	function changeSubtotal(e) {
		if (e.target.value <= avaliableAmount) {
			if (e.target.value > quantity) {
				setSubtotal(cost * e.target.value + shippingCost);
				setTotal((subtotal - total + -(cost * e.target.value) + -shippingCost) * -1);
				setQuantity(e.target.value);
				let newQuantOrder = [...productsQuant];
				newQuantOrder[order] = +e.target.value;
				setProductsQuant(newQuantOrder);
			} else {
				setSubtotal(cost * e.target.value + shippingCost);
				setTotal(total - cost * (quantity - e.target.value));
				setQuantity(e.target.value);
				let newQuantOrder = [...productsQuant];
				newQuantOrder[order] = +e.target.value;
				setProductsQuant(newQuantOrder);
			}
		}
	}

	const onTransitionEnd = () =>
		deleteBusketItem(id, subtotal, productsQuant, setProductsQuant, order);

	const deleteItemAction = () => {
		setIsDeliting(true);
	};

	return (
		<div
			className={`product-wrapper ${isDeliting ? 'delete' : ''}`}
			onTransitionEnd={onTransitionEnd}
		>
			<div className="product">
				<img className="product-img" src={imgURL} alt="" />
				<div className="name-and-price">
					<p className="product-name">{description}</p>
					<p className="wine-type">Type {type}</p>
					<div className="price-wrap">
						<p>{fixedPrice ? 'Fixed price' : 'Non fixed price'}</p>
						<p className="price">
							${cost} / {cl}cl
						</p>
					</div>
					<div className="amount-wrap">
						<p>Amount</p>
						<div className="select-wrap">
							<input
								type="number"
								className="select"
								onChange={(e) => changeSubtotal(e)}
								defaultValue={1}
								min={1}
								max={avaliableAmount}
							/>
						</div>
					</div>
					<div className="shipping-wrap">
						<p>Shipping</p>
						<p>{cost >= 180 ? 'Free' : '10$'}</p>
					</div>
					<div className="subtotal-wrap">
						<p>Subtotal</p>
						<p className="subtotal">${subtotal}</p>
					</div>
				</div>
			</div>
			<button className="delete-product" onClick={deleteItemAction}>
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
