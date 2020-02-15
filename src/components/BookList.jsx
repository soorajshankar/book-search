import React from 'react'
import ListItem from './ListItem'

const BookList = ({list = []}) => {
  console.log(list)
  const newData = JSON.parse(JSON.stringify(list))
  return newData.map(i => <li key={i}>{i}</li>)
}
export default BookList
