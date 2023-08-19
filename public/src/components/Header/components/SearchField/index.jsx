import { useState } from 'react';
import { CameraSVG } from '../../../../shared/SVG/CameraSVG';
import { SearchSVG } from '../../../../shared/SVG/SearchSVG';
import { SearchedProductsPopup } from '../SearchedProductsPopup';
import { searchInfo } from '../../../../functions//searchInfo' 

import './searchField.css';

export const SearchField = ({ placehoder }) => {
	const [searchedProducts, setSearchedProducts] = useState([]);

	return (
		<div className="search-wrap">
			<div className="input-wrap">
				<label htmlFor="search">
					<SearchSVG />
				</label>
				<input
					id="search"
					type="text"
					placeholder={placehoder}
					onChange={(e) => {
						searchInfo(e, setSearchedProducts)
					}}
				/>
			</div>
			<button className="photo-scan">
				<CameraSVG />
			</button>
			<SearchedProductsPopup searchedProducts={searchedProducts} />
		</div>
	);
};
