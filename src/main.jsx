import React from 'react';
import ReactDOM from 'react-dom/client';

import * as bootstrap from 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import 'remixicon/fonts/remixicon.css'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Header from './components/Header';
import ProductList from './views/list/Main';
import ProductDetails from './views/detail/Main';

import { openDb, insert } from './utils/dbconnector';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <ProductList />,
		loader: async () => {
			const DB_NAME = 'ProductsDB';
			const DB_TABLE = 'products';
			const TABLE_FIELDS = ['id', 'brand', 'model', 'price', 'imgUrl'];

			if (!(await indexedDB.databases()).find((db) => db.name === DB_NAME)) {
				try {
					const dbObject = await openDb(DB_NAME, [DB_TABLE], [TABLE_FIELDS[0]], [TABLE_FIELDS.slice(1)]);

					const response = await fetch('https://front-test-api.herokuapp.com/api/product');
					const json = await response.json();

					json.forEach((resObject) => {
						insert(
							dbObject,
							DB_TABLE,
							TABLE_FIELDS,
							TABLE_FIELDS.map((field) => resObject[field])
						);
					});
				} catch (errorEvent) {
					console.error('Error while creating and/or interacting with databse. See the error below for more information');
					console.error(errorEvent);
				}
			}
		},
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
