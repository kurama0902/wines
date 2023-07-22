import React from 'react';
import { MainSlider } from './MainSlider';
import { Brands } from './Brands';
import { ProductsSection } from './ProductsSection';
import { ProductsSectionNewSale } from './ProductsSectionNewSale';
import { ProductsSectionPremiumWines } from './ProductsSectionPremiumWines';

import './main.css';

export const Main = () => {
	return (
		<main className="main">
			<MainSlider />
			<Brands />
			<ProductsSection />
			<ProductsSectionNewSale />
			<ProductsSectionPremiumWines />
		</main>
	);
};
