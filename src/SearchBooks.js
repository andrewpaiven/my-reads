/**
 * Created by apaivaer on 04/11/2017.
 */

import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
class SearchBooks extends Component {

    state = {
        books: [],
    }

    updateShelfOfBookShelf = (book,e)=> {
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
                    <a className="close-search" onClick={this.props.hideSearchPage}>Close</a>
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
                                updateShelfOfBook={this.updateShelfOfBookShelf}
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
