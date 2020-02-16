import React, {useEffect, useState} from 'react'

// developer friendly message
// can write logic to remove  `console.debug` in the build script
const defaultMethod = method => e =>
  console.debug(
    `please pass valid ${method} prop function to AutoComplete component to capture this event `,
  )

export default function({
  suggestions = [],
  onChange = defaultMethod('onChange'),
  onSelect = defaultMethod('onSelect'),
  value = '',
  visible = true,
}) {
  const [sValue, setSValue] = useState(value)
  // allows prop change > local state change ie rerender
  useEffect(() => {
    if (sValue !== value) setSValue(value) // value from prop gets priority
  }, [value])

  const onLChange = e => {
    setSValue(e.target.value)
    onChange(e.target.value)
  }
  return (
    <div className="c-ac">
      <input onChange={onLChange} className="c-ac__input" value={sValue} />

      {visible && Array.isArray(suggestions) && suggestions.length > 0 && (
        <div className="c-ac__suggestions">
          {suggestions.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(item)}
              className="c-suggestions__item"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
