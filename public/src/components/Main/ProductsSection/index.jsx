import React from 'react';
import { Product } from '../Product';
import { RightArrowSVG } from '../RightArrowSVG';

import './products-section.css';
import { useGetRequest } from '../../../shared/hooks/getRequest';

export const ProductsSection = () => {
	const products = useGetRequest('popular-wines');

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
