class BookList {

    constructor() {
        this._books = [];
    }

    add(book) {
        this._books.push(book);        
    }

    delete() {
        this._books = [];
    }

    orderList(rule) {
        this._books.sort(rule);
    }

    reverseOrderList() {
        this._books.reverse();
    }

    get books() {
        return [].concat(this._books); // defensive programming
    }

    get pageTotal() {
        return parseInt(this._books.reduce((accumulator, currentBook) => accumulator + parseInt(currentBook.numPag), 0.0));
    }

}