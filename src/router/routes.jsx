import Cookies from 'universal-cookie';
import moment from 'moment/moment';

import ProductList from '../views/list/Main';
import ProductDetails from '../views/detail/Main';
import DefaultView from '../views/Main';

import { openDb, insert } from '../utils/dbconnector';
import { incrementByAmount } from '../store/slices/counterSlice';
import store from '../store/main';

const homeLoader = async () => {
    const cookies = new Cookies();

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
            console.error(error);
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

const productLoader = async({ params }) => {
    const cookies = new Cookies();

    if(cookies.get(params.id) === undefined) {
        const response = await fetch(`https://front-test-api.herokuapp.com/api/product/${params.id}`);
        const json = await response.json();
        
        localStorage.setItem(params.id, JSON.stringify(json))

        cookies.set(params.id, true, {
            maxAge: moment().add(1, 'hour').diff(moment(), 'seconds')
        })
    }
}

const productActuator = async({ params, request }) => {
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

const routes = [{
    path: '/',
    element: <DefaultView><ProductList /></DefaultView>,
    loader: homeLoader
}, {
    path: '/:id',
    element: <DefaultView><ProductDetails /></DefaultView>,
    loader: productLoader,
    action: productActuator
}]

export default routes
export { homeLoader, productLoader, productActuator }