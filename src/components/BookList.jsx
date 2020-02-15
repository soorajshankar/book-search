import React from 'react'
import ListItem from './ListItem'

const BookList = ({list = []}) => {
  return list.map(i => <li key={i.id}>{JSON.stringify(i)}</li>)
}
export default BookList
