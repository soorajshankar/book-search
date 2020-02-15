import React from 'react'
import ListItem from './ListItem'

const BookList = ({list = []}) => (
  <div className="c-list">
    {list.length > 0 ? (
      list.map((book, i) => (
        <ListItem
          key={i}
          summary={book.summary}
          title={book.title}
          author={book?.author?.author}
        />
      ))
    ) : (
      <p style={{textAlign: 'center'}}>No books Selected</p>
    )}
  </div>
)
export default BookList
