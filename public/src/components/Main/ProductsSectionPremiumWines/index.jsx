import React from 'react';
import { Product } from '../Product';

import { RightArrowSVG } from '../../../shared/SVG/RightArrowSVG';
import { FilterAndSortSection } from '../FilterAndSortSection';

import { useGetRequest } from '../../../shared/hooks/getRequest';

import './products-section.css';

export const ProductsSectionPremiumWines = () => {
    const products = useGetRequest('winesPremium');

	return (
		<div className="section-h3-wrap">
			<FilterAndSortSection sectionName='premiumWines'/>
			<h3>
			Premium wines <RightArrowSVG />
			</h3>
			<section className="products-wrap winesPremium">
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
}