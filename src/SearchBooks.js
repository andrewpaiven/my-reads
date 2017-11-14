/**
 * Created by apaivaer on 04/11/2017.
 */

import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
class SearchBooks extends Component {

    state = {
        books: [],
    }

    updateShelfOfBook = (book,e)=> {
        this.props.updateShelfOfBook(book,e.target.value)
    }

    processQuery = (e) => {
        console.log("Processing query " + e.target.value)
        if(e.target.value) {
            BooksAPI.search(e.target.value, 20).then((responseBooks) => {
                if(!responseBooks.hasOwnProperty("error")) {
                    //Protection against null values in the backend
                    let responseBooksFiltered = responseBooks.filter(book=>book.hasOwnProperty("imageLinks"))
                        .filter(book=>book.hasOwnProperty("title"))
                        .filter(book=>book.hasOwnProperty("authors"))

                    //Get IDs of tracked books to array
                    let idsOfTrackedBooks = this.props.allBooksTracked.map((book)=> book.id)

                    //Check if any of the books are already being tracked
                    responseBooksFiltered = responseBooksFiltered.map((book)=> {
                        if(idsOfTrackedBooks.indexOf(book.id) >= 0) {
                            console.log("Moving book to shelf")
                            book['shelf'] = this.props.allBooksTracked.find(trackedBook => trackedBook.id === book.id)
                        }
                        else book['shelf'] = 'none'
                        return book
                    })

                    console.log("The list of filtered books is " + responseBooksFiltered)



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
                    <Link to="/" className="close-search" onClick={this.props.hideSearchPage}>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                         NOTES: The search from BooksAPI is limited to a particular set of search terms.
                         You can find these search terms here:
                         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                         you don't find a specific author or title. Every search is limited by search terms.
                         */}
                        <input type="text" placeholder="Search by title or author" onChange={this.processQuery}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.books.map((book)=>(
                        <li key={book.id}>
                            <Book
                                myself={book}
                                title={book.title}
                                authors={book.authors}
                                url={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ""}
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

export default SearchBooks
