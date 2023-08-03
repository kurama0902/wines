import React from 'react';
import { useGetRequest } from '../../../shared/hooks/getRequest';
import { ProductsSections } from '../ProductsSections/ProductsSections';
import { RenderItems } from '../RenderItems/RenderItems';

export const ProductsSectionNewSale = () => {
	const products = useGetRequest('winesNewSale');

	return (
		<ProductsSections title="Popular wines" products={products} setFilteredProducts={() => {}}>
			<section className="products-wrap winesNewSale">
				<RenderItems products={products} />
			</section>
		</ProductsSections>
	);
};
