class BookController {

    constructor() {
        /*** Referenciando os campos do formulário do DOM e criando estância de lista de livros */

        let $ = document.querySelector.bind(document);

        this._titleField = $("#book-title");
        this._authorField = $("#book-author");
        this._publisherField = $("#book-publisher");
        this._isbnField = $("#book-isbn");
        this._pagesField = $("#book-pages");
        this._finishDateField = $("#finish-date");

        this._bookList = BindModelView.bind(
            new BookList(), 
            new BookListView($("#bookshelf_container")),
            'update', 
            'add', 'delete', 'orderList', 'reverseOrderList'
        );

        this._currentOrder = '';

        DBConnectionFactory.getDBConnection()
            .then((dbCon) => {
                this._booklistDAO = new BooklistDAO(dbCon);

                this._booklistDAO.packBooks()
                    .then(dbBooklist => {
                        dbBooklist.forEach(book => {
                            this._bookList.add(book);
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => console.log(error));
        
        
    }

    addBook(event) {
        /*** Chamando método que instancia livros e adicionando-os à lista e chamando método que limpa campos 
         * do formulário. Chamando método que atualiza a View com a lista de livros */

        event.preventDefault();

        let book = this._createBook();

        this._booklistDAO.insertBookDB(book)
            .then(() => {
                this._bookList.add(book);
            });

        this._clearFormFields();

    }

    deleteList() {

        if (window.confirm("Você está prestes a deletar toda sua lista de livros. (Esta ação não pode poderá ser desfeita)")) {
            this._booklistDAO.deleteAllBooks()
            .then(() => {
                this._bookList.delete();
            })
            .catch(err => console.log(err));
        }
        
        // this._bookListView.update(this._bookList);

    }

    order(column) {

        if (this._currentOrder == column) {
            console.log("invertendo ordem");
            this._bookList.reverseOrderList();
        }
        else {
            console.log("ordenando");
            this._bookList.orderList((a, b) => a[column] - b[column]);
        }

        this._currentOrder = column;
    }

    

    _clearFormFields() {
        /*** limpando campos do formulário */

        this._titleField.value = "";
        this._authorField.value = "";
        this._publisherField.value = "";
        this._isbnField.value = "";
        this._pagesField.value = "";
        this._finishDateField.value = "";
        this._titleField.focus();
    }

    _createBook() {
        /*** Instanciando livros */

        return new Book(this._titleField.value, 
            this._authorField.value, 
            this._publisherField.value,
            this._isbnField.value, 
            this._pagesField.value, 
            new Date(this._finishDateField.value.replaceAll('-', '/')));
    }

}