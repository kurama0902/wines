import React, { useState } from 'react';
import { FilterSVG } from '../../../shared/SVG/FilterSVG';
import { getFilterInfo } from '../../../functions/getFilterInfo';

import './filter.css';

export const FilterPopup = ({ products, setProducts }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [selectValues, setSelectValue] = useState({ year: null, type: null });

	const updateSelectValues = (e) => {
		if (e.target.id === 'select-year') {
			setSelectValue({ year: +e.target.value, type: selectValues.type });
		} else {
			setSelectValue({ year: selectValues.year, type: e.target.value });
		}
	};

	const applyFilters = () => {
		setProducts(
			products.filter(
				(product) => +product.year === selectValues.year && product.type === selectValues.type
			)
		);
	};

	const handleResetFilters = () => {
		setProducts(products);
	};

	return (
		<>
			<button className="filter-btn" onClick={() => setIsVisible(!isVisible)}>
				<FilterSVG />
				<p>Filter</p>
			</button>
			<div
				className={`filter-modal-wrap ${
					isVisible ? 'visible-filter-modal' : 'invisible-filter-modal'
				}`}
			>
				<div className="close-filter-modal" onClick={() => setIsVisible(!isVisible)}></div>
				<div className="filter-modal">
					<h1>Filters</h1>
					<div className="filters">
						<div className="year-select-wrap">
							<p>Year:</p>
							<select
								onChange={(e) => updateSelectValues(e)}
								className="filter-select"
								name=""
								id="select-year"
							>
								<option value="" />
								{getFilterInfo(products, 'year').map((year) => (
									<option key={year}>{year}</option>
								))}
							</select>
						</div>
						<div className="type-select-wrap">
							<p>Type:</p>
							<select
								onChange={(e) => updateSelectValues(e)}
								className="filter-select"
								name=""
								id="select-type"
							>
								<option value="" />
								{getFilterInfo(products, 'type').map((type) => (
									<option key={type}>{type}</option>
								))}
							</select>
						</div>
					</div>
					<div className="wrap-buttons">
						<button onClick={handleResetFilters} className="apply-filters">
							Reset filters
						</button>
						<button onClick={applyFilters} className="apply-filters">
							Apply filters
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
