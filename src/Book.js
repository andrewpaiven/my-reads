import React, {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * Created by apaivaer on 04/11/2017.
 * Book Component
 * @Props:
 *  - book: Book object to be represented by this component
 *  - updateBookShelf: Handler function to move book to a different shelf
 * @State:
 *  - No state
 */

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateBookShelf: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{
                             width: 128,
                             height: 193,
                             backgroundImage: `url(${this.props.book.imageLinks.thumbnail ? this.props.book.imageLinks.thumbnail : ""})`,
                             borderStyle: `${this.props.book.shelf === 'none' ? 'none' : 'solid'}`
                         }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.book.shelf}
                                onChange={e => {
                                    this.props.updateBookShelf(this.props.book, e.target.value)
                                }}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }

}

export default Book