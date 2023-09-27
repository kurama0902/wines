import React, { useEffect, useState } from 'react';
import { useGetRequest } from '../../../shared/hooks/getRequest';
import { ProductsSections } from '../ProductsSections/ProductsSections';
import { RenderItems } from '../RenderItems/RenderItems';
import { enums } from '../../../shared/enums';

export const ProductsSectionNewSale = () => {
	const initialProducts = useGetRequest(enums.winesNewSale);

	const [filterdProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		setFilteredProducts(initialProducts);
	}, [initialProducts]);

	return (
		<ProductsSections
			title="New Sale"
			products={initialProducts}
			initialProducts={initialProducts}
			setFilteredProducts={setFilteredProducts}
			idName='new-sale'
		>
			<section className="products-wrap popularWines">
				<RenderItems products={filterdProducts} />
			</section>
		</ProductsSections>
	);
};
