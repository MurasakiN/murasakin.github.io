class BookListView extends View{

    constructor(container) {

        super(container);

    }

    template(model) {
        /*** Recebendo lista de livros como parâmetro. Criando string com o HTML de uma tabela. Adicionando linhas 
         * no tbody dinamicamente conforme mais itens são adicionados na lista de livros. Recebendo total de páginas
         * lidas e adicionando to tfooter.
        */

        return `
            <table class="table table-bordered w-85 mx-auto">

                <thead class="thead-light">

                    <tr">
                        <th scope="row" onclick="bookController.order('title')">Título</th>
                        <th scope="row" onclick="bookController.order('author')">Autor</th>
                        <th scope="row" onclick="bookController.order('publisher')">Editora</th>
                        <th scope="row" onclick="bookController.order('isbn')">ISBN</th>
                        <th scope="row" onclick="bookController.order('numPag')">Páginas</th>
                        <th scope="row" onclick="bookController.order('finishDate')">Terminado em</th>
                    </tr>

                </thead>

                <tbody>

                    ${model.books.map(b => `
                        <tr class="bookshelf__book-list-data">
                            <td>${b.title}</td>
                            <td>${b.author}</td>
                            <td>${b.publisher}</td>
                            <td>${b.isbn}</td>
                            <td>${b.numPag}</td>
                            <td>${b.finishDate}</td>
                        </tr>
                    `).join('')}

                </tbody>

                <tfoot>

                    <tr class="bookshelf__book-list-foot" >
                        <td colspan="4">Quantidade de páginas lidas</td>
                        <td colspan="2">${model.pageTotal} páginas</td>
                    </tr>

                </tfoot>

            </table>
        `

    }
    
}