import React, {useState} from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import BookList from '../components/BookList'
import AutoComplete from '../components/AutoComplete'
import {getSuggestions} from '../utils/UiUtil'
import {data} from '../utils/data'

const Home = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const onChange = e => {
    const input = e.target.value
    if (input.length < 1) return setSuggestions([])
    const suggestions = getSuggestions(e.target.value, data.queries)
    setSuggestions([...suggestions])
  }

  const onSubmit = () => {}
  return (
    <Container>
      <AutoComplete onChange={onChange} />
      <Button onClick={onSubmit}>Sooraj</Button>
      <BookList list={suggestions} />
    </Container>
  )
}

export default Home
