import { insert, openDb, select } from "./dbconnector"
import { test, expect } from 'vitest'
import "fake-indexeddb/auto";

test('correctly opens DB', async () => {
    const DB_NAME = 'ProductsDB';
    const DB_TABLE = 'products';
    const TABLE_FIELDS = ['index', 'id', 'brand', 'model', 'price', 'imgUrl'];

    await openDb(DB_NAME, [DB_TABLE], [TABLE_FIELDS[0]], [TABLE_FIELDS.slice(1)])

    const databases = await indexedDB.databases()
    expect(databases.find((database) => {return database.name === DB_NAME})).toBeDefined()
})

test('correctly inserts into DB', async () => {
    const DB_NAME = 'ProductsDB';
    const DB_TABLE = 'products';
    const TABLE_FIELDS = ['index', 'id', 'brand', 'model', 'price', 'imgUrl'];

    const dbObject = await openDb(DB_NAME, [DB_TABLE], [TABLE_FIELDS[0]], [TABLE_FIELDS.slice(1)])
    const insertResult = await insert(dbObject, DB_TABLE, TABLE_FIELDS, [
        0, 'test_id', 'test_brand', 'test_model', 'test_price', 'test_imgUrl'
    ])

    expect(insertResult.type).toBe('success')
})

test('correctly selects from DB', async () => {
    const DB_NAME = 'ProductsDB';
    const DB_TABLE = 'products';
    const TABLE_FIELDS = ['index', 'id', 'brand', 'model', 'price', 'imgUrl'];

    const dbObject = await openDb(DB_NAME, [DB_TABLE], [TABLE_FIELDS[0]], [TABLE_FIELDS.slice(1)])
    await insert(dbObject, DB_TABLE, TABLE_FIELDS, [
        0, 'test_id', 'test_brand', 'test_model', 'test_price', 'test_imgUrl'
    ])
    const selectResult = await select(dbObject, DB_TABLE, 0)

    expect(selectResult[0].id).toBe('test_id');
})