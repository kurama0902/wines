import { useRef, useState } from 'react';
import cn from 'classnames';

import { SearchSVG } from '../../../../shared/SVG/SearchSVG';
import { SearchedProductsPopup } from '../SearchedProductsPopup';
import { searchInfo } from '../../../../functions//searchInfo';

import './searchField.css';

export const SearchField = ({ placehoder }) => {
	const ref = useRef(null);

	const [searchedProducts, setSearchedProducts] = useState([]);
	const [isSearchActive, setIsSearchActive] = useState(false);

	const classNames = cn('search-wrap', {
		active: ref.current?.value,
	});

	return (
		<div className={`${classNames} ${isSearchActive ? 'search-wrap-border-line' : ''}`}>
			<input
				ref={ref}
				type="text"
				className={`search-input ${isSearchActive ? 'search-input-visible' : ''}`}
				placeholder={placehoder}
				onChange={(e) => searchInfo(e, setSearchedProducts)}
			/>
			<div onClick={() => setIsSearchActive(!isSearchActive)} className="search-trap-hover">
				<SearchSVG></SearchSVG>
			</div>
			{isSearchActive && <SearchedProductsPopup searchedProducts={searchedProducts} />}
		</div>
	);
};
