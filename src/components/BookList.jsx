import React from 'react'
import ListItem from './ListItem'

const BookList = ({list = []}) => (
  <div className="c-list">
    {list.length > 0 ? (
      list.map(({summary = '', title = '', author = {}}, i) => (
        <ListItem
          key={i}
          summary={summary}
          title={title}
          author={author.author}
        />
      ))
    ) : (
      <p style={{textAlign: 'center'}}>No books Selected</p>
    )}
  </div>
)
export default BookList
