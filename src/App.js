import React from 'react'
import './App.css'
import ListOfBooks from "./ListOfBooks";
import SearchBooks from "./SearchBooks"
import * as BooksApi from "./BooksAPI"
import {Route} from 'react-router-dom'

/**
 * Created by apaivaer on 04/11/2017.
 * Books App: Main component of the application
 * After the component mounts, the books API is called and the state variables
 * are populated according to the shelves of books received from the backend.
 * The page routes to 2 different page:
 *  "/" - The list of books currently tracked
 *  "/search" - The search page that allows users to search for books and add
 *  them to the list of tracked books
 *
 * @Props:
 *  - No props
 *
 * @State:
 *  - allBooksTracked: an array with all books on shelves
 *  - booksReading: Current books on Currently Reading shelf
 *  - booksToRead: Current books on To Read shelf
 *  - booksRead: Current books on Read shelf
 */

class BooksApp extends React.Component {
    state = {
        allBooksTracked: [],
        booksReading: [],
        booksToRead: [],
        booksRead: [],
    }

    componentDidMount() {
        this.updateBookList()
    }

    setAllBooks = (allBooksArray) => {
        this.setState({
            listedBooks: allBooksArray
        })
    }

    updateBookList = () => {
        BooksApi.getAll().then((books) => {
                this.setState({
                    allBooksTracked: books
                })
                this.setState({
                    booksReading: books.filter(book => (book.shelf === "currentlyReading")),
                    booksToRead: books.filter(book => (book.shelf === "wantToRead")),
                    booksRead: books.filter(book => (book.shelf === "read")),
                })
            }
        )
    }

    updateBookShelf = (book, toShelf) => {
        // Due to the asynchronous execution of setState, we handle temporary
        // state variables and update the state at the end of the function
        let booksReading = this.state.booksReading
        let booksToRead = this.state.booksToRead
        let booksRead = this.state.booksRead
        let allBooksTracked = this.state.allBooksTracked

        //Check on which shelf the book is at the moment and remove it
        switch (book.shelf) {
            case "currentlyReading":
                booksReading = booksReading.filter((b) => (b.id !== book.id))
                break
            case "wantToRead":
                booksToRead = booksToRead.filter((b) => (b.id !== book.id))
                break
            case "read":
                booksRead = booksRead.filter((b) => (b.id !== book.id))
                break
            default:
                break
        }
        // Update state of book shelf for fast response
        book.shelf = toShelf
        switch (toShelf) {
            case "currentlyReading":
                booksReading = booksReading.concat(book)
                break
            case "wantToRead":
                booksToRead = booksToRead.concat(book)
                break
            case "read":
                booksRead =  booksRead.concat(book)
                break
            case "none":
                allBooksTracked = this.state.allBooksTracked
                                    .splice(this.state.allBooksTracked.indexOf((i)=>i.id === book.id),1)
                break
            default:
                break
        }
        allBooksTracked = booksReading.concat(booksToRead).concat(booksRead)
        //Update list of all books tracked
        this.setState({
            booksReading: booksReading,
            booksToRead: booksToRead,
            booksRead: booksRead,
            allBooksTracked: allBooksTracked,
        })
        BooksApi.update(book, toShelf)

    }

    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <SearchBooks allBooksTracked={this.state.allBooksTracked}
                                 updateBookShelf={this.updateBookShelf}
                    />
                )}/>
                <Route exact path="/" render={() => (
                    <ListOfBooks setAllBooks={this.setAllBooks}
                                 booksReading={this.state.booksReading}
                                 booksToRead={this.state.booksToRead}
                                 booksRead={this.state.booksRead}
                                 updateBookShelf={this.updateBookShelf}
                                 updateBookList={this.updateBookList}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
