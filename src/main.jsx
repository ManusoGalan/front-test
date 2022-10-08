import React from 'react';
import ReactDOM from 'react-dom/client';

import * as bootstrap from 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';

import Header from './components/Header';
import ProductList from './views/list/Main';
import ProductDetails from './views/detail/Main';

import { openDb, insert } from './utils/dbconnector';
import { incrementByAmount } from './store/slices/counterSlice';
import store from './store/main';
import moment from 'moment/moment';

const cookies = new Cookies()

const routes = createBrowserRouter([
	{
		path: '/',
		element: <ProductList />,
		loader: async () => {
			const DB_NAME = 'ProductsDB';
			const DB_TABLE = 'products';
			const TABLE_FIELDS = ['index', 'id', 'brand', 'model', 'price', 'imgUrl'];

			if(cookies.get(DB_NAME) === undefined) {
				try {
					const dbObject = await openDb(DB_NAME, [DB_TABLE], [TABLE_FIELDS[0]], [TABLE_FIELDS.slice(1)]);
	
					const response = await fetch('https://front-test-api.herokuapp.com/api/product');
					const json = await response.json();
	
					json.forEach(async (resObject, index) => {
						try {
							await insert(
								dbObject,
								DB_TABLE,
								TABLE_FIELDS,
								[index, ...TABLE_FIELDS.slice(1).map((field) => resObject[field])]
							);
						} catch (error) {
							console.error('Error while creating and/or interacting with databse. See the error below for more information');
							console.error(error);
						}
						
					});

					cookies.set(DB_NAME, true, {
						maxAge: moment().add(1, 'hour').diff(moment(), 'seconds')
					})
	
					return [dbObject, DB_TABLE];
				} catch (error) {
					console.error('Error while creating and/or interacting with databse. See the error below for more information');
					console.error(errorEvent);
				}
			} else {
				try{
					const dbObject = await openDb(DB_NAME, [DB_TABLE], [TABLE_FIELDS[0]], [TABLE_FIELDS.slice(1)]);
					return [dbObject, DB_TABLE]
				} catch (error) {
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
			if(cookies.get(params.id) === undefined) {
				const response = await fetch(`https://front-test-api.herokuapp.com/api/product/${params.id}`);
				const json = await response.json();
				
				localStorage.setItem(params.id, JSON.stringify(json))

				cookies.set(params.id, true, {
					maxAge: moment().add(1, 'hour').diff(moment(), 'seconds')
				})
			}
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
			store.dispatch(incrementByAmount(json.count))
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
