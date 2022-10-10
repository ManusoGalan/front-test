import productsReducer from '../store/slices/counterSlice'
import { homeLoader, productActuator, productLoader } from './routes'

import { vi, test, expect } from 'vitest'
import "fake-indexeddb/auto";
import createFetchMock from 'vitest-fetch-mock';
import store from '../store/main';

/**
 * @jest-environment jsdom
 */

test('fetches a list of products on funcion call', async () => {
    const fetchMock = createFetchMock(vi);
    fetchMock.enableMocks();

    const fetchMockResponse = [{
        'id': 'ZmGrkLRPXOTpxsU4jjAcv', 
        'brand': 'Acer', 
        'model': 'Iconia Talk S', 
        'price': 170, 
        'imgUrl': 'https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg'
    }]

    fetchMock.mockResponse(JSON.stringify(fetchMockResponse))

    const [dbObject, tableName] = await homeLoader()
    expect(dbObject.name).toBe('ProductsDB')
})

test('fetches a product on funcion call', async () => {
    const fetchMock = createFetchMock(vi);
    fetchMock.enableMocks();

    const fetchMockResponse = [{
        'id': 'ZmGrkLRPXOTpxsU4jjAcv', 
        'brand': 'Acer', 
        'model': 'Iconia Talk S', 
        'price': 170, 
        'imgUrl': 'https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg'
    }]

    fetchMock.mockResponse(JSON.stringify(fetchMockResponse))

    await productLoader({
        params: {
            id:  'ZmGrkLRPXOTpxsU4jjAcv'
        }
    })

    expect(localStorage.getItem('ZmGrkLRPXOTpxsU4jjAcv')).toBeDefined();
})

test('posts an action to API and updates the store to add a new product', async () => {
    const fetchMock = createFetchMock(vi);
    fetchMock.enableMocks();
    fetchMock.mockResponse(JSON.stringify({
        count: 1
    }));

    const mockedProductId = 'ZmGrkLRPXOTpxsU4jjAcv'

    const mockedFormData = new FormData();
    mockedFormData.append('color', 1000);
    mockedFormData.append('storage', 200);

    const mockedRequest = await new Request()
    mockedRequest.formData = vi.fn().mockResolvedValue(mockedFormData)

    await productActuator({
        params: {
            id:  mockedProductId
        },
        request: mockedRequest
    })

    expect(store.getState().products.count).toBe(1)
})