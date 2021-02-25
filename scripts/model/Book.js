class Book {

    constructor(title, author, publisher, isbn, numPag, finishDate) {
        this._title = title;
        this._author = author;
        this._publisher = publisher;
        this._isbn = isbn;
        this._numPag = numPag;
        this._finishDate = finishDate
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get publisher() {
        return this._publisher;
    }

    get isbn() {
        return this._isbn;
    }

    get numPag() {
        return this._numPag;
    }
    
    get finishDate() {
        return `${this._finishDate.getDate()}/${this._finishDate.getMonth()+1}/${this._finishDate.getFullYear()}`;
    }

}