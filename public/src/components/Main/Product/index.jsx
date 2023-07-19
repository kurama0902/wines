import React, { useState } from 'react';
import { HeartSVG } from '../../../shared/SVG/HeartSVG';
import { LockSVG } from '../../../shared/SVG/LockSVG';

import './product.css';

export const Product = ({
	id,
	cl,
	cost,
	year,
	avaliableAmount,
	fixedPrice,
	quality,
	description,
	imgURL,
	setAmount,
	isLikedSelected,
	isProductAddedToBusket,
	setBusketAmount
}) => {
	// let [buyBtnText, setBuyBtnText] = useState('Buy');

	const setLikedActive = () => setAmount(id);
	const setAddToBusketActive = () => { 
		setBusketAmount(id); 
	}


	// const addBasketProductIDToStorage = (e) => {
	// 	const addedToBusketIDs = JSON.parse(localStorage.getItem('addedToBusketIDs'));
	// 	if (!addedToBusketIDs.includes(id)) {
	// 		addedToBusketIDs.push(id);
	// 		localStorage.setItem('addedToBusketIDs', JSON.stringify(addedToBusketIDs));
	// 		setBuyBtnText('Added');
	// 		setBusketAmount(JSON.parse(localStorage.getItem('addedToBusketIDs')).length);
	// 	} else {
	// 		deleteBusketProductInStorage(e);
	// 	}
	// };

	// const deleteBusketProductInStorage = (e) => {
	// 	const addedToBusketIDs = JSON.parse(localStorage.getItem('addedToBusketIDs'));
	// 	if (addedToBusketIDs.includes(id)) {
	// 		addedToBusketIDs.splice(addedToBusketIDs.indexOf(id), 1);
	// 		localStorage.setItem('addedToBusketIDs', JSON.stringify(addedToBusketIDs));
	// 		setBuyBtnText('Buy');
	// 		setBusketAmount(JSON.parse(localStorage.getItem('addedToBusketIDs')).length);
	// 	}
	// };

	return (
		<div className="product-wrap">
			<div className="picture-and-description">
				<a href="/">
					<img className="wine-img" src={imgURL} alt="" />
				</a>
				<div className="description-info">
					<p className="description">{description}</p>
					<p className="year">{year}</p>
				</div>
				<button
					id={'l' + id}
					onClick={setLikedActive}
					className={`heart-btn ${isLikedSelected && 'isActive'}`}
				>
					<HeartSVG />
				</button>
			</div>
			<div className="price-and-quality">
				<div className="price-and-avalability">
					<p className="availability">
						<p>{avaliableAmount} bottles</p>
						<p className="grey-text">available</p>
					</p>
					<p className="price">
						<p className="cost">€{cost}</p>
						<p className="grey-text cl">/ {cl}cl</p>
					</p>
				</div>
				<div className="quality-and-price-state">
					<p className="quality">
						<p>{quality}</p>
						<p className="grey-text">condition</p>
					</p>
					<p className="price-state">
						<LockSVG />
						<p className="grey-text">{fixedPrice ? 'Fixed price' : 'Non fixed price'}</p>
					</p>
				</div>
			</div>
			<button onClick={setAddToBusketActive} className={"buy-btn"}>
				{isProductAddedToBusket ? 'Added' : 'Buy'}
			</button>
		</div>
	);
};


