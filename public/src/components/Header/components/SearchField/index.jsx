import { useRef, useState } from 'react';
import cn from 'classnames';

import { SearchSVG } from '../../../../shared/SVG/SearchSVG';
import { SearchedProductsPopup } from '../SearchedProductsPopup';
import { searchInfo } from '../../../../functions//searchInfo';

import './searchField.css';

export const SearchField = ({ placehoder }) => {
	const ref = useRef(null);

	const [searchedProducts, setSearchedProducts] = useState([]);

	const classNames = cn('search-wrap', {
		active: ref.current?.value,
	});

	return (
		<div className={classNames}>
			<input
				ref={ref}
				type="text"
				className="search-input"
				placeholder={placehoder}
				onChange={(e) => searchInfo(e, setSearchedProducts)}
			/>
			<div className="search-trap-hover">
				<SearchSVG></SearchSVG>
			</div>
			<SearchedProductsPopup searchedProducts={searchedProducts} />
		</div>
	);
};
