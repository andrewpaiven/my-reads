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

    updateBookList = () => {
        console.log("Getting all books")
        BooksApi.getAll().then((books)=>{
            console.log("Receiving promise - The books are")
            console.log(books)
            this.setState({
                booksReading: books.filter(book=>(book.shelf==="currentlyReading")),
                booksToRead: books.filter(book=>(book.shelf==="wantToRead")),
                booksRead: books.filter(book=>(book.shelf==="read")),
            })}
        )
    }

    moveBook = (book,toShelf) => {
        console.log("Printing stuff")
        console.log(book)
        switch(book.shelf) {
            case "currentlyReading": {
                this.setState({
                    booksReading: this.state.booksReading.filter((b)=>(b !== book))
                })
                break
            }
            case "wantToRead":
                this.setState({
                    booksToRead: this.state.booksToRead.filter(b=>(b !== book))
                })
                break
            case "read":
                this.setState({
                    booksRead: this.state.booksRead.filter((b)=>(b !== book))
                })
                break
            default:
                break
        }
        // Update book shelf
        book.shelf = toShelf
        switch(toShelf) {
            case "currentlyReading":
                this.setState({
                    booksReading: this.state.booksReading.concat(book)
                })
                break
            case "wantToRead":
                this.setState({
                    booksToRead: this.state.booksToRead.concat(book)
                })
                break
            case "read":
                this.setState({
                    booksRead: this.state.booksRead.concat(book)
                })
                break
            default:
                break
        }
        BooksApi.update(book,toShelf)
    }

    componentDidMount() {
        this.updateBookList()
    }

    render() {

        return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf bookShelfTitle="Currently Reading" listOfBooks={this.state.booksReading} updateShelfOfBook={this.moveBook}/>
                    <BookShelf bookShelfTitle="Want to Read" listOfBooks={this.state.booksToRead} updateShelfOfBook={this.moveBook}/>
                    <BookShelf bookShelfTitle="Read" listOfBooks={this.state.booksRead} updateShelfOfBook={this.moveBook}/>
                </div>
            </div>
            <div className="open-search">
                <a onClick={this.props.showSearchPage}>Add a book</a>
            </div>
        </div>

        )
    }
}

export default ListOfBooks

