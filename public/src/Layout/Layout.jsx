import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useBusketIDs } from '../shared/hooks/addedToBusketIDs';
import { useLikedWines } from '../shared/hooks/likedWines';

export const Layout = () => {
	const [likedProductsIDs, setAmount] = useLikedWines();
	const [busketProductsIDs, setBusketAmount] = useBusketIDs();

	return (
		<>
			<Header
				updateLikedWines={setAmount}
				likedAmount={likedProductsIDs?.length}
				busketAmount={busketProductsIDs?.length}
			/>

			<Suspense fallback="Loading">
				<Outlet context={{ likedProductsIDs, busketProductsIDs, setAmount, setBusketAmount }} />
			</Suspense>
		</>
	);
};
