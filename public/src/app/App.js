import { useEffect, useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { LikedProductsContext } from '../context/likedProductsContext';
import { MobileNavigation } from '../components/MobileNavigation';
import { useLikedWines } from '../shared/hooks/likedWines';
import { WindowSizeContainer } from './WindowSizeContainer';
import { LoginModal } from '../components/LoginModal';
import { RegisterUserModal } from '../components/RegisterUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../redux/actions/authActions';
import { Preloader } from '../shared/components/Counter/Preloader';

import './App.css';


function App() {
	const [likedProductsIDs, setAmount] = useLikedWines();
	const [isActive, setIsActive] = useState(false);

	const components = useRoutes(routes);



	const dispatch = useDispatch();


	const checkAuth = async () => {
		try {
			const response = await fetch('http://localhost:3010/api/checkAuthorization', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({ email: (document.cookie.split('=')[1] || '') })

			})

			const result = await response.clone().json();
			console.log(result);

			console.log(response.status);

			if (response.status === 200) {
				console.log('ahuenno sho pizda');
				dispatch(saveUser(result))
			}
		} catch (error) {
			console.log('lol');
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])


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
			{/* <Preloader /> */}
			<WindowSizeContainer>
				{(width) => (
					<LikedProductsContext.Provider value={likedProductsContextValues}>
						{components}

						{width <= 1024 && <MobileNavigation width={width} />}
					</LikedProductsContext.Provider>
				)}
			</WindowSizeContainer>
			<LoginModal />
			<RegisterUserModal />
		</div>
	);
}

export default App;
