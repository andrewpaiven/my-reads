/**
 * Created by apaivaer on 04/11/2017.
 */

import React, { Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksApi from "./BooksAPI"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class ListOfBooks extends Component {

    static propTypes = {
    booksReading: PropTypes.array.isRequired,
    booksToRead: PropTypes.array.isRequired,
    booksRead: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    updateBookList: PropTypes.func.isRequired
    }

    state = {
        booksReading: [],
        booksToRead: [],
        booksRead: [],
    }

    updateBookList = () => {
        console.log("Getting all books")
        BooksApi.getAll().then((books)=>{
            this.props.setAllBooks(books)
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
        this.props.updateBookList()
    }

    render() {

        return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf bookShelfTitle="Currently Reading" listOfBooks={this.props.booksReading} updateShelfOfBook={this.props.moveBook}/>
                    <BookShelf bookShelfTitle="Want to Read" listOfBooks={this.props.booksToRead} updateShelfOfBook={this.props.moveBook}/>
                    <BookShelf bookShelfTitle="Read" listOfBooks={this.props.booksRead} updateShelfOfBook={this.props.moveBook}/>
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

