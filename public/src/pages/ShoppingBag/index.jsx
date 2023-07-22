import React from 'react';

import { Product } from './Components/Product';

import { useRequestProductsInfo } from '../../shared/hooks/requestProductsInfo';

import './shopping-bag.css';
import { useOutletContext } from 'react-router-dom';

export const ShoppingBag = () => {
	const { busketProductsIDs } = useOutletContext();

	const productsArr = useRequestProductsInfo();
	console.log(productsArr);

	return (
		<div className="shopping-bag-wrap">
			<div className="bag-amount">
				<h1>My shopping bag ({busketProductsIDs.length})</h1>
				<a href="/">Back to shopping</a>
			</div>
			<div className="products-bag-wrap">
				{productsArr.map((item) => (
					<Product
						key={item.id}
						cl={item.cl}
						cost={item.cost}
						description={item.description}
						imgURL={item.imgURL}
						type={item.type}
						fixedPrice={item.fixedPrice}
					/>
				))}
			</div>
		</div>
	);
};
