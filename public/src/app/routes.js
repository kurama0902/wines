import { ShoppingBag } from '../pages/ShoppingBag';
import { NotFound } from '../pages/NotFound/NotFound';
import { Layout } from '../Layout/Layout';
import { Main } from '../components/Main';
import { UserPage } from '../pages/UserPage'
import { AllWines } from '../pages/AllWines';
import { WinePage } from '../pages/WinePage';

export const routesMap = {
	Home: '/',
	ShoppingBag: '/shopping-bag',
	UserPage: '/user-page',
	allWines: '/all-wines',
	winePage: '/wine'
};


export const routes = [
	{
		path: routesMap.Home,
		element: <Layout />,
		children: [
			{ index: true, element: <Main /> },
			{
				path: routesMap.ShoppingBag,
				element: <ShoppingBag />,
			},
			{
				path: routesMap.UserPage,
				element: <UserPage />
			},
			{
				path: routesMap.allWines,
				element: <AllWines />
			},
			{
				path: routesMap.winePage,
				element: <WinePage/>
			},
			{ path: '*', element: <NotFound /> },
		],
	},
];
