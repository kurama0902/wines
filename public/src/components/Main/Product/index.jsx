import React, { useState } from 'react';
import { HeartSVG } from '../../../shared/SVG/HeartSVG';
import { LockSVG } from '../../../shared/SVG/LockSVG';
import { Counter } from '../../../shared/components/Counter';

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
}) => {
	let [buyBtnText, setBuyBtnText] = useState('Buy');
	let [likedBtnColor, setLikedBtnColor] = useState('transparent');

	if (!JSON.parse(localStorage.getItem('LikedIDs'))) {
		localStorage.setItem('LikedIDs', JSON.stringify([]));
	}

	if (!JSON.parse(localStorage.getItem('addedToBusketIDs'))) {
		localStorage.setItem('addedToBusketIDs', JSON.stringify([]));
	}

	if(JSON.parse(localStorage.getItem('LikedIDs')).length > 0) {
		addCounter();
	}

	function addCounter() {
		const likedItemsBtn = document.querySelector('.liked-items-btn');
		if (!likedItemsBtn.querySelector('.counter')) {
			const counter = document.createElement('div');
			counter.textContent = Counter(JSON.parse(localStorage.getItem('LikedIDs')).length).props.children;
			counter.className = 'counter';
			likedItemsBtn.append(counter);
		} else {
			likedItemsBtn.querySelector('.counter').textContent = JSON.parse(localStorage.getItem('LikedIDs')).length;
		}
	}

	const changeLikedBtnColor = (e) => {
		const compStyles = getComputedStyle(e.target);
		if (compStyles.getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
			setLikedBtnColor('transparent');
		} else {
			setLikedBtnColor('white');
		}
	};

	const addLikedProductIDToStorage = (e) => {
		const likedProductsIDs = JSON.parse(localStorage.getItem('LikedIDs'));
		const likedItemsBtn = document.querySelector('.liked-items-btn');
		if (!likedProductsIDs.includes(id)) {
			likedProductsIDs.push(id);
			localStorage.setItem('LikedIDs', JSON.stringify(likedProductsIDs));
			changeLikedBtnColor(e);
			addCounter();
		} else {
			deleteLikedProductInStorage(e);
			if(likedItemsBtn.querySelector('.counter').textContent === '1') {
				likedItemsBtn.querySelector('.counter').remove();
			} else {
				likedItemsBtn.querySelector('.counter').textContent = JSON.parse(localStorage.getItem('LikedIDs')).length;			}
			changeLikedBtnColor(e);
		}
	};

	const deleteLikedProductInStorage = (e) => {
		const likedProductsIDs = JSON.parse(localStorage.getItem('LikedIDs'));
		if (likedProductsIDs.includes(id)) {
			likedProductsIDs.splice(likedProductsIDs.indexOf(id), 1);
			localStorage.setItem('LikedIDs', JSON.stringify(likedProductsIDs));
		}
	};

	const addBasketProductIDToStorage = (e) => {
		const addedToBusketIDs = JSON.parse(localStorage.getItem('addedToBusketIDs'));
		if (!addedToBusketIDs.includes(id)) {
			addedToBusketIDs.push(id);
			localStorage.setItem('addedToBusketIDs', JSON.stringify(addedToBusketIDs));
			setBuyBtnText('Added');
		} else {
			deleteBusketProductInStorage(e);
		}
	};

	const deleteBusketProductInStorage = (e) => {
		const addedToBusketIDs = JSON.parse(localStorage.getItem('addedToBusketIDs'));
		if (addedToBusketIDs.includes(id)) {
			addedToBusketIDs.splice(addedToBusketIDs.indexOf(id), 1);
			localStorage.setItem('addedToBusketIDs', JSON.stringify(addedToBusketIDs));
			setBuyBtnText('Buy');
		}
	};

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
				<button id={'l' + id}
					style={{ backgroundColor: likedBtnColor }}
					onClick={addLikedProductIDToStorage}
					className="heart-btn"
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
			<button onClick={addBasketProductIDToStorage} className="buy-btn" id={id}>
				{buyBtnText}
			</button>
		</div>
	);
};
