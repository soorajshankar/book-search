import React from 'react'

const ListItem = ({title = '', author = '', summary}) => {
  return (
    <div className="c-list__item" data-testid="book_item">
      <h3 className="c-card__title">{title}</h3>
      <h4 className="c-card__author">{author}</h4>
      <p className="c-card__summary">{summary}</p>
    </div>
  )
}

export default ListItem
