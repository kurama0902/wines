import { Suspense, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { useBusketIDs } from '../shared/hooks/addedToBusketIDs';
import { useLikedWines } from '../shared/hooks/likedWines';
import { LikedProductsContext } from '../context/likedProductsContext';
import { routesMap } from '../app/routes';

export const Layout = () => {
	const { pathname } = useLocation();

	// const [likedProductsIDs, setAmount] = useLikedWines();
	const [likedProductsIDs, setAmount] = useContext(LikedProductsContext);
	const [busketProductsIDs, setBusketAmount] = useBusketIDs();

	const valuesOfRoutesMap = Object.keys(routesMap).map((key) => {
		const item = routesMap[key];
		if (item?.isVisible) {
			return item.path;
		}
		return null
	}).filter((item) => item);

	const isShowHeader = valuesOfRoutesMap.includes(pathname);

	return (
		<>
			{isShowHeader && (
				<Header
					updateLikedWines={setAmount}
					likedAmount={likedProductsIDs?.length}
					busketAmount={busketProductsIDs?.length}
				/>
			)}

			<Suspense fallback="Loading">
				<Outlet context={{ likedProductsIDs, busketProductsIDs, setAmount, setBusketAmount }} />
			</Suspense>
		</>
	);
};
