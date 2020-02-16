import React, {useEffect, useState, useCallback} from 'react'

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
    // eslint thinks that since i use sValue,inside this hook, it has to be a dependacy
    // but i just need to listen for the value prop here
    // eslint-disable-next-line
  }, [value])

  const onLChange = useCallback(
    e => {
      setSValue(e.target.value)
      onChange(e.target.value)
    },
    [onChange],
  )
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
