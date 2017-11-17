import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * Created by apaivaer on 04/11/2017.
 * SearhBooks component: This component allows to search of books
 * and to add books to shelves. For a book to be displayed, it must
 * have a title, an author, and an image.
 *
 * @Props:
 *  - allBooksTracked: array of all books already in shelves
 *  - updateBookShelf: function to add book to a shelf
 *
 * @State:
 *  - books: array of books to be displayed
 */

class SearchBooks extends Component {

    static propTypes = {
        allBooksTracked: PropTypes.array.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
    }

    state = {
        books: [],
    }

    processQuery = (e) => {
        if(e.target.value) {

            //Process user inputs
            //Trim
            let userQuery = e.target.value.trim()

            //API call and response processing
            BooksAPI.search(userQuery, 20).then((responseBooks) => {
                if(!responseBooks.hasOwnProperty("error")) {
                    //Protection against null values in the backend
                    let responseBooksFiltered = responseBooks.filter(book=>book.hasOwnProperty("imageLinks"))
                        .filter(book=>book.hasOwnProperty("title"))
                        .filter(book=>book.hasOwnProperty("authors"))

                    //Get IDs of tracked books to array
                    let idsOfTrackedBooks = this.props.allBooksTracked.map((book)=> book.id)

                    //Check if any of the books in the response are already being tracked
                    responseBooksFiltered = responseBooksFiltered.map((book)=> {
                        if(idsOfTrackedBooks.indexOf(book.id) >= 0) {
                            //Add a shelf to the book already tracked so that the menu displays correctly
                            book['shelf'] = this.props.allBooksTracked.find(trackedBook => trackedBook.id === book.id).shelf
                        }
                        else book['shelf'] = 'none'
                        return book
                    })

                    this.setState({
                        books: responseBooksFiltered
                    })
                }
                else {
                    console.log("The search API threw the following error: " + JSON.stringify(responseBooks))
                    this.setState({ books: []})
                }
        })
        }
        else this.setState({
            books: []
        })
    }

    render() {

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.processQuery}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.books.map((book)=>(
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

export default SearchBooks
