import React, { useEffect, useState } from 'react';
import { useGetRequest } from '../../../shared/hooks/getRequest';
import { enums } from '../../../shared/enums';
import { ProductsSections } from '../ProductsSections/ProductsSections';
import { RenderItems } from '../RenderItems/RenderItems';

export const ProductsSection = () => {
	const initialProducts = useGetRequest(enums.popularWines);

	const [filterdProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		setFilteredProducts(initialProducts);
	}, [initialProducts]);

	return (
		<ProductsSections
			title="Popular wines"
			products={initialProducts}
			initialProducts={initialProducts}
			setFilteredProducts={setFilteredProducts}
		>
			<section className="products-wrap popularWines">
				<RenderItems products={filterdProducts} />
			</section>
		</ProductsSections>
	);
};
