import React, {useState} from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import BookList from '../components/BookList'
import AutoComplete from '../components/AutoComplete'
import {getSuggestions, debounce} from '../utils/UiUtil'
import {data} from '../utils/data'
import {searchSummary, indexSummaries} from '../utils/utils'

// NOTE****
// this is an expensive operation and intended to happen in the backend
// result can be memoized in redis or any in memory cache
const indxdSummaries = indexSummaries(data.summaries)

const Home = () => {
  const [value, setValue] = useState('')
  const [maxSug, setMaxSug] = useState(5) // Maximum suggestions displayed
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState([])

  const onChange = e => {
    const input = e
    if (input.length < 1) return setSuggestions([])
    const suggestions = searchSummary(
      input,
      data.summaries,
      maxSug,
      data.titles,
      data.authors,
      indxdSummaries,
    )
    // console.log(suggestions)
    setSuggestions(suggestions)
  }
  // prevent rerendering on fast typing, onChange fetch suggestions after 200ms no typing mode
  const debouncedOnChange = debounce(onChange, 500)

  const onSubmit = () => {
    if (typeof value == 'object' && 'id' in value) {
      if (results[results?.length - 1]?.id === value.id) return // easy exit on double click, not doing find all the time
      if (!results.find(i => i.id == value.id)) setResults([...results, value])// add to the cart 
    }
  }
  const onSelect = e => {
    setSuggestions([])
    setValue(e)
  }
  const handleMaxSug = e => setMaxSug(e.target.value)
  return (
    <Container>
      <h2 className="c-title">Search Books</h2>
      <div className="c-container__shell">
        <AutoComplete
          {...{
            onChange: debouncedOnChange,
            onSelect,
            visible: true,
            suggestions,
            value: value.title || '',
          }}
        />
        <Button className="btn__search" onClick={onSubmit}>
          Submit
        </Button>
      </div>
      <MaxSuggestions {...{maxSug, handleMaxSug}} />
      <BookList list={results} />
    </Container>
  )
}
const MaxSuggestions = ({maxSug, handleMaxSug}) => (
  <div className="c-drawer__item">
    <label>Max. suggestions : </label>
    <input
      value={maxSug}
      onChange={handleMaxSug}
      style={{width: 50}}
      type="number"
    />
  </div>
)

export default Home
