import React, {useState} from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import BookList from '../components/BookList'
import AutoComplete from '../components/AutoComplete'
import {getSuggestions, debounce} from '../utils/UiUtil'
import {data} from '../utils/data'
import {searchSummary} from '../utils/utils'

const Home = () => {
  const [value, setValue] = useState('')
  const [maxSug, setMaxSug] = useState(5) // Maximum suggestions displayed
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState([])

  const onChange = e => {
    const input = e
    if (input.length < 1) return setSuggestions([])
    const suggestions = getSuggestions(e, data.queries)
    setSuggestions([...suggestions])
    setValue(input)
  }
  // prevent rerendering on fast typing, onChange fetch suggestions after 200ms no typing mode
  const debouncedOnChange = debounce(onChange, 200)

  const onSubmit = () => {
    const result = searchSummary(
      value,
      data.summaries,
      maxSug,
      data.titles,
      data.authors,
    )
    setResults(result)
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
            value,
          }}
        />
        <Button className="btn__search" onClick={onSubmit}>
          Search
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
