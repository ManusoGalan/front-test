import React from 'react';
import ReactDOM from 'react-dom/client';

import * as bootstrap from 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import 'remixicon/fonts/remixicon.css'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Header from './components/Header';
import ProductList from './views/list/Main';
import ProductDetails from './views/detail/Main';


const routes = createBrowserRouter([
	{
		path: '/',
		element: <ProductList />,
		children: [
			{
				path: ':id',
				element: <ProductDetails />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Header />
		<RouterProvider router={routes} />
	</React.StrictMode>
);
