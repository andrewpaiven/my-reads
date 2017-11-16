import React, {Component} from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types'

/**
 * Created by apaivaer on 04/11/2017.
 * Book Shelf Component: This component receives a name and list of books
 * in order to be displayed
 *
 * @Props:
 *  - bookShelfTitle: Title of the book shelf to be displayed
 *  - listOfBooks: The list of books belonging to this shelf
 *  - updateBookShelf: Function to update the book shelf of a book
 *
 * @State:
 *  - No state
 */

class BookShelf extends Component {

    static propTypes = {
        bookShelfTitle: PropTypes.string.isRequired,
        listOfBooks: PropTypes.array.isRequired,
        updateBookShelf: PropTypes.func.isRequired,

    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.listOfBooks.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    updateBookShelf={this.props.updateBookShelf}
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
