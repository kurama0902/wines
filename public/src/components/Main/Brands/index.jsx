import React from 'react';
import { Brand } from './components/Brand';
import { useGetRequest } from '../../../shared/hooks/getRequest';

import './brands.css';

export const Brands = () => {
	const brands = useGetRequest('brands');

	return (
		<section className="brands-wrap">
			{brands.map((item) => {
				return <Brand brands={item} key={item.name} />;
			})}
		</section>
	);
};
