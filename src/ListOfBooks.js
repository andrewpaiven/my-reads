/**
 * Created by apaivaer on 04/11/2017.
 */

import React, { Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksApi from "./BooksAPI"

class ListOfBooks extends Component {

    state = {
        booksReading: [],
        booksToRead: [],
        booksRead: [],
    }

    componentDidMount() {
        BooksApi.getAll().then((books)=>(
            this.setState({
                booksReading: books.filter(book=>(book.shelf==="currentlyReading")),
                booksToRead: books.filter(book=>(book.shelf==="wantToRead")),
                booksRead: books.filter(book=>(book.shelf==="read")),
                }))
        )
    }

    render() {

        return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf bookShelfTitle="Currently Reading" listOfBooks={this.state.booksReading}/>
                    <BookShelf bookShelfTitle="Want to Read" listOfBooks={this.state.booksToRead}/>
                    <BookShelf bookShelfTitle="Reading" listOfBooks={this.state.booksRead}/>
                </div>
            </div>
            <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
        </div>

        )
    }
}

export default ListOfBooks

