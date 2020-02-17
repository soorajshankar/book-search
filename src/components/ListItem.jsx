import React from 'react'
import {trimString} from '../utils/UiUtil'

const ListItem = ({title = '', author = '', summary = ''}) => {
  const smr = trimString(summary, 200)
  return (
    <div className="c-list__item" data-testid="book_item">
      <h3 className="c-card__title">{title}</h3>
      <h4 className="c-card__author">{author}</h4>
      <p className="c-card__summary">{smr}</p>
    </div>
  )
}

export default ListItem
