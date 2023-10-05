import React, { useEffect, useState } from 'react';
import { fetchDataArray } from '../../../../functions/fetchDataArray';

import './liked-modal.css';
export const LikedModal = ({ updateLikedWines, closeModal }) => {
	let [products, setProducts] = useState([]);
	

	const deleteLikedItem = (id) => (event) => {
		setProducts((currentItems) => {
			return currentItems.filter((item) => item.id !== id);
		});
		updateLikedWines(id);
	};

	useEffect(() => {
		fetchDataArray('LikedIDs', setProducts);
	}, []);

	return (
		<div className={'modal-wrap active'}>
			<div className="close-area" onClick={closeModal}></div>
			<div className="liked-modal">
				<div className="liked-info-wrap">
					{products.map((product) => {
						return (
							<div className="liked-info-item" key={product.id}>
								<img src={product.imgURL} alt={product.description} />
								<div className="liked-info-description-cost">
									<p>
										{product.description} | {product.cost}$
									</p>
								</div>
								<button onClick={deleteLikedItem(product.id)} className="delete-liked-item">
									X
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
