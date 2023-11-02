import { createContext } from 'react';

export const LikedProductsContext = createContext({
	likedProductsIDs: [],
	setAmount: () => {},
	isActive: false,
	setIsActive: () => {},
});
