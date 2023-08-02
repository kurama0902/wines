import React, { useState } from 'react';
import { Product } from '../Product';
import { RightArrowSVG } from '../../../shared/SVG/RightArrowSVG';
import { useGetRequest } from '../../../shared/hooks/getRequest';
import { FilterAndSortSection } from '../FilterAndSortSection';
import { useOutletContext } from 'react-router-dom';
import { sortContext } from '../../../context/sortContext';
import { sortBy } from '../../../functions/sortBy';

import './products-section.css';

export const ProductsSection = () => {
	const { likedProductsIDs, setAmount, busketProductsIDs, setBusketAmount } = useOutletContext();

	const [products, setProducts] = useState(useGetRequest('popular-wines'));
	let [sortDirection, setSortDirection] = useState({ num: 1 });

	return (
		<sortContext.Provider value={[sortDirection, setSortDirection]}>
			<div className="section-h3-wrap">
				<FilterAndSortSection products={products} setProducts={setProducts} sectionName={'popular-wines'} />
				<h3>
					Popular wines <RightArrowSVG />
				</h3>
				<section className="products-wrap popularWines">
					{sortBy(sortDirection.num, products).map((item) => {
						const {
							id,
							cl,
							cost,
							year,
							avaliableAmount,
							fixedPrice,
							quality,
							description,
							imgURL,
						} = item;

						const isLikedSelected = likedProductsIDs?.includes(id);
						const isProductAddedToBusket = busketProductsIDs?.includes(id);

						return (
							<Product
								id={id}
								cl={cl}
								cost={cost}
								year={year}
								isLikedSelected={isLikedSelected}
								isProductAddedToBusket={isProductAddedToBusket}
								avaliableAmount={avaliableAmount}
								fixedPrice={fixedPrice}
								quality={quality}
								description={description}
								imgURL={imgURL}
								setAmount={setAmount}
								setBusketAmount={setBusketAmount}
								key={item.id}
							/>
						);
					})}
				</section>
			</div>
		</sortContext.Provider>
	);
};


