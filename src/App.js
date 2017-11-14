import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListOfBooks from "./ListOfBooks";
import SearchBooks from "./SearchBooks"
import * as BooksApi from "./BooksAPI"
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
      allBooksTracked: [],
      booksReading: [],
      booksToRead: [],
      booksRead: [],
      showSearchPage: false,
  }

  setAllBooks = (allBooksArray)=> {
    this.setState({
        listedBooks: allBooksArray
    })
  }

  showSearchPage = () => {
    this.setState({
        showSearchPage: true
    })
  }

  hideSearchPage = () => {
    this.setState({
        showSearchPage: false
    })
  }

  updateBookList = () => {
        console.log("Getting all books")
        BooksApi.getAll().then((books)=>{
            this.setState({
                allBooksTracked: books
            })
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

  render() {
    return (
      <div className="app">
            <Route exact path="/search" render={()=>(
                <SearchBooks allBooksTracked={this.state.allBooksTracked}
                             hideSearchPage={this.hideSearchPage}
                             updateShelfOfBook={this.moveBook}
                />
            )}/>
            <Route exact path="/" render={()=>(
                <ListOfBooks setAllBooks={this.setAllBooks}
                             showSearchPage={this.showSearchPage}
                             booksReading={this.state.booksReading}
                             booksToRead={this.state.booksToRead}
                             booksRead={this.state.booksRead}
                             moveBook={this.moveBook}
                             updateBookList={this.updateBookList}
                />

            )}/>
      </div>
    )
  }
}

export default BooksApp
