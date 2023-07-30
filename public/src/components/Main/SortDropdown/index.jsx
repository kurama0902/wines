import { React, useContext, useState } from 'react';
import { DropdownArrowSVG } from '../../../shared/SVG/DropdownArrowSVG';
import { sortContext } from '../../../context/sortContext';

import './sort.css';

export const SortDropdown = () => {
	let [sortDirection, setSortDirection] = useContext(sortContext)

	const sortBy = (e) => {
        let num = e.target.value;
		setSortDirection({num: +num});
	};

	return (
			<div className="sort-by-wrap">
				<label className="sort-by-label" htmlFor="sort-by">
					Sort by
				</label>
				<select onChange={(e) => sortBy(e)} id="sort-by" className="sort-by">
					<option value="1">increasing price</option>
					<option value="0">decreasing price</option>
				</select>
				<div className="arrow">
					<DropdownArrowSVG />
				</div>
			</div>
	);
};
