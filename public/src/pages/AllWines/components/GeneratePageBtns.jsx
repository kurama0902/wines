import React from 'react';

export const GeneratePageBtns = ({ pagesCount, changeRange, pageNumber }) => {
	const pageNums = Array(pagesCount).fill('1');

	return pageNums.map((item, index) => {
		const number = index + 1;
		return (
			<button
				key={number}
				onClick={() => {
					changeRange(number);
				}}
				className={`page-number ${pageNumber === number ? 'border-active' : ''}`}
			>
				{number}
			</button>
		);
	});
};
