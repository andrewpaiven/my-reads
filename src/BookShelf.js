/**
 * Created by apaivaer on 04/11/2017.
 */
import React, {Component} from 'react'
import Book from './Book.js'
class BookShelf extends Component {

    render() {

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.listOfBooks.map((book)=>(
                            <li key={book.title}>
                                <Book
                                    title={book.title}
                                    author={book.author}
                                    url={book.imageLinks.thumbnail}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf
