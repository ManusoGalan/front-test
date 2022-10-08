import React from 'react';
import ReactDOM from 'react-dom/client';

import * as bootstrap from 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import ProductList from './views/list/Main';
import ProductDetails from './views/detail/Main';

import { openDb, insert } from './utils/dbconnector';
import store from './store/main';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <ProductList />,
		loader: async () => {
			const DB_NAME = 'ProductsDB';
			const DB_TABLE = 'products';
			const TABLE_FIELDS = ['index', 'id', 'brand', 'model', 'price', 'imgUrl'];

			try {
				const dbObject = await openDb(DB_NAME, [DB_TABLE], [TABLE_FIELDS[0]], [TABLE_FIELDS.slice(1)]);

				const response = await fetch('https://front-test-api.herokuapp.com/api/product');
				const json = await response.json();

				json.forEach((resObject, index) => {
					insert(
						dbObject,
						DB_TABLE,
						TABLE_FIELDS,
						[index, ...TABLE_FIELDS.slice(1).map((field) => resObject[field])]
					);
				});

				return [dbObject, DB_TABLE];
			} catch (error) {
				//If error contains a target, it is an error event; if not, it is the already created database
				if(!error.target) {
					return [error, DB_TABLE]
				} else {
					console.error('Error while creating and/or interacting with databse. See the error below for more information');
					console.error(errorEvent);
				}
			}
		}
	},
	{
		path: '/:id',
		element: <ProductDetails />,
		loader: async({ params }) => {
			const response = await fetch(`https://front-test-api.herokuapp.com/api/product/${params.id}`);
			const json = await response.json();

			localStorage.setItem(params.id, JSON.stringify(json))
		},
		action: async({ params, request }) => {
			let formData = await request.formData();
			
			const response = await fetch('https://front-test-api.herokuapp.com/api/cart', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					id: params.id,
					colorCode: formData.get('color'),
					storageCode: formData.get('storage')
				})
			});

			const json = await response.json();
			console.log(json)
		}
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Header />
			<RouterProvider router={routes} />
		</Provider>
	</React.StrictMode>
);
