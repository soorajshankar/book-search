import React from 'react'

const ListItem = ({title="Title",author="Author",summary}) => {
  return <div className="c-list__item">
      <h3 className="c-card__title">{title}</h3>
      <h4 className="c-card__author">{author}</h4>
      <p className="c-card__summary">{summary}</p>
  </div>
}

export default ListItem
