import { useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { LikedProductsContext } from '../context/likedProductsContext';
import { MobileNavigation } from '../components/MobileNavigation';
import { useLikedWines } from '../shared/hooks/likedWines';
import { WindowSizeContainer } from './WindowSizeContainer';
import { LoginModal } from '../components/LoginModal';
import { useSelector } from 'react-redux';

import './App.css';

function App() {
	const [likedProductsIDs, setAmount] = useLikedWines();
	const [isActive, setIsActive] = useState(false);

	const components = useRoutes(routes);

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
					<LikedProductsContext.Provider value={likedProductsContextValues}>
						{components}

						{width <= 1024 && <MobileNavigation width={width} />}
					</LikedProductsContext.Provider>
				)}
			</WindowSizeContainer>
			<LoginModal />
		</div>
	);
}

export default App;
