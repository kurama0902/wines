import { ShoppingBag } from '../pages/ShoppingBag';
import { NotFound } from '../pages/NotFound/NotFound';
import { Layout } from '../Layout/Layout';
import { Main } from '../components/Main';
import { UserPage } from '../pages/UserPage';
import { AllWines } from '../pages/AllWines';
import { WinePage } from '../pages/WinePage';
import { AdminAuthorization } from '../pages/AdminPanel/AdminAuthorization';

export const routesMap = {
	Home: {
		path: '/',
		isVisible: true,
	},
	ShoppingBag: {
		path: '/shopping-bag',
		isVisible: false,
	},
	UserPage: {
		path: '/user-page',
		isVisible: false,
	},
	AllWines: {
		path: '/all-wines',
		isVisible: true,
	},
	WinePage: {
		path: '/wine',
		isVisible: true,
	},
	adminAuthPage: {
		path: '/admin',
		isVisible: false
	}
};

export const routes = [
	{
		path: routesMap.Home.path,
		element: <Layout />,
		children: [
			{ index: true, element: <Main /> },
			{
				path: routesMap.ShoppingBag.path,
				element: <ShoppingBag />,
			},
			{
				path: routesMap.UserPage.path,
				element: <UserPage />,
			},
			{
				path: routesMap.AllWines.path,
				element: <AllWines />,
			},
			{
				path: routesMap.WinePage.path,
				element: <WinePage />,
			},
			{
				path: routesMap.adminAuthPage.path,
				element: <AdminAuthorization />
			},
			{ path: '*', element: <NotFound /> },
		],
	},
];
