/**
 * Created by apaivaer on 04/11/2017.
 */
import React, {Component} from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types'
class BookShelf extends Component {

    static propTypes = {
        bookShelfTitle: PropTypes.string.isRequired,
        listOfBooks: PropTypes.array.isRequired,
        updateShelfOfBook: PropTypes.func.isRequired,

    }

    updateShelfOfBook = (book,e)=> {
        this.props.updateShelfOfBook(book,e.target.value)
    }
    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.listOfBooks.map((book)=>(
                            <li key={book.id}>
                                <Book
                                    myself={book}
                                    title={book.title}
                                    authors={book.authors}
                                    url={book.imageLinks.thumbnail}
                                    updateShelfOfBook={this.updateShelfOfBook}
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
