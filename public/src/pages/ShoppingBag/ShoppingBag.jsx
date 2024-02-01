import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { Product } from './Components/Product';
import { useRequestProductsInfo } from '../../shared/hooks/requestProductsInfo';
import { fetchDataArray } from '../../functions/fetchDataArray';

import { useSelector } from 'react-redux';
import { Preloader } from '../../shared/components/Counter/Preloader';

import './shopping-bag.css';

export const ShoppingBag = () => {
	const { busketProductsIDs, setBusketAmount } = useOutletContext();
	const productsArr = useRequestProductsInfo('addedToBusketIDs');

	const { user } = useSelector((state) => ({
		user: state.auth.user,
	}));

	let [products, setProducts] = useState(productsArr);
	let [productsQuant, setProductsQuant] = useState([]);
	let [billTable, setBillTable] = useState('');
	let [total, setTotal] = useState(0);

	const deleteBusketItem = (id, subtotal, productsQuant, setProductsQuant, order) => {
		let newProductsQuantArr = [...productsQuant];
		newProductsQuantArr.splice(order, 1);
		setProductsQuant(newProductsQuantArr);

		setTotal(total - subtotal);
		setProducts((currentItems) => {
			return currentItems.filter((item) => item.id !== id);
		});
		setBusketAmount(id);
	};

	async function orderGoods() {
		let tableStart = `
		<table border=1>
		<tr>
		  <th style='padding: 10px;'>Product</th>
		  <th style='padding: 10px;'>Quantity</th>
		  <th style='padding: 10px;'>Cost</th>
		</tr>`;

		let tableEnd = `
		<tr>
		<th style="padding: 10px; text-align: right;" colspan='3'>Total: $${total}</th>
	  </tr>
	</table>
		`;
		let htmlStr = '';

		await fetch('http://localhost:3010/api/addToOrderHistory', {
			method: 'POST',
       		headers: {
      			"Content-Type": "application/json",
    		},
			body: JSON.stringify({
				email: user.email,
				productsInfo: [products, productsQuant]
			})
		})
		products.forEach((e, index) => {
			htmlStr +=
				billTable +
				`<tr><td style="text-align: center; padding: 10px;">${e.description}</td><td style="text-align: center; padding: 10px;">${productsQuant[index]}</td><td style="text-align: center; padding: 10px;">$${e.cost}</td></tr>`;
		});
		fetch('http://localhost:3010/api/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				info: tableStart + htmlStr + tableEnd,
				email: user.email
			}),
		});

		setProducts([]);
		// setTotal(0);

		await fetch('http://localhost:3010/api/changeGoodsQuantity', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				IDs: JSON.parse(localStorage.getItem('addedToBusketIDs')),
				productsQuant: productsQuant
			})
		})

		setBusketAmount(null, true)
		setProducts([]);
		setProductsQuant([]);
		setTotal(0);

	}

	useEffect(() => {
		fetchDataArray('addedToBusketIDs', setProducts);
		let totalValue = 0;
		productsArr.forEach((item) => {
			totalValue += item.cost >= 180 ? item.cost : item.cost + 10;
		});
		setTotal(totalValue);
		setProductsQuant([...new Array(productsArr.length)].map((i) => 1));
	}, [productsArr]);

	return (
		<div className="shopping-bag-wrap">
			<div className="bag-amount">
				<h1>My shopping bag ({busketProductsIDs.length})</h1>
				<Link to="/">Back to shopping</Link>
			</div>
			{!busketProductsIDs.length ? <h1 className='no-label' >No wines in the bag..</h1> : !products.length ? <Preloader/> : <div className="products-bag-wrap">
				{products?.map((item, index) => {
					return (
						<Product
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
							productsQuant={productsQuant}
							setProductsQuant={setProductsQuant}
							order={index}
						/>
					);
				})}
			</div>}
			{total > 0 ? (
				<div className="total-wrap">
					<p className="total">Total: ${total}</p>
					<button onClick={orderGoods} className={`order-btn ${user?.email ? '' : 'order-btn-hide'}`}>
						Order
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};
