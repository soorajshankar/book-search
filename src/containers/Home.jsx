import React, {useState} from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import BookList from '../components/BookList'
import AutoComplete from '../components/AutoComplete'
import {getSuggestions} from '../utils/UiUtil'
import {data} from '../utils/data'
import {searchSummary} from '../utils/utils'

const Home = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState([])

  const onChange = e => {
    const input = e.target.value
    if (input.length < 1) return setSuggestions([])
    const suggestions = getSuggestions(e.target.value, data.queries)
    setSuggestions([...suggestions])
    setValue(input)
  }

  const onSubmit = () => {
    const result = searchSummary(value, data.summaries, 3)
    setResults(result)
  }
  const onSelect = e => {
    setSuggestions([])
    setValue(e)
  }
  return (
    <Container>
      <div className="c-container__shell">
        <AutoComplete
          {...{onChange, onSelect, visible: true, suggestions, value}}
        />
        <Button className="btn__search" onClick={onSubmit}>
          Search
        </Button>
      </div>
      <BookList list={results} />
    </Container>
  )
}

export default Home
