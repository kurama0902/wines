import React, { useContext } from 'react';
import { Product } from '../Product';
import { sortBy } from '../../../functions/sortBy';
import { useOutletContext } from 'react-router-dom';
import { sortContext } from '../../../context/sortContext';

export const RenderItems = ({ products }) => {
	const { likedProductsIDs, setAmount, busketProductsIDs, setBusketAmount } = useOutletContext();

	let [sortDirection] = useContext(sortContext);

	return sortBy(sortDirection.num, products).map((item) => {
		const { id, cl, cost, year, avaliableAmount, fixedPrice, quality, description, imgURL } = item;

		const isLikedSelected = likedProductsIDs?.includes(id);
		const isProductAddedToBusket = busketProductsIDs?.includes(id);

		return (
			<Product
				id={id}
				cl={cl}
				cost={cost}
				year={year}
				isLikedSelected={isLikedSelected}
				isProductAddedToBusket={isProductAddedToBusket}
				avaliableAmount={avaliableAmount}
				fixedPrice={fixedPrice}
				quality={quality}
				description={description}
				imgURL={imgURL}
				setAmount={setAmount}
				setBusketAmount={setBusketAmount}
				key={item.id}
			/>
		);
	});
};
