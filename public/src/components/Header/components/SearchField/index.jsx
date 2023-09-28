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
			<input className="search-input" placeholder={placehoder} type="text" onChange={e => searchInfo(e, setSearchedProducts)} />
			<div className="search-trap-hover">
				<SearchSVG></SearchSVG>
			</div>
			<SearchedProductsPopup searchedProducts={searchedProducts} />
		</div>
	);
};
