class DBConnectionFactory {

    /***
     * Service API responsável por:
     * Abrir a conexão com o BD e deixá-la disponível para manipulação; 
     * Gerenciar as Object Stores;
     * Fechar a conexão.
     * 
     * 1: A conexão não pode ser fechada fora da classe
    */

    constructor() {
        throw new Error("'new' operator used on static class.");
    }

    // propriedades estáticas

    static DBversion = 1;
    static DBName = 'cdldatabase';
    static DBStore = 'books';

    static DBConnection = null;

    static OriginalCloseDB = null;

    // métodos estáticos

    static getDBConnection() {

        return new Promise((resolve, reject) => {

            let DBOpenRequest = window.indexedDB.open(DBConnectionFactory.DBName, DBConnectionFactory.DBversion);

            DBOpenRequest.onupgradeneeded = () => {

                DBConnectionFactory._startConnectionIfNot(DBOpenRequest.result);

                DBConnectionFactory._createObjectStore();

            }

            DBOpenRequest.onsuccess = () => {

                DBConnectionFactory._startConnectionIfNot(DBOpenRequest.result);
                
                resolve(DBConnectionFactory.DBConnection);

            }

            DBOpenRequest.onerror = () => {

                reject(DBOpenRequest.error);

            }

        });

    }

    static closeDBConnection() {
        if(DBConnectionFactory.DBConnection) {
            DBConnectionFactory.OriginalCloseDB();
            DBConnectionFactory.DBConnection = null;
            DBConnectionFactory.OriginalCloseDB = null;
        } // *1
    }

    static _startConnectionIfNot(DBConnection) {
        if (!DBConnectionFactory.DBConnection) {

            DBConnectionFactory.DBConnection = DBConnection;

            DBConnectionFactory.OriginalCloseDB = DBConnectionFactory.DBConnection.close.bind(DBConnectionFactory.DBConnection);
            
            DBConnectionFactory.DBConnection.close = function() {
                throw new Error("Database connection mustn't be closed outside DBConnectionFactory class");
            } // *1

        }
    }

    static _createObjectStore() {
        if (DBConnectionFactory.DBConnection.objectStoreNames.contains(DBConnectionFactory.DBStore)) {
            
            DBConnectionFactory._deleteObjectStore(DBConnectionFactory.DBStore);
        }

        DBConnectionFactory.DBConnection.createObjectStore(DBConnectionFactory.DBStore, {autoIncrement: true});
    }

    static _deleteObjectStore(DBStore) {
        console.log("deletando store");
        DBConnectionFactory.DBConnection.deleteObjectStore(DBStore);
    }

}