class BooklistDAO {
    /***
     * Data Access service
     * 
     * Objetivo: Acessar e manipular livros armazenados na store do BD:
     * 
     * Método: Recebe conexão com o BD e partir dela manipula os livros contidos na store. Não tem poder direto
     * sobre o BD, ou seja, não pode alterar sua estrutura.
     * 
     * Capacidades:
     * Realizar inserção de livros no BD;
     * Carregar livros do BD para a aplicação;
     * Realizar deleção total de todos os livros no BD;
     * 
     * OBS:
     * %1: Retornar resultado da operação de inserção em uma Promise.
     */

    constructor(dbConnection) {

        this._dbConnection = dbConnection;
        this._objStore = 'books';

    }

    insertBookDB(book) {

        return new Promise((resolve, reject) => {
            let dbAddRequest = this._dbConnection
                .transaction([this._objStore], 'readwrite')
                .objectStore(this._objStore)
                .add(book);
            
            dbAddRequest.onsuccess = () => {
                resolve();
            }

            dbAddRequest.onerror = () => {
                console.log(dbAddRequest.error);
                reject(dbAddRequest.error);
            }
        });

    }

    packBooks() {

        return new Promise((resolve, reject) => {
            
            let dbCursorRequest = this._dbConnection
                .transaction([this._objStore], 'readwrite')
                .objectStore(this._objStore)
                .openCursor();

            let books = [];
            
            dbCursorRequest.onsuccess = () => {

                let cursor = dbCursorRequest.result;

                if (cursor) {

                    let book = cursor.value;

                    books.push(new Book(book._title, book._author, book._publisher, book._isbn, book._numPag, 
                        book._finishDate));
                    
                    cursor.continue();

                }

                else {
                    resolve(books);
                }

            }

            dbCursorRequest.onerror = () => {

                console.log(dbCursorRequest.error);

                reject(dbCursorRequest.error);

            }

        });

    }

    deleteAllBooks() {
        /**
         * Realiza a deleção de todos os livros na store do BD.
         */

        return new Promise((resolve, reject) => {

            let dbDeleteAllRequest = this._dbConnection
                .transaction([this._objStore], 'readwrite')
                .objectStore(this._objStore)
                .clear();

            dbDeleteAllRequest.onsuccess = () => resolve();

            dbDeleteAllRequest.onerror = () => reject(dbDeleteAllRequest.error);

        })

    }

}