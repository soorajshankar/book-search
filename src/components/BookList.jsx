import React from 'react'
import ListItem from './ListItem'

// for i18n
const noBookMessage = 'No books Selected'

const BookList = ({list = []}) => (
  <div className="c-list" data-testid="book_list">
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
      <p style={{textAlign: 'center'}}>{noBookMessage}</p>
    )}
  </div>
)
export default BookList
