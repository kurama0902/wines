import React, { useEffect, useState } from 'react';
import { Product } from '../Product';
import { RightArrowSVG } from '../RightArrowSVG';

import './products-section.css';

export const ProductsSection = () => {
	let [products, setProducts] = useState([]);

	const getProducts = async () => {
		try {
			const res = await fetch('http://localhost:3010/api/popular-wines', {
				method: 'GET',
			});
			const productsResponse = await res.json();
			console.log(productsResponse);
			setProducts(productsResponse);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="section-h3-wrap">
			<h3>
				Popular wines <RightArrowSVG />
			</h3>
			<section className="products-wrap popularWines">
				{products.map((item) => {
					const { id, cl, cost, year, avaliableAmount, fixedPrice, quality, description, imgURL } =
						item;
					return (
						<Product
							id={id}
							cl={cl}
							cost={cost}
							year={year}
							avaliableAmount={avaliableAmount}
							fixedPrice={fixedPrice}
							quality={quality}
							description={description}
							imgURL={imgURL}
							key={item.id}
						/>
					);
				})}
			</section>
		</div>
	);
};
