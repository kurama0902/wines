import React, { useState } from 'react';
import './products-section.css';
import { FilterAndSortSection } from '../FilterAndSortSection';
import { enums } from '../../../shared/enums';
import { RightArrowSVG } from '../../../shared/SVG/RightArrowSVG';
import { sortContext } from '../../../context/sortContext';

export const ProductsSections = ({ products, setFilteredProducts, title, children }) => {
	let [sortDirection, setSortDirection] = useState({ num: 1 });

	return (
		<sortContext.Provider value={[sortDirection, setSortDirection]}>
			<div className="section-h3-wrap">
				<FilterAndSortSection
					products={products}
					setProducts={setFilteredProducts}
					sectionName={enums.popularWines}
				/>
				<h3>
					{title} <RightArrowSVG />
				</h3>

				{children}
			</div>
		</sortContext.Provider>
	);
};
