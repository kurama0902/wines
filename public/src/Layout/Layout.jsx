import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { useBusketIDs } from '../shared/hooks/addedToBusketIDs';
import { useLikedWines } from '../shared/hooks/likedWines';
import { routesMap } from '../app/routes';

export const Layout = () => {
	const [likedProductsIDs, setAmount] = useLikedWines();
	const [busketProductsIDs, setBusketAmount] = useBusketIDs();

	const currentLocation = useLocation();
	const isVisible = currentLocation.pathname !== routesMap.ShoppingBag &&
	 				  currentLocation.pathname !== routesMap.UserPage &&
	          		  currentLocation.pathname !== routesMap.allWines && 
						currentLocation.pathname !== routesMap.winePage ? true : false;

	return (
		<>
			{isVisible && <Header
				updateLikedWines={setAmount}
				likedAmount={likedProductsIDs?.length}
				busketAmount={busketProductsIDs?.length}
			/>
			}

			<Suspense fallback="Loading">
				<Outlet context={{ likedProductsIDs, busketProductsIDs, setAmount, setBusketAmount }} />
			</Suspense>
		</>
	);
};

