import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { ScrollContext } from '../context/scrollContext';
import { AuthContext } from '../context/authContext';
import { LikedProductsContext } from '../context/likedProductsContext';
import { MobileNavigation } from '../components/MobileNavigation';
import { useLikedWines } from '../shared/hooks/likedWines';

import cn from 'classnames';

import './App.css';

function App() {
	const [isScrollAble, setIsScrollAble] = useState(true);
	const [userLocalStorage, setUserLocalStorage] = useState(localStorage.getItem('auth'))
	const [likedProductsIDs, setAmount] = useLikedWines();
	const [isActive, setIsActive] = useState(false);

	const components = useRoutes(routes);

	const classNames = cn('App', {
		'on-scroll': isScrollAble,
		'off-scrolll': !isScrollAble,
	});


	return (
		<div className={classNames} id="root">
			<AuthContext.Provider value={[userLocalStorage, setUserLocalStorage]}>
					<ScrollContext.Provider value={setIsScrollAble}>
						<LikedProductsContext.Provider value={[likedProductsIDs, setAmount, isActive, setIsActive]}>
							{components}
							<MobileNavigation />
						</LikedProductsContext.Provider>
					</ScrollContext.Provider>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
