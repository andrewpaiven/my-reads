import React, {Component} from 'react'
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

/**
 * Created by apaivaer on 04/11/2017.
 * ListOfBooks Component: This component receives a list of books
 * and divides them according to shelves
 *
 * @Props:
 *  - booksReading: Array of books for shelf Currently Reading
 *  - booksToRead: Array of books for shelf To Read
 *  - booksRead: Array of books for shelf Read
 *  - updateBookShelf: Function to update the shelf of a book
 *  - updateBookList: Function to trigger an API call to update the list of books
 *
 * @State:
 *  - booksReading: Current books on Currently Reading shelf
 *  - booksToRead: Current books on To Read shelf
 *  - booksRead: Current books on Read shelf
 */


class ListOfBooks extends Component {

    static propTypes = {
        booksReading: PropTypes.array.isRequired,
        booksToRead: PropTypes.array.isRequired,
        booksRead: PropTypes.array.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
        updateBookList: PropTypes.func.isRequired
    }

    state = {
        booksReading: [],
        booksToRead: [],
        booksRead: [],
    }

    render() {

        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf bookShelfTitle="Currently Reading"
                                   listOfBooks={this.props.booksReading}
                                   updateBookShelf={this.props.updateBookShelf}/>
                        <BookShelf bookShelfTitle="Want to Read"
                                   listOfBooks={this.props.booksToRead}
                                   updateBookShelf={this.props.updateBookShelf}/>
                        <BookShelf bookShelfTitle="Read"
                                   listOfBooks={this.props.booksRead}
                                   updateBookShelf={this.props.updateBookShelf}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>

        )
    }
}

export default ListOfBooks

