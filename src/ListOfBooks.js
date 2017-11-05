/**
 * Created by apaivaer on 04/11/2017.
 */

import React, { Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksApi from "./BooksAPI"

class ListOfBooks extends Component {

    state = {
        allBooks: [],
        booksReading: [],
        booksToRead: [],
        booksRead: [],
    }

    componentDidMount() {
        BooksApi.getAll().then((books)=>this.setState({allBooks : books}))
    }

    render() {
        const listOfBooks = [
            {
                title: "To kill whatever",
                author: "Muhamad Ali",
                url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
            },
            {
                title: "To kill whatever 2",
                author: "Muhamad Ali",
                url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
            },
            {
                title: "To kill whatever 3",
                author: "Muhamad Ali",
                url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
            }
        ]
        return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf bookShelfTitle="Currently Reading" listOfBooks={this.state.allBooks}/>
                    <BookShelf bookShelfTitle="Want to Read" listOfBooks={this.state.allBooks}/>
                    <BookShelf bookShelfTitle="Reading" listOfBooks={this.state.allBooks}/>
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

