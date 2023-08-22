import React, { useEffect, useState } from 'react';
import { useRequestProductsInfo } from '../../../../shared/hooks/requestProductsInfo';
import { useLikedWines } from '../../../../shared/hooks/likedWines';
import { fetchLikedDataArray } from '../../../../functions/fetchLikedDataArray';

import './liked-modal.css';


export const LikedModal = ({ isActive, closeModal }) => {

	let [products, setProducts] = useState([]);
	let [likedProductsIDs, handleUpdateLikeIds] = useLikedWines()

	const deleteLikedItem = (id) => {
		console.log(id);
		handleUpdateLikeIds(id)
	}

	useEffect(() => {
		fetchLikedDataArray(setProducts);
	}, [isActive, likedProductsIDs])

	return (
		<div className={`modal-wrap ${isActive && 'active'}`}>
			<div className="close-area" onClick={closeModal}></div>
			<div className="liked-modal">
				<div className="liked-info-wrap">
					{products.map(product => {
						return (
							<div className="liked-info-item" key={product.id}>
								<img src={product.imgURL} alt={product.description} />
								<div className="liked-info-description-cost">
									<p>{product.description} | {product.cost}$</p>
								</div>
								<button onClick={() => deleteLikedItem(product.id)} className="delete-liked-item">X</button>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);

};



