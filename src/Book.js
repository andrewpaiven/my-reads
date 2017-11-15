/**
 * Created by apaivaer on 04/11/2017.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        myself: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
        updateShelfOfBook: PropTypes.func.isRequired
    }

    render() {
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` , borderStyle: `${this.props.myself.shelf === 'none' ? 'none' : 'solid'}`}}>
                    </div>
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.myself.shelf} onChange={e=>{this.props.updateShelfOfBook(this.props.myself,e)}}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>
        )
    }

}

export default Book