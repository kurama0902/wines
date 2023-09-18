import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Product } from './Components/Product';
import { useRequestProductsInfo } from '../../shared/hooks/requestProductsInfo';
import { fetchDataArray } from '../../functions/fetchDataArray';

import './shopping-bag.css';

export const ShoppingBag = () => {
	const { busketProductsIDs, setBusketAmount } = useOutletContext();
	const productsArr = useRequestProductsInfo('addedToBusketIDs');

	let [products, setProducts] = useState(productsArr);
	let [total, setTotal] = useState(0);

	const deleteBusketItem = (id, subtotal) => (event) => {
		setTotal(total - subtotal);
		setProducts((currentItems) => {
			return currentItems.filter(item => item.id !== id)
		})
		setBusketAmount(id);
	}

	useEffect(() => {
		fetchDataArray('addedToBusketIDs', setProducts)
		let totalValue = 0;
		productsArr.forEach(item => {
			totalValue += item.cost >= 180 ? item.cost : item.cost + 10;
		})
		setTotal(totalValue)
	}, [productsArr])

	return (
		<div className="shopping-bag-wrap">
			<div className="bag-amount">
				<h1>My shopping bag ({busketProductsIDs.length})</h1>
				<a href="/">Back to shopping</a>
			</div>
			<div className="products-bag-wrap">
				{products?.map((item) => {
					 return <Product
						id={item.id}
						key={item.id}
						avaliableAmount={item.avaliableAmount}
						cl={item.cl}
						cost={item.cost}
						description={item.description}
						imgURL={item.imgURL}
						type={item.type}
						fixedPrice={item.fixedPrice}
						deleteBusketItem={deleteBusketItem}
						total={total}
						setTotal={setTotal}
					/>
				})}
			</div>
			{total > 0 ? <div className="total-wrap">
				<p className="total">Total: ${total}</p>
				<button className="order-btn">Order</button>
			</div> : <></>}
		</div>
	)
}
