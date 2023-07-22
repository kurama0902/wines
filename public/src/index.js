import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ShoppingBag } from './pages/ShoppingBag';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/shopping-bag',
		element: <ShoppingBag />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router} />
);
