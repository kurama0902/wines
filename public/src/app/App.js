import { useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { AuthContext } from '../context/authContext';
import { LikedProductsContext } from '../context/likedProductsContext';
import { MobileNavigation } from '../components/MobileNavigation';
import { useLikedWines } from '../shared/hooks/likedWines';
import { WindowSizeContainer } from './WindowSizeContainer';

import './App.css';

function App() {
	const [userLocalStorage, setUserLocalStorage] = useState(localStorage.getItem('auth') || null);
	const [likedProductsIDs, setAmount] = useLikedWines();
	const [isActive, setIsActive] = useState(false);

	const components = useRoutes(routes);

	const authContextValues = useMemo(
		() => ({
			authStore: userLocalStorage,
			authAction: setUserLocalStorage,
		}),
		[userLocalStorage]
	);

	const likedProductsContextValues = useMemo(
		() => ({
			likedProductsIDs,
			setAmount,
			isActive,
			setIsActive,
		}),
		[isActive, likedProductsIDs, setAmount]
	);

	return (
		<div className="App" id="root">
			<WindowSizeContainer>
				{(width) => (
					<AuthContext.Provider value={authContextValues}>
						<LikedProductsContext.Provider value={likedProductsContextValues}>
							{components}

							{width <= 1024 && <MobileNavigation width={width} />}
						</LikedProductsContext.Provider>
					</AuthContext.Provider>
				)}
			</WindowSizeContainer>
		</div>
	);
}

export default App;
