import React from 'react';

import { Header } from '../../components/Header';
import { Product } from './Components/Product';

import { useLikedWines } from '../../shared/hooks/likedWines';
import { useBusketIDs } from '../../shared/hooks/addedToBusketIDs';
import { useRequestProductsInfo } from '../../shared/hooks/requestProductsInfo';

import './shopping-bag.css';

export const ShoppingBag = () => {
	const [likedProductsIDs, setAmount] = useLikedWines();
	const [busketProductsIDs, setBusketAmount] = useBusketIDs();
	const productsArr = useRequestProductsInfo()
	console.log(productsArr);

	return (
		<div className="shopping-bag-wrap">
			<Header likedAmount={likedProductsIDs?.length} busketAmount={busketProductsIDs?.length} />
			<div className="bag-amount">
				<h1>My shopping bag ({busketProductsIDs.length})</h1>
				<a href="/">Back to shopping</a>
			</div>
			<div className="products-bag-wrap">
				{productsArr.map(item => <Product key={item.id} cl={item.cl} cost={item.cost} description={item.description} imgURL={item.imgURL} type={item.type} fixedPrice={item.fixedPrice}/>)}
            </div>
		</div>
	);
};
