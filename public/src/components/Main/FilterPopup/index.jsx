import React, { useState } from 'react';
import { FilterSVG } from '../../../shared/SVG/FilterSVG';
import { getFilterInfo } from '../../../functions/getFilterInfo';

import './filter.css';

export const FilterPopup = ({ products, setProducts }) => {
	const [isVisible, setIsVisible] = useState(false);
    const [selectValues, setSelectValue] = useState({year: null, type: null})

    const updateSelectValues = (e) => {
        if(e.target.id === 'select-year') {
            setSelectValue({year: +e.target.value, type: selectValues.type})
        } else {
            setSelectValue({year: selectValues.year, type: e.target.value})
        }
    }
    console.log(selectValues);

    const applyFilters = () => {
        console.log(products.filter(product => (+product.year === selectValues.year && product.type === selectValues.type)));
        setProducts(products.filter(product => (+product.year === selectValues.year && product.type === selectValues.type)))
    }

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
							<select onChange={e => updateSelectValues(e)} className="filter-select" name="" id="select-year">
								{products ? (
									getFilterInfo(products, 'year').map((year, index) => (
										<option key={index}>{year}</option>
									))
								) : (
									<option value={'UNAVIABLE'}>UNAVIABLE</option>
								)}
							</select>
						</div>
						<div className="type-select-wrap">
                            <p>Type:</p>
							<select onChange={e => updateSelectValues(e)} className="filter-select" name="" id="select-type">
								{products ? (
									getFilterInfo(products, 'type').map((type, index) => (
										<option key={index}>{type}</option>
									))
								) : (
									<option value={'UNAVIABLE'}>UNAVIABLE</option>
								)}
							</select>
						</div>
					</div>
                    <button onClick={applyFilters} className="apply-filters">Apply filters</button>
				</div>
			</div>
		</>
	);
};
