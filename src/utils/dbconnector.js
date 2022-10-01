/**
 * Cretes new database
 * @param {string} dbName The name of the database to be created
 * @param {Arrray<string>} tableNames An array contianing the names of the tables to be created on the database
 * @param {Array<string>} primaryKeyPaths An array containing the names of the field which will serve as primary key for each table in sequential order
 * @param {Array<Array<string>>} fieldKeyPaths An array containing an array with the paths to the fields which will be stored (except the primary key) for each table in sequential order
 * @returns {Promise<IDBDatabase | null>} A promise which resolves to a IDBDatabase indicating a success or rejects to an event containing error info
 */
const openDb = async (dbName, tableNames, primaryKeyPaths, fieldKeyPaths) => {
    return new Promise((res, rej) => { 
	    const dbObjectRequest = indexedDB.open(dbName);

        dbObjectRequest.onerror = (event) => {
            rej(event)
        };

        dbObjectRequest.onupgradeneeded = (event) => {
            const dbObject = event.target.result;

            tableNames.forEach((tableName, index) => {
                _createTable(dbObject, tableName, primaryKeyPaths[index], fieldKeyPaths[index])
            })

            res(dbObject)
        }
    })
};

/**
 * Drops a table from the database object passed as argument
 * @param {IDBDatabase} dbObject The DB Object
 * @param {string} tableName The name of the table to be dropped
 */
const dropTable = (dbObject, tableName) => {
	dbObject.deleteObjectStore(tableName);
};

/**
 * Creates a new field in the table passed as argument
 * @param {IDBObjectStore} dbTableObject The table in which the new field will be created
 * @param {string} fieldKeyPath The path to the field which will be stored
 */
const createField = (dbTableObject, fieldKeyPath) => {
    dbTableObject.createIndex(fieldKeyPath, fieldKeyPath)
}

/**
 * Drops a field in the table passed as argument
 * @param {IDBObjectStore} dbTableObject The table in which the new field will be created
 * @param {string} fieldKeyPath The path to the field which will be stored
 */
 const dropField = (dbTableObject, fieldKeyPath) => {
    dbTableObject.deleteIndex(fieldKeyPath)
}

/**
 * Selects data from a table stored in some database
 * @param {IDBDatabase} dbObject The database where the insert will be performed
 * @param {IDBObjectStore} tableName The name of the table where the insert will be perfomermed
 * @param {string} primaryKeyValue The value of the primary key field from record that wants to be selected
 * @returns {Promise<Object | Event>} A promise which resolves to a the selected record indicating a success or rejects to an event containing error info
 */
const select = (dbObject, tableName, primaryKeyValue) => {
    return new Promise((res, rej) => {
        const tx = _createTransaction(dbObject, tableName);
    
        tx.onerror = (event) => {
            rej(event)
        }

        const selectRequest = tx.objectStore(tableName).get(primaryKeyValue)

        selectRequest.onsuccess = (_event) => {
            res(selectRequest.result)
        } 
    })
}

/**
 * Inserts new data into a table stored in some databse
 * @param {IDBDatabase} dbObject The database where the insert will be performed
 * @param {IDBObjectStore} tableName The name of the table where the insert will be perfomermed
 * @param {Array<string>} key The fields or columns to be fulfield in sequential order
 * @param {Array<any>}  values The value of the fields or columns for the corresponding keys in sequential order
 * @returns {Promise<boolean | Event>} A promise which resolves to a boolean indicating a success or rejects to an event containing error info
 */
const insert = (dbObject, tableName, keys = [], values = []) => {
    return new Promise((res, rej) => {
        const tx = _createTransaction(dbObject, tableName, 'readwrite')

        tx.oncomplete = () => {
            res(true)
        }
    
        tx.onerror = (event) => {
            rej(event)
        }
    
        const newRow = {}
        keys.forEach((key, index) => {
            newRow[key] = values[index];
        })
    
        tx.objectStore(tableName).add(newRow);
    })
}

const remove = (dbObject, dbTableObject) => {

}

const update = (dbObject, dbTableObject) => {

}

/**
 * Creates a new transaction object for a table stored in some database
 * @param {IDBObjectStore} dbObject The database object in which the transaction will be perfomed
 * @param {string} tableName The name of the table in which the transction will be performed
 * @param {string | null} mode The mode in which the transaction will be performed ('readonly' or 'readwrite')
 * @returns {IDBTransaction} The transaction object
 */
const _createTransaction = (dbObject, tableName, mode='readonly') => {
    return dbObject.transaction(tableName, mode)
}

/**
 * Creates a new table on the database passed as argument
 * @param {IDBDatabase} dbObject The DB Object
 * @param {string} tableName The name of the table to be created
 * @param {string | null} primaryKeyPath The name of the field which will serve as primary key
 * @param {Array<string>} fieldKeyPaths An array containing the paths to the fields which will be stored (except the primary key)
 * @returns {IDBObjectStore} The object representing the newly created table
 */
 const _createTable = (dbObject, tableName, primaryKeyPath = null, fieldKeyPaths = []) => {
	const dbTableObject = primaryKeyPath ? dbObject.createObjectStore(tableName, { keyPath: primaryKeyPath }) : dbObject.createObjectStore(tableName);

    fieldKeyPaths.forEach((fieldKeyPath) => {
        dbTableObject.createIndex(fieldKeyPath, fieldKeyPath)
    })

    return dbTableObject;
};


export { openDb, dropTable, createField, dropField, select, insert };
