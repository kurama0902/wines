import { ShoppingBag } from '../pages/ShoppingBag';
import { NotFound } from '../pages/NotFound/NotFound';
import { Layout } from '../Layout/Layout';
import { Main } from '../components/Main';
import { UserPage } from '../pages/UserPage'

export const routesMap = {
	Home: '/',
	ShoppingBag: '/shopping-bag',
	UserPage: '/user-page'
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
			{ path: '*', element: <NotFound /> },
		],
	},
];
