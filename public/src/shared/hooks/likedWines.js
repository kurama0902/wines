import { useLocalStorage } from './localStorage';

export const useLikedWines = () => {
	const [likedProductsIDs, setStore] = useLocalStorage('LikedIDs');
	console.log(likedProductsIDs);

	const handleUpdateLikeIds = (id) => {
		if (likedProductsIDs?.length && likedProductsIDs?.includes(id)) {
			const likedIds = likedProductsIDs.filter((itemId) => itemId !== id);
			console.log(likedIds);
			setStore(likedIds);
		} else {
			setStore([...likedProductsIDs, id]);
		}
	};

	return [likedProductsIDs, handleUpdateLikeIds];
};
